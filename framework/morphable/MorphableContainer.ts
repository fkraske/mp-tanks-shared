import { Morphable } from './Morphable'

//TODO ID management
export class MorphableContainer<T extends Morphable<T>> implements Morphable<MorphableContainer<T>>, Iterable<T> {
  public constructor(original?: MorphableContainer<T>) {
    if (!original)
      return
    
    this._ids = new Set(original._ids)
    this._objects = new Map(original._objects)
  }
  
  public get(id: number) {
    return this._objects.get(id)
  }

  public insert(id: number, object: T) {
    let result = new MorphableContainer<T>(this)
    result._ids.add(id)
    result._objects.set(id, object)

    return result
  }

  public delete(id: number) {
    let result = new MorphableContainer<T>(this)
    result._ids.delete(id)
    result._objects.delete(id)

    return result
  }

  //TODO remove return type
  public interpolate(that: MorphableContainer<T>, t: number): MorphableContainer<T> {
    throw new Error('//TODO Method not implemented.');
  }

  public advance(t: number): MorphableContainer<T> {
    throw new Error('//TODO Method not implemented.');
  }

  public get size() { return this._ids.size }

  public *[Symbol.iterator](): Iterator<T> {
    for (let id of this._ids)
      yield this.get(id) as T
  }



  private _ids = new Set<number>()
  private _objects = new Map<number, T>()
}