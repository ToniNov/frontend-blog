import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');
    return data;
});

export const fetchPopularPosts = createAsyncThunk('posts/fetchPopularPosts', async () => {
    const { data } = await axios.get('/posts/popular');
    return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) =>
    axios.delete(`/posts/${id}`),
);

// todo post by tags
// export const fetchByTags = createAsyncThunk('posts/fetchByTags', async (tag) => {
//     const {data} = await axios.get(`/posts/${tag}`)
//     return data
// });

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        // Receiving articles
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        // Receiving popular articles
        [fetchPopularPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPopularPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPopularPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        // Retrieving tags
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },
        // Receiving articles by tags
        // todo post by tags
        // [fetchByTags.pending]: (state) => {
        //     state.posts.items = [];
        //     state.posts.status = 'loading';
        // },
        // [fetchByTags.fulfilled]: (state, action) => {
        //     state.posts.items = action.payload;
        //     state.posts.status = 'loaded';
        // },
        // [fetchByTags.rejected]: (state) => {
        //     state.posts.items = [];
        //     state.posts.status = 'error';
        // },
        // Deleting an article
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
        },
    },
});

export const postsReducer = postsSlice.reducer;

