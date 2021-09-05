/**
 * Events routes
 * /api/events
 */
const { Router } = require("express")
const { check } = require("express-validator")
const { jwtValidator } = require("../middlewares/jwt-validator")
const { fieldValidators } = require("../middlewares/field-validators")
const { isDate } = require("../helpers/isDate")
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events")

const router = Router()

//everything have to get passed by jwt
router.use(jwtValidator)

//get events
router.get("/", getEvents)

//create event
router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Initial date is required").custom(isDate),
    fieldValidators,
  ],
  createEvent,
)

// update event
router.put("/:id", updateEvent)

// delete event
router.delete("/:id", deleteEvent)

module.exports = router
