const express = require("express")

const router = express.Router()

const deployController = require("../controllers/deployContract")
router.get("/deploy", deployController.getDeploy)

router.post("/deploy",deployController.postDeploy)

router.get("/general", deployController.getGeneral)

module.exports = router
