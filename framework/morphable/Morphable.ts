import { Advanceable } from "./Advanceable";
import { Interpolatable } from "./Interpolatable";

//TODO rename
export interface Morphable<T extends Interpolatable<T> & Advanceable<T>>
  extends Interpolatable<T>, Advanceable<T> { }