const { response } = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const { generateJWT } = require("../helpers/jwt")

const createUser = async (req, res = response) => {
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (user)
      return res.status(400).json({
        ok: false,
        msg: "It already exists an user with this email",
      })
    user = new User(req.body)

    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    //jwt

    const token = await generateJWT(user.id, user.name)

    res.status(201).json({
      ok: true,
      msg: "register",
      uid: user.id,
      name: user.name,
      token,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the admin",
    })
  }
}

const loginUser = async (req, res = response) => {
  console.log(req.body)
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user)
      return res.status(400).json({
        ok: false,
        msg: "The user doesn't exist",
      })
    // compare the passwords
    const validPassword = bcrypt.compareSync(password, user.password)

    if (!validPassword)
      return res.status(400).json({
        ok: false,
        msg: "Incorrect password",
      })

    //jwt
    const token = await generateJWT(user.id, user.name)

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      role: user.role,
      token,
    })
  } catch (error) {
    console.error(error)
  }
}

const revalidateToken = async (req, res = response) => {
  const { uid, name, role } = req
  // generate token
  const token = await generateJWT(uid, name, role)
  res.json({
    ok: true,
    msg: "renew",
    role,
    uid,
    name,
    token,
  })
}
module.exports = {
  createUser,
  loginUser,
  revalidateToken,
}
