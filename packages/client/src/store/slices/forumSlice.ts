import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TCommentListData, TTopic, TTopicListData } from '@/types/forumDataTypes';
import forumApi from '@/api/ForumApi';
import { TFetchStatus } from '@/types/data-types';

type TForum = {
    topicList: TTopicListData | null;
    topic: TTopic | null;
    topicComments: TCommentListData | null;
    topicsStatus: TFetchStatus;
    topicsError?: string; // todo move to 2 sections in state
};

export type TForumState = {
    forum: TForum;
};

const initialState: TForumState = {
    forum: {
        topicList: null,
        topic: null,
        topicComments: null,
        topicsStatus: TFetchStatus.IDLE,
    },
};

const fetchForumTopics = createAsyncThunk<TTopicListData>('forum/fetchTopics', async () => {
    // todo implement pagination
    const response = await forumApi.getTopicsNew(1, 10);
    return response;
});

const forumSlice = createSlice({
    name: 'forum',
    initialState,
    reducers: {
        setTopic(state, action) {
            state.forum.topic = action.payload;
        },
        setTopicComments(state, action) {
            state.forum.topicComments = action.payload;
        },
        setTopicList(state, action) {
            state.forum.topicList = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchForumTopics.pending, state => {
                state.forum.topicsStatus = TFetchStatus.LOADING;
            })
            .addCase(fetchForumTopics.fulfilled, (state, action) => {
                state.forum.topicsStatus = TFetchStatus.SUCCEEDED;
                // todo do we need like this or add as in the example
                state.forum.topicList = action.payload;
            })
            .addCase(fetchForumTopics.rejected, (state, action) => {
                state.forum.topicsStatus = TFetchStatus.FAILED;
                state.forum.topicsError = action.error.message;
            });
    },
});

export default forumSlice.reducer;
export const { setTopic, setTopicComments, setTopicList } = forumSlice.actions;
export { fetchForumTopics };
