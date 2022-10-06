import { Vector2 } from "../framework/math/Vector2"

export namespace Constants {
  export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080
  export const TICK_RATE = 1
  export const CHRONOLOGY_DURATION = 5

  export const LEVEL_EXTENTS = Vector2.One
}