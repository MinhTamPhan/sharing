// random 1 phần tử trong mảng
const randomChoice = arr => arr[Math.floor(arr.length * Math.random())]
const lut11 = [7, 4, 10, 6, 9, 1, 5, 2, 0, 3, 8]
const lut10 = [7, 4, 6, 9, 1, 5, 2, 8, 3, 0]
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const totalDigitWithoutChecksum = 10
const caculatorModular = digits => {
  sum = 0
  for (let i = 0; i < digits.length; i++)
    sum += digits[i] * (10 - i)
  return sum  % 11
}

/* CheckISBN
** https://en.wikipedia.org/wiki/International_Standard_Book_Number
*/
const checkHackBrain = digits => {
  let i, s = 0, t = 0
  for (i = 0; i < 10; i++) {
    t += digits[i]
    s += t
  }
  return s % 11
}

const checksumDigits = (digits, checksum) =>  caculatorModular(digits) === checksum

const shuffle = digits => {
  let lut = digits.length === 10 ? lut10 : lut11
  let res = []
  for (let i = 0; i < lut.length; i++) res.push(digits[lut[i]])
  return res
}

const restoreDigitShuffled = (digits, isShuffle) => {
  let lut = digits.length === 10 ? lut10 : lut11
  if (digits.length === 10 && !isShuffle) lut = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  if (digits.length === 11 && !isShuffle) lut = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  let digitLenth = 10
  let checksum = null
  let restoreDitgits = new Array(digitLenth)
  for (let i = 0; i < lut.length; i++) {
    if (lut[i] < digitLenth) restoreDitgits[lut[i]] = parseInt(digits[i])
    else checksum = parseInt(digits[i])
  }
  checksum = digits.length === 10 ? 0 : checksum
  return { digits: restoreDitgits, checksum }
}

const verifyDigits = (digitString, isShuffle) => {
  digitString = `${digitString}`
  if (digitString.length > 11 || digitString.length < 10) throw new Error('digits length must be equal 11 or 10')
  const { digits, checksum } = restoreDigitShuffled(digitString, isShuffle)
  // console.log('digits, checksum', digits, checksum)
  return checksumDigits(digits, checksum)
}

const genarateAccount = (prefix, isShuffle, checkExistDB) => {
  prefix = `${prefix}`
  let prefixLengh = prefix.length
  if (prefixLengh > 10) throw new Error('prefix length must be < 11')
  try {
    parseInt(prefix)
  } catch (error) {
    throw new Error('prefix must be contrains digits')
  }
  let numOfDigitRandom = totalDigitWithoutChecksum - prefixLengh
  let isExist = true
  let accountDitgits
  while (isExist) {
    accountDitgits = []
    for (let i = 0; i < prefixLengh; i++) accountDitgits.push(parseInt(prefix[i]))
    while (numOfDigitRandom !== 0) {
      numOfDigitRandom--
      accountDitgits.push(randomChoice(digits))
    }
    const checksum = caculatorModular(accountDitgits)
    if (checksum !== 10) accountDitgits.push(checksum)
    if (isShuffle) accountDitgits = shuffle(accountDitgits)
    if (checkExistDB) {
      isExist = checkExistDB(accountDitgits.join(''))
      numOfDigitRandom = totalDigitWithoutChecksum - prefixLengh
    }
  }
  return accountDitgits.join('')
}

module.exports = {
  genarateAccount,
  verifyDigits
}
