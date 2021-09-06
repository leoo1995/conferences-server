/** Conferences routes
 *  host /api/conferences
 */
const { Router } = require("express")
const { check } = require("express-validator")
const {
  createConference,
  updateConference,
  deleteConference,
  getConferences,
} = require("../controllers/conferences")
const { isDate } = require("../helpers/isDate")
const { isSpeaker } = require("../helpers/isSpeaker")
const { fieldValidators } = require("../middlewares/field-validators")
const { jwtValidator } = require("../middlewares/jwt-validator")
const router = Router()

router.use(jwtValidator)

// get conferences
router.get("/", getConferences)

//create Conference
router.post(
  "/",
  [
    check("name", "Title is required").not().isEmpty(),
    check("user", "Speaker is required").not().notEmpty(),
    check("user", "He/She has to be a speaker").custom(isSpeaker),
    check("date", "Dat is required").custom(isDate),
    fieldValidators,
  ],
  createConference,
)

// update Conference
router.put("/:id", updateConference)

// delete Conference
router.delete("/:id", deleteConference)

module.exports = router
