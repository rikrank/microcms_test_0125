// src/pages/preview/index.tsx
import { useState } from 'react'

const NewsPage = () => {
    const [data, setData] = useState()
    useEffect(() => {
        setData({
            title: 'サンプルタイトル',
            publishedAt: 'サンプル日時',
        });
    }, []);

    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.publishedAt}</p>
        </div>
    );
}

export default NewsPage