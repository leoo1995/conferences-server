/**
 * Events routes
 * /api/events
 */
const { Router } = require("express")
const { jwtValidator } = require("../middlewares/jwt-validator")

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
router.post("/", createEvent)

// update event
router.put("/:id", updateEvent)

// delete event
router.delete("/:id", deleteEvent)

module.exports = router
