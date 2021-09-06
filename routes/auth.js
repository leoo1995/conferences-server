/**
 *  Users routes auth
 *  host + /api/auth
 */
const { Router } = require("express")
const { check } = require("express-validator")
const { fieldValidators } = require("../middlewares/field-validators")
const { jwtValidator } = require("../middlewares/jwt-validator")
const router = Router()
const {
  createUser,
  loginUser,
  revalidateToken,
  getUsers,
} = require("../controllers/auth")

router.get("/", getUsers)

router.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "The password has to be at least 6 characters long",
    ).isLength({ min: 6 }),
    check("role", "Role is required")
      .not()
      .isEmpty()
      .custom(val => val === "speaker" || val === "attendant"),
    check("confirmPassword", "Passwords have to match").custom(
      (val, { req }) => val === req.body.password,
    ),
    fieldValidators,
  ],
  createUser,
)
router.post(
  "/",
  [check("email", "Email is required").isEmail(), fieldValidators],
  loginUser,
)
router.get("/renew", jwtValidator, revalidateToken)
module.exports = router
