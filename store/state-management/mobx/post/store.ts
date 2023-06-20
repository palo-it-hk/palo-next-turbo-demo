import { flow, makeAutoObservable, runInAction } from 'mobx';
import { PostTransportLayer } from 'store/transport-layer';
import { postTransportLayer } from './transport-layer';

export class PostStore {
  posts: Post[] = [];
  status: 'idle' | 'loading' | 'succeeded' | 'failed' = 'idle';
  error: string | undefined = undefined;
  transportLayer: PostTransportLayer = postTransportLayer;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
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

  *addNewPost(title: string, content: string) {
    const res: Response = yield fetch('http://localhost:3000/api/data/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        content: content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      this.error = 'Error with saving posts';
      return;
    }

    const { newPost } = yield res.json();

    this.posts.push(newPost);
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

export const postStore = new PostStore();

export class Post {
  id: string = '';
  title: string = '';
  content: string = '';
  store?: PostStore | null = null;

  constructor(store: PostStore, id: string) {
    makeAutoObservable(this, {
      id: false,
      store: false,
    });

    this.store = store;
    this.id = id;
  }
}
