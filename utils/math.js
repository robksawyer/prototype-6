/**
 * Math Utilities
 */

/**
 * parabola
 * @param {*} x
 * @param {*} k
 */
export const parabola = (x, k) => {
  return Math.pow(4 * x * (1 - x), k)
}

/**
 * map
 * @param {*} from1
 * @param {*} to1
 * @param {*} from2
 * @param {*} to2
 * @param {*} v
 */
export const map = (from1, to1, from2, to2, v) => {
  return from2 + ((v - from1) * (to2 - from2)) / (to1 - from1)
}
