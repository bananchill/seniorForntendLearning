// stringify.js
const isNonSerializable = v =>
  typeof v === 'undefined' || typeof v === 'function' || typeof v === 'symbol'

const isPrimitive = v =>
  v === null || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean'

export default function stringify(value, replacer = ' ', spacesCount = 1) {
  const unit = typeof replacer === 'string' ? replacer : ' '
  const perLevel = Number.isInteger(spacesCount) ? spacesCount : 1

  const format = (val, depth) => {
    if (isNonSerializable(val)) return undefined
    if (isPrimitive(val)) return String(val)

    const indent = unit.repeat(perLevel * (depth + 1))
    const closeIndent = unit.repeat(perLevel * depth)

    // Arrays
    if (Array.isArray(val)) {
      const lines = []
      for (const el of val) {
        if (isNonSerializable(el)) continue
        const rendered = format(el, depth + 1)
        if (rendered === undefined) continue
        lines.push(`${indent}${rendered}`)
      }
      if (lines.length === 0) return '[]'
      return `[\n${lines.join('\n')}\n${closeIndent}]`
    }

    // Objects
    const lines = []
    for (const key of Object.keys(val)) {
      const el = val[key]
      if (isNonSerializable(el)) continue
      const rendered = format(el, depth + 1)
      if (rendered === undefined) continue
      lines.push(`${indent}${key}: ${rendered}`)
    }
    if (lines.length === 0) return '{}'
    return `{\n${lines.join('\n')}\n${closeIndent}}`
  }

  return format(value, 0)
}
