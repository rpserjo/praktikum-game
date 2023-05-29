import React, { FC, ReactNode } from 'react';
import Layout from '../../layout/layout';
import { Button } from '../../components/ui';

type IndexPageProps = {
    children: ReactNode;
};

const IndexPage: FC<IndexPageProps> = ({ children = '' }) => (
    <Layout>
        <p>This is application content</p>
        <Button buttonSize="small">Small button</Button>
        <Button buttonSize="medium">Medium button</Button>
        <Button buttonSize="large">Large button</Button>
        <Button buttonSize="medium" buttonStyle="outlined">
            Medium outlined button
        </Button>
        {children}
        {children}
    </Layout>
);

export default IndexPage;
