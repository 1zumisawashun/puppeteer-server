const express = require("express");
const router = express.Router();
const automemoController = require("../controllers/automemoController");

router.get("/yodobashi", automemoController.yodobashiApi);
router.get("/bic", automemoController.bicApi);
router.get("/yamada", automemoController.yamadaApi);
router.get("/nojima", automemoController.nojimaApi);
router.get("/edion", automemoController.edionApi);
router.get("/kakakucom", automemoController.kakakucomApi);
router.get("/rakuten", automemoController.rakutenApi);
router.get("/paypay", automemoController.paypayApi);

module.exports = router;
