const {  genarateAccount, verifyDigits } = require('./idGenerator')

const generateNonSuff = () => {
  let setAccount = new Set()
  let count = 0
  const checkDB = (account) => {
    let res = setAccount.has(account)
    if (res) count += 1
    if (res === true)
    return res
  }
  for (let i = 0; i < 1000000; i++) {
    const account = genarateAccount('472', false, checkDB)
    setAccount.add(account)
  }
  console.log(`total account genarator: ${setAccount.size}`)
  console.log(`num of existing database is: ${count}`)
  console.log('=================printf 10 account======================')
  let i = 0
  for (let it = setAccount.values(), val= null; val = it.next().value; ) {
    console.log(val);
    if (i === 10) break
    i ++
  }
  console.log('==================end test=============================')
}

const generateSuff = () => {
  let setAccount = new Set()
  let count = 0
  const checkDB = (account) => {
    let res = setAccount.has(account)
    if (res) count += 1
    if (res === true)
    return res
  }
  for (let i = 0; i < 1000000; i++) {
    const account = genarateAccount('', true, checkDB)
    setAccount.add(account)
  }
  console.log(`total account genarator: ${setAccount.size}`)
  console.log(`num of existing database is: ${count}`)
  console.log('=================printf 10 account======================')
  let i = 0
  for (let it = setAccount.values(), val= null; val = it.next().value; ) {
    console.log(val);
    if (i === 10) break
    i ++
  }
  console.log('==================end test=============================')
}

const buteForceNonSuff = () => {
  let validAccount = 47210576371  // start validAccount
  let count = 0
  // console.log('verifyDigits(validAccount, false) ' + verifyDigits(validAccount, false))
  for (let i = 0; i < 1000000; i++) {
    if (verifyDigits(validAccount, false)) count ++
    validAccount += 1
  }
  console.log(`num account pass verify digits ${count}`)
}

const buteForceSuff = () => {
  let validAccount = 25370884395  // start validAccount
  let count = 0
  for (let i = 0; i < 1000000; i++) {
    if (verifyDigits(validAccount, true)) count ++
    validAccount += 1
  }
  console.log(`num account pass verify digits ${count}`)
}

// generateNonSuff()
// generateSuff()
// buteForceNonSuff()
// buteForceSuff()

if (process.argv.length < 3) {
  console.log('usge: node testingIdGenarator.js -nonsuff, -suff, -buteforce,-bfsuff')
  return
}
let task = process.argv[2]
if (task === '-nonsuff') {
  console.log(`process ${task}`)
  generateNonSuff()
}
if (task === '-suff') {
  console.log(`process ${task}`)
  generateSuff()
}
if (task === '-buteforce') {
  console.log(`process ${task}`)
  buteForceNonSuff()
}
if (task === '-bfsuff') {
  console.log(`process ${task}`)
  buteForceSuff()
}