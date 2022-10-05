import { Morphable } from "../morphable/Morphable";

export interface Leap<T extends Morphable<T>> {
  (snapshot: T): T
}