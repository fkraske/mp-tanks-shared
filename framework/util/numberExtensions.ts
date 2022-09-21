interface Number extends Interpolatable<number> { }

Number.prototype.interpolate = function(other: number, t: number) {
  return (1 - t) * Number(this) + t * other
}