/**
 * useAnimationFrameRate
 * Hook that allows easy access to requestAnimationFrame using a specific frame rate.
 * @see https://medium.com/source-true/animate-react-component-with-configurable-frame-rate-6e916572d0af
 *
 * Example
 * const degrees = useAnimationFrameRate(24)
 */
import React, { useEffect, useState } from 'react'

let maxFPS = 60
let frameCount = 0

/**
 * useAnimationFrameRate
 * @param {number} frameRate
 * @param {number} increment
 * @param {number} timeMultiplier is multiplied by the frame id
 */
export const useAnimationFrameRate = (
  frameRate = 24,
  increment = 1,
  timeMultiplier = 0.001
) => {
  const [state, setState] = useState({ frame: 0, time: 0, degree: 0 })

  // Start the animation
  useEffect(() => {
    const f = () => {
      frameCount++
      if (frameCount >= Math.round(maxFPS / frameRate)) {
        setState((previous) => {
          return {
            frame: frameId,
            time: frameId * timeMultiplier,
            degree: (previous.degree + increment) % 360,
          }
        })
        frameCount = 0
      }
      frameId = requestAnimationFrame(f)
    }

    let frameId = requestAnimationFrame(f)

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return state
}
