const express = require("express");
const router = express.Router();
const automemoController = require("../controllers/automemoController");

router.get("/yodobashi", automemoController.yodobashi);
router.get("/bic", automemoController.bic);
router.get("/yamada", automemoController.yamada);
router.get("/nojima", automemoController.nojima);
router.get("/edion", automemoController.edion);
router.get("/kakakucom", automemoController.kakakucom);
router.get("/rakuten", automemoController.rakuten);
router.get("/paypay", automemoController.paypay);

module.exports = router;
