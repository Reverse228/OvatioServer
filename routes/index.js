const Router = require("express");
const router = new Router();
const typeRouter = require("./typeRouter");
const brandRouter = require("./brandRouter");
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const mainTypeRouter = require("./mainTypesRoute");
const userProductRouter = require("./userProductRouter");
const footerNamesRouter = require("./footerNameRouter");
const footerLinksRouter = require("./footerLinksRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/product", productRouter);
router.use("/mainType", mainTypeRouter);
router.use("/userProduct", userProductRouter);
router.use("/footerName", footerNamesRouter);
router.use("/footerLinks", footerLinksRouter);

module.exports = router;
