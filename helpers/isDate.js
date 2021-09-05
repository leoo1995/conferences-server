const dayjs = require("dayjs")

const isDate = (value, { req, res, path }) => {
  if (!value) return false

  return dayjs(value).isValid()
}
module.exports = { isDate }
