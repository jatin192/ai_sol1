import dynamic from 'next/dynamic';
import Head from 'next/head';

const Chat = dynamic(() => import('../components/Chat'), {
  ssr: false
});

export default function ChatPage() {
  return (
    <>
      <Head>
        <title>Solana Agent - Chat</title>
        <meta name="description" content="AI-powered Solana assistant for managing your wallet, NFTs, and transactions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          body {
            margin: 0;
            padding: 0;
            height: 100vh;
            overflow: hidden;
          }
        `}</style>
      </Head>

      <main style={{
        height: '100vh',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}>
        <Chat />
      </main>
    </>
  );
}
