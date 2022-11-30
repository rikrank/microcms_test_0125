// src/pages/preview/index.tsx
import { useEffect, useState } from 'react'
import { client } from '../../libs/client';

const NewsPage = ({ data }) => {

    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.publishedAt}</p>
        </div>
    );
}

export default NewsPage

export const getServerSideProps = async (context) => {

    const data = await client.get({
        endpoint: "blog",
        contentId: context.query.id,
        queries: { draftKey: context.query.draftKey },
    });

    return {
        props: { data },
    };
};

// https://microcms-test-0125.vercel.app/preview?slug={CONTENT_ID}