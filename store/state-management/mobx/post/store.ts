import { flow, makeAutoObservable, reaction, runInAction } from 'mobx';
import { postTransportLayer } from './transport-layer';
import { Post, transportLayer } from 'store/posts';

export class PostStore {
  posts: Post[] = [];
  status: 'idle' | 'loading' | 'succeeded' | 'failed' = 'idle';
  error: string | undefined = undefined;
  transportLayer: transportLayer;

  constructor(transportLayer: transportLayer) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.transportLayer = transportLayer;
  }

  fetchPosts() {
    this.status = 'loading';
    this.transportLayer
      .fetchPosts()
      .then((response) => response.json())
      .then((data) => {
        const { allPosts } = data;
        this.posts = [...allPosts];
        this.status = 'succeeded';
      })
      .catch(() => {
        this.status = 'failed';
        this.error = 'Error with fetching posts';
      });
  }

  updatePost(updatedPost: Post) {
    const { id, title, content } = updatedPost;
    const existingPost = this.posts.find((post) => post.id === id);
    if (existingPost) {
      existingPost.title = title;
      existingPost.content = content;
    }
  }

  addNewPost(title: string, content: string) {
    this.transportLayer
      .updateServer(title, content)
      .then((response) => response.json())
      .then((data) => {
        const { newPost } = data;
        const existingPost = this.posts.find((post) => post.id === newPost.id);
        if (!existingPost) {
          this.posts.push(newPost);
        }
        return;
      });
  }

  get getPostSortedBackwards(): Post[] {
    return this.posts.sort((a, b) => {
      if (b.id > a.id) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  getPostById(id: string): Post | undefined {
    return this.posts.find((post) => post.id === id);
  }
}

export const postStore = new PostStore(postTransportLayer);
