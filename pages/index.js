import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import CryptoList from '../components/CryptoList'



export default function Home({coins}) {
  console.log(coins)
  return (
    <>
      <Head>
        <title>Crypto Price Updates</title>
        <meta name="description" content="Crypto Price Updates" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main> 
     <Layout>
    <Hero/>
    <CryptoList coins={coins.coins}/>
     </Layout>
      </main>
    </>
  )
}

export const getStaticProps = async() =>{
const res = await fetch("https://api.coinstats.app/public/v1/coins?skip=0&limit=100");
const data = await res.json();

return {
  props: {
    coins: data
  }
}
}
