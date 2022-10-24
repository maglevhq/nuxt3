export const camelize = (str, uppercaseFirstLetter = false) => {
  let newStr = str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())

  if (uppercaseFirstLetter) { newStr = newStr.charAt(0).toUpperCase() + newStr.slice(1) }

  return newStr
}
