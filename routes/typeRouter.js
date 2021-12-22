const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");
const checkRole = require("../middleware/checktRoleMiddleware");

router.post("/", typeController.create);
router.post("/updateName", typeController.updadeInfo);
router.post("/deleteType", typeController.deleteType);
router.get("/", typeController.getAll);

module.exports = router;
