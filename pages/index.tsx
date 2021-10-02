import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
const Home: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Home</title>
          <meta name="Home" content="Home" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}></main>
      </div>
    </>
  );
};

export default Home;
