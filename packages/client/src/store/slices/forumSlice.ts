import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TCommentListData, TTopic, TTopicListData } from '@/types/forumDataTypes';
import forumApi from '@/api/ForumApi';
import { TFetchStatus } from '@/types/data-types';

type TForum = {
    topicList: TTopicListData | null;
    topicsLoadStatus: TFetchStatus;
    topicsLoadError?: string;
};

type TTopicInfo = {
    topic: TTopic | null;
    topicLoadStatus: TFetchStatus;
    topicLoadError?: string;

    commentsData: TCommentListData | null;
    commentsLoadStatus: TFetchStatus;
    commentsLoadError?: string;
};

export type TForumState = {
    forum: TForum;
    topicInfo: TTopicInfo;
};

const initialState: TForumState = {
    forum: {
        topicList: null,
        topicsLoadStatus: TFetchStatus.IDLE,
    },
    topicInfo: {
        topic: null,
        commentsData: null,
        commentsLoadStatus: TFetchStatus.IDLE,
        topicLoadStatus: TFetchStatus.IDLE,
    },
};

const ELEMENTS_PER_PAGE = 10;

const fetchForumTopics = createAsyncThunk<TTopicListData, number>(
    'forum/fetchTopics',
    async (page: number) => {
        const response = await forumApi.getTopics(page, ELEMENTS_PER_PAGE);
        return response;
    }
);

export type CommentParams = {
    page: number;
    topicId: number;
};

const fetchTopicComments = createAsyncThunk<TCommentListData, CommentParams>(
    'forum/fetchComments',
    async (params: CommentParams) => {
        const { page, topicId } = params;
        const response = await forumApi.getComments(topicId, page, ELEMENTS_PER_PAGE);
        return response;
    }
);

const fetchTopicInfo = createAsyncThunk<TTopic, number>(
    'forum/fetchTopic',
    async (topicId: number) => {
        const response = await forumApi.getTopic(topicId);
        return response;
    }
);

const forumSlice = createSlice({
    name: 'forum',
    initialState,
    reducers: {
        setTopic(state, action) {
            state.topicInfo.topic = action.payload;
        },
        setTopicComments(state, action) {
            state.topicInfo.commentsData = action.payload;
        },
        setTopicList(state, action) {
            state.forum.topicList = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchForumTopics.pending, state => {
                state.forum.topicsLoadStatus = TFetchStatus.LOADING;
            })
            .addCase(fetchForumTopics.fulfilled, (state, action) => {
                state.forum.topicsLoadStatus = TFetchStatus.SUCCEEDED;
                // todo do we need like this or add as in the example
                state.forum.topicList = action.payload;
            })
            .addCase(fetchForumTopics.rejected, (state, action) => {
                state.forum.topicsLoadStatus = TFetchStatus.FAILED;
                state.forum.topicsLoadError = action.error.message;
            })
            .addCase(fetchTopicInfo.pending, state => {
                state.topicInfo.topicLoadStatus = TFetchStatus.LOADING;
            })
            .addCase(fetchTopicInfo.fulfilled, (state, action) => {
                state.topicInfo.topicLoadStatus = TFetchStatus.SUCCEEDED;
                state.topicInfo.topic = action.payload;
            })
            .addCase(fetchTopicInfo.rejected, (state, action) => {
                state.topicInfo.topicLoadStatus = TFetchStatus.FAILED;
                state.topicInfo.topicLoadError = action.error.message;
            })
            .addCase(fetchTopicComments.pending, state => {
                state.topicInfo.commentsLoadStatus = TFetchStatus.LOADING;
            })
            .addCase(fetchTopicComments.fulfilled, (state, action) => {
                state.topicInfo.commentsLoadStatus = TFetchStatus.SUCCEEDED;
                state.topicInfo.commentsData = action.payload;
            })
            .addCase(fetchTopicComments.rejected, (state, action) => {
                state.topicInfo.commentsLoadStatus = TFetchStatus.FAILED;
                state.topicInfo.commentsLoadError = action.error.message;
            });
    },
});

export default forumSlice.reducer;
export const { setTopic, setTopicComments, setTopicList } = forumSlice.actions;
export { fetchForumTopics, fetchTopicComments, fetchTopicInfo };
