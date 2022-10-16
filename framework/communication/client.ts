import type { TimeStamp } from '../chronology/TimeStamp'

export namespace MoveUpStart {
  export const IO_EVENT = 'move-up-start'
  export interface Data { inputTime: TimeStamp }
}

export namespace MoveRightStart {
  export const IO_EVENT = 'move-right-start'
  export interface Data { inputTime: TimeStamp }
}

export namespace MoveDownStart {
  export const IO_EVENT = 'move-down-start'
  export interface Data { inputTime: TimeStamp }
}

export namespace MoveLeftStart {
  export const IO_EVENT = 'move-left-start'
  export interface Data { inputTime: TimeStamp }
}

export namespace MoveUpEnd {
  export const IO_EVENT = 'move-up-end'
  export interface Data { inputTime: TimeStamp }
}

export namespace MoveRightEnd {
  export const IO_EVENT = 'move-right-end'
  export interface Data { inputTime: TimeStamp }
}

export namespace MoveDownEnd {
  export const IO_EVENT = 'move-down-end'
  export interface Data { inputTime: TimeStamp }
}

export namespace MoveLeftEnd {
  export const IO_EVENT = 'move-left-end'
  export interface Data { inputTime: TimeStamp }
}

export namespace TurnClockwiseStart {
  export const IO_EVENT = 'turn-clockwise-start'
  export interface Data { inputTime: TimeStamp }
}

export namespace TurnCounterClockwiseStart {
  export const IO_EVENT = 'turn-counterclockwise-start'
  export interface Data { inputTime: TimeStamp }
}

export namespace TurnClockwiseEnd {
  export const IO_EVENT = 'turn-clockwise-end'
  export interface Data { inputTime: TimeStamp }
}

export namespace TurnCounterClockwiseEnd {
  export const IO_EVENT = 'turn-counterclockwise-end'
  export interface Data { inputTime: TimeStamp }
}

//TODO
export class EventData<T> {
  public constructor(public readonly IOEvent: string) { }
}