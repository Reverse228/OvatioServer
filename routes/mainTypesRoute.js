const Router = require("express");
const router = new Router();
const mainTypeController = require("../controllers/mainTypesController");
const checkRole = require("../middleware/checktRoleMiddleware");

router.post("/", mainTypeController.create);
router.post("/changeName", mainTypeController.changeName);
router.post("/deleteMainType", mainTypeController.deleteMainType);
router.get("/", mainTypeController.getAll);

module.exports = router;
