import { createSlice } from '@reduxjs/toolkit';
import { TCommentListData, TTopic, TTopicListData } from '@/types/forumDataTypes';
// import forumApi from '@/api/ForumApi';

type TForum = {
    topicList: TTopicListData | null;
    topic: TTopic | null;
    topicComments: TCommentListData | null;
};

export type TForumState = {
    forum: TForum;
};

const initialState: TForumState = {
    forum: {
        topicList: null,
        topic: null,
        topicComments: null,
    },
};

// Комментарий для ревьюера практикума:
// Планирую сегодня либо добить редакс для форума либо комментарии
// уберу перед зачетом и залью в dev как есть (зачет завтра)

/* interface IForumService {
    getForumTopics(): Promise<TTopic[]>;
} */

/* const loadForumTopics = createAsyncThunk<TTopic[]>('root/AuthUser', async (_, thunkApi) => {
    const service: IForumService = thunkApi.extra as IForumService;
    return service.getForumTopics();

    api -> AppDispatch
}); */

/* export const fetchForumData = createAsyncThunk<TTopic[], undefined>(
    'forum', async(_) => {
        const topicData = await forumApi.getTopics(1, 10, ()=>{}, ()=>{});
        return forumApi().getTopics(1, 10);
        const service: IForumService = thunkApi.extra as IForumService;
        return service.getForumTopics();

    }
); */

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
        fetchTopicList(state, action) {
            // todo fetch from server
            console.log(state, action);
        },
    },
    /* extraReducers: builder => {
        /* builder.addCase(loadUser.pending, state => {
            state.isLoaded = false;
            state.isLoading = true;
        });
        builder.addCase(loadUser.rejected, state => {
            state.isLoaded = true;
            state.user = null;
            state.isLoading = false;
        }); */
    /* builder.addCase(loadForumTopics.fulfilled, (state, action) => {
            const { payload } = action;
            state.forum.forumTopics = payload;
        });
    }, */
});

export default forumSlice.reducer;
export const { setTopic, setTopicComments, setTopicList } = forumSlice.actions;
