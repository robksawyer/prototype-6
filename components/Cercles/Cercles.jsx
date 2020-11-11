/**
 * @file Cercles.js
 *
 * @see https://codepen.io/im_paul_hi/pen/rNaBJZL?editors=1010
 * @see https://www.npmjs.com/package/noisejs
 */
import React, { useEffect, useRef, useState, useMemo } from 'react'
// import Canvas, { useFrame } from 'react-three-fiber'
import PropTypes from 'prop-types'
import { Noise } from 'noisejs'
import { MathUtils } from 'three'

import { parabola, map } from '../../utils/math'

import styles from './Cercles.module.css'

import { useAnimationFrameRate } from '../../hooks/useAnimationFrameRate'
import { useMousePosition } from '../../hooks/useMousePosition'

let maxRadius = Math.PI / 2
const numCircles = 60
const margin = 2.025

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
  const { tagName: Tag, className, variant, children } = props

  const canvasRef = useRef()

  // Generate some noise
  const noise = useMemo(() => new Noise(Math.random()))

  const origMouse = useMousePosition()
  const [mouse, setMouse] = useState({
    x: origMouse.x,
    y: origMouse.y,
  })

  useEffect(() => {
    // Set the max radius based on the window
    maxRadius = window.innerWidth * 0.00075
  })

  useEffect(() => {
    const { current: canvas } = canvasRef
    const { x, y } = origMouse
    const mouse = {
      x: (x / canvas.width) * 2 - 1,
      y: -(y / canvas.height) * 2 + 1,
    }
    setMouse(mouse)
  }, [origMouse])

  // Update the mouse values
  // useEffect(() => {
  //   const { x, y } = origMouse
  //   const { current: canvas } = canvasRef
  //   mouse = {
  //     x: (x / canvas.width) * 2 - 1,
  //     y: -(y / canvas.height) * 2 + 1,
  //   }
  // }, [origMouse])

  /**
   * drawCircle
   * @param {*} radius
   * @param {*} time
   * @param {*} index
   */
  const drawCircle = (ctx, mouse, radius, time) => {
    const angleStep = (2 * Math.PI) / 200

    ctx.beginPath()

    // ctx.lineWidth = 3

    const start = {
      x: radius * Math.cos(0),
      y: radius * Math.sin(0),
    }
    const { x, y } = mouse
    for (let a = 0; a < Math.PI * 2; a += angleStep) {
      const sample = {
        x: map(-1, 1, 0.0, 0.004, x) * radius * Math.cos(a - time * 0.2),
        y: map(-1, 1, 0.0, 0.004, y) * radius * Math.sin(a - time * 0.2),
      }
      const noiseVal = noise.perlin3(sample.x, sample.y, time * 0.5)
      const point = returnPoint(noiseVal, a, radius)
      ctx.lineTo(point.x, point.y)
    }

    ctx.strokeStyle = '#040404'
    ctx.stroke()
  }

  useEffect(() => {
    const { current: canvas } = canvasRef
    const ctx = canvas.getContext('2d')

    /**
     * render
     * @param {*} time
     */
    const render = (time) => {
      ctx.fillStyle = '#F4F4F4'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.save()

      ctx.translate(canvas.width * 0.5, canvas.height * 0.5)

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
}

Cercles.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
}

export default Cercles
