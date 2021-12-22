const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController");

router.post("/create", brandController.create);
router.post("/getInfoWithProps", brandController.getInfo);
router.get("/", brandController.getAll);
router.put("/update", brandController.update);
router.post("/delete", brandController.delete);

module.exports = router;
