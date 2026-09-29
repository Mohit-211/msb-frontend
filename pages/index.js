import Head from 'next/head'
import Otp from './otp'
import Home from './home'
import Landing from '@/Component/landing/landing'
export default function Index() {
  return (
    <>
      <Head>
        <title>MyStoryBank</title>
        <meta name="description" content="My Story Bank 2.0" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </>
  )
}
