import { writable } from "svelte/store";

const posts = writable([]);

const customPostsStore = {
  subscribe: posts.subscribe,
  setPosts: postArray => {
    posts.set(postArray);
  },

  addPosts: post => {
    posts.update(items => {
      return items.concat(post);
    });
  },

  updatePost: (id, postData) => {
    posts.update(items => {
      const postIndex = items.findIndex(i => i.id === id);
      const updatedPost = { ...items[postIndex], ...postData };
      const updatedPosts = [...items];
      updatedPosts[postIndex] = updatedPost;
      return updatedPosts;
    });
  },

  removePost: id => {
    posts.update(items => {
      return items.filter(i => i.id !== id);
    });
  },

  toggleFavorite: id => {
    posts.update(items => {
      const updatedPost = { ...items.find(m => m.id === id) };
      updatedPost.isFavorite = !updatedPost.isFavorite;
      const postIndex = items.findIndex(m => m.id === id);
      const updatedPosts = [...items];
      updatedPosts[postIndex] = updatedPost;
      return updatedPosts;
    });
  }
};

export default customPostsStore;
