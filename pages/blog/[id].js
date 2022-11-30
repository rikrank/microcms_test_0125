// pages/blog/[id].js
import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss";

export default function BlogId({ blog }) {

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className={styles.post}
      />
      <p className="category">{blog.category && `${blog.category.name}`}</p>
      <div className="steps_flow">
        {blog.step_flows.map((flow, idx) => (
          <li key={idx}>
            <p><span>{idx + 1}</span> {flow.step_title}</p>
            <p>{flow.step_deteil}</p>
          </li>
        ))}
      </div>
      <div className="location_office">
        <p>{blog.jobLocation.office_name}</p>
        <p>{blog.jobLocation.addressCountry}</p>
        <p>{[...blog.jobLocation.addressRegion]}</p>
      </div>
    </main>
  );
}

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  // const data = await client.get({
  //   endpoint: "news",
  //   contentId: context.query.id,
  //   queries: { draftKey: context.query.draftKey },
  // });

  return {
    props: {
      blog: data,
    }
  };
};

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
