// check if all errors type is validation error
const allValidationError = (err) => {
  let result = true
  err.forEach((error) => {
    if (error.type !== 'Validation error') result = false
  })
  return result
}

// transform error strings into error array
const errorMsgToArray = (errorMsg) => {
  if (errorMsg.length === 0) {
    return errorMsg
  } else {
    const strArr = errorMsg.split(',')
    strArr.forEach((errorMsg, index) => {
      const colonIndex = errorMsg.indexOf(':')
      strArr[index] = errorMsg.slice(colonIndex + 1, errorMsg.length).trim()
    })
    return strArr
  }
}

module.exports = {
  allValidationError,
  errorMsgToArray
}
