const Router = require("express");
const router = new Router();
const footerLinks = require("../controllers/footerLinksController");

router.post("/createFooterLink", footerLinks.create);
router.get("/getAllFooterLink", footerLinks.getAll);
router.post("/getFooterLinkWithId", footerLinks.getAllWithFooterNameId);
router.post("/changeFooterLink", footerLinks.changeLink);
router.post("/deleteFooterLink", footerLinks.deleteLink);

module.exports = router;
