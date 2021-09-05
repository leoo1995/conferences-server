const { response } = require("express")
const jwt = require("jsonwebtoken")
const jwtValidator = (req, res = response, next) => {
  // x-api-key headers
  const token = req.header("x-api-key")
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "There isn't Token in request",
    })
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED)
    req.uid = uid
    req.name = name
    // console.log(payload)
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token is not valid",
    })
  }

  next()
}

module.exports = { jwtValidator }
