const Router = require("express");
const router = new Router();
const footerNameController = require("../controllers/footerNamesController");

router.post("/createFooterNames", footerNameController.create);
router.get("/getAllFooterNames", footerNameController.getAll);
router.post("/changeFooterName", footerNameController.changeName);
router.post("/deleteFooterName", footerNameController.deleteName);

module.exports = router;
