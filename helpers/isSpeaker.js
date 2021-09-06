const isSpeaker = (value, { req, res, path }) => {
  if (!value) return false
  return value !== "speaker"
}
module.exports = { isSpeaker }
