export function restoreClassObject<T>(target: T, source: T) {
  return restoreClassObjectInternal(target, source) as T
}

function restoreClassObjectInternal(target: any, source: any) {
  for (const key in source)
    if (typeof(source[key]) === 'object')
      if (source[key] == null)
        target[key] = null
      else
        restoreClassObjectInternal(target[key] = target[key] ?? {}, source[key])
    else
      target[key] = source[key]

  return target
}