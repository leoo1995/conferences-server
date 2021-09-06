const jwt = require("jsonwebtoken")

const generateJWT = (uid, name, role) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, role }
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) {
          console.log(err)
          reject("Token couldn't be generated")
        }
        resolve(token)
      },
    )
  })
}
module.exports = {
  generateJWT,
}
