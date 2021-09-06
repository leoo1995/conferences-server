const { response } = require("express")
const Conference = require("../models/Conference")

const getConferences = async (req, res = response) => {
  try {
    const conferences = await Conference.find().populate("user", "name")
    res.json({
      ok: true,
      conferences,
      msg: "getConferences",
    })
  } catch (e) {
    console.error(e)
  }
}

//create a conference
const createConference = async (req, res = response) => {
  const conference = new Conference(req.body)
  const { quota, attendees } = conference
  try {
    conference.user = req.uid
    conference.availableQuota = quota - attendees.length
    const savedConference = await conference.save()
    res.json({
      ok: true,
      conference: savedConference,
    })
  } catch (error) {
    console.error(error)
  }
}
const updateConference = async (req, res = response) => {
  const conferenceId = req.params.id
  const { uid } = req
  try {
    const conference = await Conference.findById(conferenceId)
    const { quota, attendees } = conference

    if (!conference)
      return res.status(404).json({
        ok: false,
        msg: "The conference was not found",
      })
    if (conference.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "You don't have privileges to modify this conference",
      })
    const availableQuota = quota - attendees.length
    const full = quota === attendees.length
    const newConference = {
      ...req.body,
      user: uid,
      availableQuota,
      full,
    }
    const conferenceUpdated = await Conference.findByIdAndUpdate(
      conferenceId,
      newConference,
      {
        new: true,
      },
    )

    res.json({
      ok: true,
      conferenceUpdated,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      ok: false,
      msg: "Contact the admin",
    })
  }
}

const deleteConference = async (req, res = response) => {
  const conferenceId = req.params.id
  const { uid } = req
  try {
    const conference = await Conference.findById(conferenceId)
    if (!conference)
      return res.status(404).json({
        ok: false,
        msg: "The conference was not found",
      })
    if (conference.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "You don't have privileges to delete this conference",
      })

    await Conference.findByIdAndDelete(conferenceId)

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
  getConferences,
  createConference,
  updateConference,
  deleteConference,
}
