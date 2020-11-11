/**
 * @file Cercles.js
 *
 * @see https://codepen.io/im_paul_hi/pen/rNaBJZL?editors=1010
 * @see https://www.npmjs.com/package/noisejs
 * @see https://stackoverflow.com/questions/19142993/how-draw-in-high-resolution-to-canvas-on-chrome-and-why-if-devicepixelratio high resolution drawing in canvas
 */
import React, { useEffect, useRef, useState, useMemo } from 'react'
// import Canvas, { useFrame } from 'react-three-fiber'
import PropTypes from 'prop-types'
import { Noise } from 'noisejs'

import { parabola, randomColor, map } from '../../utils/math'

import styles from './Cercles.module.css'

let maxRadius = Math.PI / 2
let margin = 4.025
const numCircles = 60

/**
 * returnPoint
 * @param {number} noiseVal is the value from a libary like noisejs
 *                     e.g. const noiseVal = noise.perlin3(sample.x, sample.y, time * 0.5)
 * @param {*} a
 * @param {*} radius
 * @param {*} time
 * @param {*} index
 */
const returnPoint = (noiseVal, a, radius) => {
  const r = radius + radius * noiseVal
  return {
    x: r * Math.cos(a),
    y: r * Math.sin(a),
  }
}

// const Scene = () => {
//   useFrame((state) => {
//     console.log('state', state)
//   })
//   return null
// }

const Cercles = (props) => {
  const {
    tagName: Tag = 'div',
    className = '',
    variant = 'default',
    children = '',
    strokeColor = 'hotpink',
    bgColor = 'floralwhite',
    randomize = 1,
    frequency = 0.5,
  } = props

  const canvasRef = useRef()

  // Generate some noise
  const noise = useMemo(() => new Noise(Math.random()))

  let mouse = {
    x: 0,
    y: 0,
  }

  useEffect(() => {
    // Set the max radius based on the window
    maxRadius = window.innerWidth * 0.00075 * devicePixelRatio
    margin = margin * devicePixelRatio
  })

  useEffect(() => {
    const { current: canvas } = canvasRef
    const mouseMove = (e) => {
      mouse.x = (e.clientX / canvas.width) * 2 - 1
      mouse.y = -(e.clientY / canvas.height) * 2 + 1
    }
    document.addEventListener('mousemove', mouseMove)

    return () => {
      document.removeEventListener('mousemove', mouseMove)
    }
  })

  /**
   * drawCircle
   * @param {*} ctx
   * @param {object} mouse mouse position
   * @param {number} radius circle radius
   * @param {number} time adjusted time from requestAnimationFrame
   * @param {number} index circle index
   */
  const drawCircle = (ctx, mouse, radius, time, index) => {
    const angleStep = (2 * Math.PI) / 200

    ctx.beginPath()

    // ctx.lineWidth = 3

    const { x, y } = mouse
    for (let a = 0; a < Math.PI * 2; a += angleStep) {
      const sample = {
        x: map(-1, 1, 0.0, 0.004, x) * radius * Math.cos(a - time * 0.2),
        y: map(-1, 1, 0.0, 0.004, y) * radius * Math.sin(a - time * 0.2),
      }
      const noiseVal = noise.perlin3(sample.x, sample.y, time * frequency)
      const point = returnPoint(noiseVal, a, radius)

      ctx.lineTo(point.x, point.y)
    }

    ctx.strokeStyle = randomize ? randomColor : strokeColor

    ctx.stroke()
  }

  useEffect(() => {
    const { current: canvas } = canvasRef
    const ctx = canvas.getContext('2d')
    var rect = canvas.getBoundingClientRect()
    canvas.width =
      Math.round(devicePixelRatio * rect.right) -
      Math.round(devicePixelRatio * rect.left)
    canvas.height =
      Math.round(devicePixelRatio * rect.bottom) -
      Math.round(devicePixelRatio * rect.top)

    /**
     * render
     * @param {*} time
     */
    const render = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // ctx.imageSmoothingEnabled = ctx.mozImageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = false // for zoom!

      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.save()

      // Handles centering the circles into the middle of the canvas
      ctx.translate(canvas.width * 0.5, canvas.height * 0.5)

      // Generates the circles
      for (let i = 0; i < numCircles; i++) {
        const radius = i * margin * maxRadius
        drawCircle(ctx, mouse, radius, time, i)
      }

      ctx.restore()
    }

    /**
     * loop
     * @param {number} time
     */
    const loop = (time) => {
      frameId = requestAnimationFrame(loop)

      // slow down time
      time *= 0.001

      render(time)
    }

    let frameId = loop()

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [mouse])

  return (
    <Tag
      className={`${styles.cercles} ${
        styles[`cercles__${variant}`]
      } ${className}`}
    >
      {/* <Canvas ref={canvasRef} className="w-screen h-scree">
        <Scene />
      </Canvas> */}
      <canvas className="w-screen h-screen" ref={canvasRef} />
    </Tag>
  )
}

Cercles.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
  strokeColor: PropTypes.string,
  bgColor: PropTypes.string,
  randomize: PropTypes.bool,
}

export default Cercles
