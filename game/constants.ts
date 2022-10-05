import { Vector2 } from "shared/framework/math/Vector2"

export namespace Constants {
  export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080
  export const CHRONOLOGY_DURATION = 5

  export const LEVEL_EXTENTS = Vector2.One
}