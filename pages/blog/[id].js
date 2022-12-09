// pages/blog/[id].js
import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss";

export default function BlogId({ post, draftKey }) {

  console.log('post=>', post.step_flows);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.publishedAt}>{post.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${post.body}`,
        }}
        className={styles.post}
      />
      <p className="category">{post.category && `${post.category.name}`}</p>
      <div className="steps_flow">
        {post.step_flows.map((flow, idx) => (
          <li key={idx}>
            <p><span>{idx + 1}</span> {flow.step_title}</p>
            <p>{flow.step_deteil}</p>
          </li>
        ))}
      </div>
      {/* <div className="location_office">
        <p>{post.jobLocation.office_name}</p>
        <p>{post.jobLocation.addressCountry}</p>
        <p>{[...post.jobLocation.addressRegion]}</p>
      </div> */}
    </main>
  );
}

// export const getServerSideProps = async (context) => {
//   const id = context.params.id;
//   const data = await client.get({ endpoint: "blog", contentId: id });

//   return {
//     props: {
//       blog: data,
//     }
//   };
// };

// // データをテンプレートに受け渡す部分の処理を記述します
// export const getStaticProps = async (context) => {
//   const id = context.params.id;
//   // draftKeyを取得し、クエリを作成する
//   console.log("context=>", context);
//   // const draftKey = context.previewData?.draftKey ?? { draftKey: context.previewData.draftKey };
//   const data = await client.get({ endpoint: "blog", contentId: id });

//   return {
//     props: {
//       blog: data,
//     }
//   };
// };


export const getServerSideProps = async (context) => {
  const { params, previewData } = context
  if (!params?.id) {
    throw new Error('Error: ID not found')
  }

  const isDraft = (arg) => {
    if (!arg?.draftKey) {
      return false
    }
    return typeof arg.draftKey === 'string'
  }

  const id = String(params.id);
  /* requestのクエリパラメータを生成*/
  const draftKey = isDraft(previewData)
    ? { draftKey: previewData.draftKey }
    : {}

  /* draftKeyを付与してリクエストを投げる */
  try {
    const data = await client.getListDetail({
      endpoint: "blog",
      contentId: id,
      queries: draftKey
    });
    return {
      props: {
        post: data,
        ...draftKey,
      },
    };
  } catch (e) {
    /* 失敗したら404 */
    return { notFound: true }
  }
};