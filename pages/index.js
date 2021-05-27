import Head from 'next/head';
import Image from 'next/image';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

import Megatron from '../components/Megatron';
import RangeSlider from '../components/RangeSlider';
import usePromise from '../lib/hooks/usePromise';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [result, error, isLoading] = usePromise(() =>
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=rocket-pool,ethereum&vs_currencies=eth%2Cusd`
    ).then(r => r.json())
  );

  let ethRatio, rplUsdPrice, ethUsdPrice;

  if (result && !isLoading) {
    ethRatio = result['rocket-pool'].eth.toFixed(6);
    rplUsdPrice = result['rocket-pool'].usd;
    ethUsdPrice = result['ethereum'].usd;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Rocketpool Ratio Gang</title>
        <meta
          name="description"
          content="Rocketpool ratio gang. Decentralized Ethereum staking pool."
        />
        <link rel="icon" href="/rocketpooliconwithtexture.svg" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.megatronContainer}>
          <Megatron
            isLoading={isLoading}
            result={result}
            rplUsdPrice={rplUsdPrice}
            ethRatio={ethRatio}
          />
        </div>
        <div
          style={{
            marginTop: 120,
            marginBottom: 152,
            width: '100%',
            maxWidth: 640,
          }}
        >
          <RangeSlider
            ethRatio={ethRatio}
            ethUsdPrice={ethUsdPrice}
            rplUsdPrice={rplUsdPrice}
            isLoading={isLoading}
            result={result}
          />
        </div>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
