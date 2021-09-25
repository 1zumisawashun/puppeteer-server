const express = require("express");
const router = express.Router();
const meetingowlController = require("../controllers/meetingowlController");

router.get("/yodobashi", meetingowlController.yodobashiApi);
router.get("/bic", meetingowlController.bicApi);
router.get("/yamada", meetingowlController.yamadaApi);
router.get("/nojima", meetingowlController.nojimaApi);
router.get("/edion", meetingowlController.edionApi);
router.get("/kakakucom", meetingowlController.kakakucomApi);
router.get("/rakuten", meetingowlController.rakutenApi);
router.get("/paypay", meetingowlController.paypayApi);

module.exports = router;
