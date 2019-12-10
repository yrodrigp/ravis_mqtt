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
  // c.end()
})

/* GET home page. */
// router.get("/", function(req, res, next) { 
//   res.render("index", { title: "Express" });
// });

router.get("/", function(req, res, next) {
  console.log("GET")
  /* stablishing connection to mqtt */

  clientMQTT.publish(channel, "hello yamil")

  console.log("req.body", req.body)
  console.log("req.query", req.query)
  res.send("ok")
})

/* POST home page. */
router.post("/", function(req, res, next) {
  console.log("POST")
  /* stablishing connection to mqtt */

  clientMQTT.publish(channel, "hello yamil")

  console.log("req.body", req.body)
  console.log("req.query", req.query)
  res.send("ok")
})

module.exports = router
