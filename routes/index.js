var express = require("express");
var router = express.Router();
var mqtt = require("mqtt")

const channel = "ravis/influx"
const clientMQTT = mqtt.connect("mqtt://18.202.41.95")

clientMQTT.on("connect", function () {
  // console.log("Connection done!")
  clientMQTT.subscribe(channel, function (err) {
    clientMQTT.publish(channel, "hello yamil")
  })
})
 
clientMQTT.on("message", function (topic, message) {
  console.log("from subscriber", topic)
  console.log(topic, message.toString())
})

function core(res, req) {
  /* stablishing connection to mqtt */
  clientMQTT.publish(channel, JSON.stringify(req.query))
  console.log("req.body", req.body)
  console.log("req.query", req.query)
  // console.log("req", req)
  res.send("ok")
}

router.get("/", function(req, res, next) {
  console.log("GET")
  core(res, req)
})

/* POST home page. */
router.post("/", function(req, res, next) {
  console.log("POST")
  core(res, req)
})

router.post("/write", function(req, res, next) {
  console.log("POST write")
  core(res, req)
})

module.exports = router
