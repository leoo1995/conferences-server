const { Schema, model } = require("mongoose")

const ConferenceSchema = Schema({
  // conferences properties
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  quota: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    default: "activated",
  },
  attendees: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  availableQuota: {
    type: Number,
  },
  full: {
    type: Boolean,
    default: false,
  },
})

ConferenceSchema.method("toJSON", function () {
  const { __v, _id, user, ...object } = this.toObject()
  object.id = _id
  object.speaker = user
  return object
})

module.exports = model("Conference", ConferenceSchema)
