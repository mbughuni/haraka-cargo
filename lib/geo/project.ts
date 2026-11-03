import { tradeMapProjection } from "@/lib/geo/trade-map-geometry"

export type LonLat = readonly [longitude: number, latitude: number]
export type Point = readonly [x: number, y: number]

/**
 * Natural Earth I projection with the same parameters that
 * scripts/generate-trade-map.mjs used for the land shapes, so any longitude
 * and latitude can be placed on the map without a mapping dependency. The
 * generator verifies the two stay in agreement.
 */
export function project([lon, lat]: LonLat): Point {
  const { scale, translate, rotateLongitude } = tradeMapProjection
  const lambda = ((lon + rotateLongitude) * Math.PI) / 180
  const phi = (lat * Math.PI) / 180
  const phi2 = phi * phi
  const phi4 = phi2 * phi2
  const x =
    lambda *
    (0.8707 -
      0.131979 * phi2 +
      phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4)))
  const y =
    phi *
    (1.007226 +
      phi2 *
        (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)))
  return [translate[0] + scale * x, translate[1] - scale * y]
}

/** Smooth SVG path through the points (Catmull–Rom converted to cubic Béziers). */
export function smoothPath(points: readonly Point[], tension = 0.5) {
  if (points.length < 2) return ""
  const round = (value: number) => Math.round(value * 10) / 10
  let d = `M${round(points[0][0])},${round(points[0][1])}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * tension * 2
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * tension * 2
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * tension * 2
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * tension * 2
    d += ` C${round(c1x)},${round(c1y)} ${round(c2x)},${round(c2y)} ${round(p2[0])},${round(p2[1])}`
  }
  return d
}
