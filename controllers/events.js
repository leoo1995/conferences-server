const { response } = require("express")
const Event = require("../models/Event")

const getEvents = async (req, res = response) => {
  try {
    const events = await Event.find().populate("user", "name")
    res.json({
      ok: true,
      events,
      msg: "getEvents",
    })
  } catch (e) {
    console.error(e)
  }
}
const createEvent = async (req, res = response) => {
  const event = new Event(req.body)
  try {
    event.user = req.uid
    const savedEvent = await event.save()
    res.json({
      ok: true,
      event: savedEvent,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Contact admin",
    })
  }
}

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id
  const { uid } = req
  try {
    const event = await Event.findById(eventId)
    if (!event)
      return res.status(404).json({
        ok: false,
        msg: "The event was not found",
      })
    if (event.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "You don't have privileges to modify this event",
      })
    const newEvent = {
      ...req.body,
      user: uid,
    }
    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    })

    res.json({
      ok: true,
      eventUpdated,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      ok: false,
      msg: "Contact the admin",
    })
  }
}
const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id
  const { uid } = req
  try {
    const event = await Event.findById(eventId)
    if (!event)
      return res.status(404).json({
        ok: false,
        msg: "The event was not found",
      })
    if (event.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "You don't have privileges to delete this event",
      })

    await Event.findByIdAndDelete(eventId)

    res.json({
      ok: true,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      ok: false,
      msg: "Contact the admin",
    })
  }
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
}
