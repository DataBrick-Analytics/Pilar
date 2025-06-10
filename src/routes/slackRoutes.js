const express = require("express");
const router = express.Router();

const slackController = require("../controllers/slackController");

router.post("/slack/save/:id", function (req, res) {
    slackController.saveSlack(req, res);
})

router.get("/slack/getAll/:id", function (req, res) {
    slackController.getAllById(req, res);
})

router.put("/slack/update/:id", function (req, res) {
    slackController.updateSlack(req, res);
})

router.put("/slack/updateStatus/:id", function (req, res) {
    slackController.updateStatus(req, res);
})

router.delete("/slack/delete/:id", function (req, res) {
    slackController.deleteSlack(req, res);
})

module.exports = router;