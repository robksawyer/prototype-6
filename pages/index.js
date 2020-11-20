import React, { useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'

import MainScene from '../components/MainScene'
import HamburgerMenu from '../components/HamburgerMenu'
import WaveText from '../components/WaveText'
import Cercles from '../components/Cercles'
import gsap from 'gsap'

import { TweenMax } from 'gsap'
import { SplitText } from '../gsap-bonus/SplitText'
import { easeCubicInOut } from 'd3-ease'

const CursorCircle = dynamic(() => import('../components/CursorCircle'), {
  ssr: false,
})

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(SplitText)

    const split0 = new SplitText('#b0', { type: 'chars' })
    const split1 = new SplitText('#b1', { type: 'chars' })
    const split2 = new SplitText('#b2', { type: 'chars' })
    const { chars: chars0 } = split0
    const { chars: chars1 } = split1
    const { chars: chars2 } = split2

    chars0.map((char) => {
      const rVal = Math.random() * Math.PI * 2.5

      TweenMax.staggerFrom(
        char,
        1,
        {
          y: -rVal * Math.random(),
          rotation: rVal * Math.random(),
          ease: easeCubicInOut,
          yoyo: true,
          repeat: -1,
        },
        0.05
      )
    })

    chars1.map((char) => {
      const rVal = Math.random() * Math.PI * 2.5

      TweenMax.staggerFrom(
        char,
        5,
        {
          y: rVal * Math.random(),
          rotation: -rVal * Math.random(),
          ease: easeCubicInOut,
          yoyo: true,
          repeat: -1,
        },
        0.05
      )
    })

    chars2.map((char) => {
      const rVal = Math.random() * Math.PI * 2.5

      TweenMax.staggerFrom(
        char,
        1.6,
        {
          y: -rVal * Math.random(),
          rotation: -rVal * Math.random(),
          ease: easeCubicInOut,
          yoyo: true,
          repeat: -1,
        },
        0.05
      )
    })
  }, [])

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
        <div className="absolute flex flex-col text-white">
          <p
            id="b0"
            className="text-6xl tracking-wider text-black uppercase bold -mt-50 font-caslon"
          >
            Beetlejuice
          </p>
          <p
            id="b1"
            className="text-6xl tracking-wider uppercase bold font-caslon"
          >
            Beetlejuice
          </p>
          <p
            id="b2"
            className="text-6xl tracking-wider text-black uppercase bold font-caslon"
          >
            Beetlejuice
          </p>
        </div>

        <Cercles />
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
