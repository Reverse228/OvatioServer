const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController");

router.post("/create", productController.create);
router.post("/updateCount", productController.updateInfo);
router.post("/update", productController.updateInfoAll);
router.post("/deleteOneItem", productController.deleteOneItem);
router.post("/getAll", productController.getAll);
router.post("/searchAdminAll", productController.searchProduct);
// router.post("/getInfoWithProps", productController.getInfo);
router.get("/:id", productController.getOne);

module.exports = router;
