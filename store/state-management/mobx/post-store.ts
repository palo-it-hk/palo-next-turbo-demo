import { flow, makeAutoObservable, runInAction } from 'mobx';
import { Post } from 'store/posts';

export class PostStore {
  posts: Post[] = [];
  status: 'idle' | 'loading' | 'succeeded' | 'failed' = 'idle';
  error: string | undefined = undefined;

  constructor() {
    makeAutoObservable(
      this,
      {
        fetchPosts: flow,
        addNewPost: flow,
      },
      { autoBind: true },
    );
  }

  *fetchPosts() {
    this.status = 'loading';

    const res: Response = yield fetch('http://localhost:3000/api/data/posts');
    if (!res.ok) {
      this.status = 'failed';
      this.error = 'Error with fetching posts';
      return;
    }
    const { allPosts } = yield res.json();

    this.posts = [...allPosts];
    this.status = 'succeeded';
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
}
