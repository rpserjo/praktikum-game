import { createSlice } from '@reduxjs/toolkit';
import { TTopicInfo } from '@/types/data-types';

type TForum = {
    forumTopics: TTopicInfo[] | null;
    topicComments: [] | null;
};

export type TState = {
    forum: TForum;
};

const initialState: TState = {
    forum: {
        forumTopics: null,
        topicComments: null,
    },
};

const forumSlice = createSlice({
    name: 'forum',
    initialState,
    reducers: {
        setForumTopics(state, action) {
            state.forum.forumTopics = action.payload;
        },
    },
});

export default forumSlice.reducer;
export const { setForumTopics } = forumSlice.actions;
