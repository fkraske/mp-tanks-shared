import type { Advanceable } from './Advanceable';
import type { Interpolatable } from './Interpolatable';

//TODO rename
export interface Morphable<T extends Interpolatable<T> & Advanceable<T>>
  extends Interpolatable<T>, Advanceable<T> { }