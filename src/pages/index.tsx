import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Chat = dynamic(() => import('../components/Chat'), {
  ssr: false
});

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/landing');
  }, [router]);

  return null;
}
