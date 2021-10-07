import type { NextPage } from "next";
import Head from "next/head";
import { useSelector } from "react-redux";
import ColorPalette from "../component/ColorPalette/ColorPalette";
import Colors from "../component/Colors/Colors";
import styles from "../styles/Home.module.scss";
import { initialState } from "../Redux/store";
const Home: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Home</title>
          <meta name="Home" content="Home" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <div>
            <ColorPalette />
          </div>
          <div>
            <Colors />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
