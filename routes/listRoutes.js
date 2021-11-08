const express = require("express");
const multer = require("multer");
const router = express.Router();
const listController = require("../controllers/listController");
const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/", listController.list_index);
router.get("/create", listController.list_create_get);
router.get("/:id", listController.list_detail);
router.post("/", upload.single("file"), listController.list_create_post);
router.delete("/:id", listController.list_delete);

module.exports = router;
