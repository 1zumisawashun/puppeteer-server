const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");

router.get("/", listController.list_index);
router.get("/create", listController.list_create_get);
router.get("/:id", listController.list_detail);
router.post("/", listController.list_create_post);
router.delete("/:id", listController.list_delete);

module.exports = router;
