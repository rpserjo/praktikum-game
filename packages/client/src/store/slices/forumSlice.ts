import { createSlice } from '@reduxjs/toolkit';
import { TTopic } from '@/types/forumDataTypes';
// import forumApi from '@/api/ForumApi';

type TForum = {
    forumTopics: TTopic[] | null;
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
        setForumTopics(state, action) {
            state.forum.forumTopics = action.payload;
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
export const { setForumTopics } = forumSlice.actions;
