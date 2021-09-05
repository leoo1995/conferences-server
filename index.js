const express = require("express")
const { dbConnection } = require("./database/config.js")
const cors = require("cors")
require("dotenv").config()
const app = express()

//database

dbConnection()

//cors
app.use(cors())

//public directory
app.use(express.static("public"))

//read and parse of the body
app.use(express.json())

//routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/events", require("./routes/events"))

app.listen(process.env.PORT, () => {
  console.log("Running on " + process.env.PORT + " port")
})
