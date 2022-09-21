//TODO rename
export interface Advanceable<T extends Advanceable<T>> {
  advance(t: number): T
}