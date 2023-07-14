import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import style from '../forum.module.scss';
import MockServer from '@/mocks/mock-server';
import ForumContent from '@/pages/forum/forumContent/forumContent';
import { Loader } from '@/components/ui';

const Forum: FC = () => {
    const { page = 1 } = useParams();

    const MAX_ELEMENTS_PER_PAGE = 10;
    const server = new MockServer();
    const serverData = server.getTopicList(+page, MAX_ELEMENTS_PER_PAGE);

    if (!serverData) {
        return <Loader />;
    }
    return (
        <main className={style.main}>
            <ForumContent serverData={serverData} page={+page} />
        </main>
    );
};

export default Forum;
