export function deepMerge<T>(target: T, source: T) {
  return deepMergeInternal(target, source) as T
}

function deepMergeInternal(target: any, source: any) {
  for (const key in source)
    if (typeof(source[key]) === 'object' && source[key])
      deepMergeInternal(target[key] = target[key] || {}, source[key])
    else
      target[key] = source[key]

  return target
}