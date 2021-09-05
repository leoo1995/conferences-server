const { Schema, model } = require("mongoose")

const EventSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  }, // conferences properties
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  date: {
    type: Date,
    // required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  quota: {
    type: Number,
    // required: true,
  },
  attendees: {
    type: Array,
  },
  availableQuota: {
    type: Number,
  },
  full: {
    type: Boolean,
  },
})

EventSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

module.exports = model("Event", EventSchema)
