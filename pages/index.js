import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'

import HamburgerMenu from '../components/HamburgerMenu'
import Cercles from '../components/Cercles'

import { randomColor } from '../utils/math'

const CursorCircle = dynamic(() => import('../components/CursorCircle'), {
  ssr: false,
})

export default function Home() {
  const [color, setColor] = React.useState('#fff')
  React.useState(() => {
    if (randomColor) {
      setColor(randomColor)
    }
  }, [randomColor])
  return (
    <div
      className={`${styles.container} min-h-screen flex flex-col justify-center align-center`}
    >
      <Head>
        <title>prototype</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HamburgerMenu />
      <main
        className={`${styles.main} flex flex-grow flex-col justify-center items-center`}
      >
        {/* <MainScene /> */}
        <p
          className="absolute font-sans text-6xl font-black tracking-wide"
          style={{
            color: `${color || '#fff'}`,
          }}
        >
          PROTOTYPE #6
        </p>
        <Cercles frequency={0.75} randomize={false} strokeColor={color} />
        {/* <WaveText className="absolute bottom-0 flex items-center justify-center w-screen h-screen pointer-events-none select-none" /> */}
      </main>

      <footer
        className={`${styles.footer} w-full h-50 bg-black text-white px-40 flex align-center items-center justify-center uppercase`}
      >
        Powered by passion
      </footer>
      <CursorCircle />
    </div>
  )
}
