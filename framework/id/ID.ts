import { Utils } from '../util/numberUtils'

export type ID = number

export namespace ID {
  export const NULL = 0
  export const POOL_SIZE = 0xFFF
  const INDIVIDUAL_MASK = 0x000F_FFFF
  const INCARNATION_MASK = ~INDIVIDUAL_MASK
  const INCARNATION_UNIT = 0x0010_0000

  export function individual(id: ID) {
    return INDIVIDUAL_MASK & id
  }

  export function incarnation(id: ID) {
    return INCARNATION_MASK & id
  }

  export function incrementIncarnation(id: ID) {
    return id + INCARNATION_UNIT
  }

  export function combine(individual: ID, incarnation: ID) {
    return ID.individual(individual) | ID.incarnation(incarnation)
  }

  export const Converter = new class Converter {
    private pools: number[] = []

    public pushPool(startID: ID) {
      this.pools.push(startID)
    }

    public popPool() {
      this.pools.pop()
    }

    public localToGlobal(id: ID) {
      //TODO throw if out of bounds
      return this.pools[Math.floor(individual(id) / POOL_SIZE)] + individual(id) % POOL_SIZE
    }
    
    public globalToLocal(id: ID) {
      //TODO throw if out of bounds
      return this.pools.findIndex((_, i) => Utils.floor(individual(id), POOL_SIZE) == i) * POOL_SIZE + individual(id) % POOL_SIZE
    }
  }()

  export class PoolManager {
    
  }

  export class Manager {
    public get maxID() { return this.ids.length }

    public create() {
      return this.free === NULL ? this.addID() : this.recycleID()
    }

    public destroy(id: ID) {
      const indId = individual(id)
      this.ids[indId] = combine(this.free, incrementIncarnation(id))
      this.free = indId
    }

    public isValid(id: ID) {
      return individual(id) != NULL && individual(id) < this.maxID
        && incarnation(this.ids[individual(id)]) == incarnation(id)
    }

    private addID() {
      if (this.maxID > INDIVIDUAL_MASK)
        throw new Error('Maximum ID exceeded')
      
      return this.ids.push(this.maxID)
    }

    private recycleID() {
      let result = combine(this.free, this.ids[this.free])
      this.free = individual(this.ids[this.free])
      return this.ids[this.free] = result
    }

    private free = NULL
    private ids = [NULL]
  }
}