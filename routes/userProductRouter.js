const Router = require("express");
const router = new Router();
const userProductController = require("../controllers/userProductController");

router.post("/create", userProductController.create);
router.post("/updateStatus", userProductController.updateStatus);
router.post("/getStatus", userProductController.getStatus);
router.post("/deleteOne", userProductController.deleteOne);
router.get("/getAll", userProductController.getAll);

module.exports = router;
