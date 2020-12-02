const moment = require('moment')

module.exports = {
  equal: (a, b) => {
    if (typeof a !== 'undefined' && typeof b !== 'undefined') {
      return a.toString() === b.toString()
    }
  },
  notEq: (a, b) => {
    if (typeof a !== 'undefined' && typeof b !== 'undefined') {
      return a.toString() !== b.toString()
    }
  },
  toFromNowFormat: (timeOject) => moment(timeOject).fromNow()
}
