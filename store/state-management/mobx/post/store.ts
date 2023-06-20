import { action, makeAutoObservable } from 'mobx';
import { postTransportLayer } from './transport-layer';
import { Post, transportLayer } from 'store/posts';

export class PostStore {
  // define initial state here
  posts: Post[] = [];
  status: 'idle' | 'loading' | 'succeeded' | 'failed' = 'idle';
  error: string | undefined = undefined;
  // the transportLayer holds your fetch methods
  transportLayer: transportLayer;

  constructor(transportLayer: transportLayer) {
    // makeAutoObservable is the short form of the following
    // makeObservable(this, {
    //  posts: observable,
    //  status: observable,
    //  fetchPosts: action,
    //  updatePost: action,
    //  addNewPost: action,
    //  getPostSortedBackwards: computed,
    // })
    makeAutoObservable(this, { transportLayer: false }, { autoBind: true });
    this.transportLayer = transportLayer;
  }

  fetchPosts() {
    this.status = 'loading';
    this.transportLayer
      .fetchPosts()
      .then((response) => response.json())
      .then(
        // Promise resolution handlers are handled in-line,
        // but run after the original action finished, so they need to be wrapped by action:
        action('fetchSuccess', (data) => {
          const { allPosts } = data;
          this.posts = [...allPosts];
          this.status = 'succeeded';
        }),
      )
      .catch(() => {
        action('fetchError', () => {
          this.status = 'failed';
          this.error = 'Error with fetching posts';
        });
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
      .then(
        action('addSuccess', (data) => {
          const { newPost } = data;
          const existingPost = this.posts.find(
            (post) => post.id === newPost.id,
          );
          if (!existingPost) {
            this.posts.push(newPost);
          }
        }),
      );
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

// instantiate an initial store and export it
export const postStore = new PostStore(postTransportLayer);
