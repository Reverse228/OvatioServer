const Router = require("express");
const router = new Router();
const UserController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checktRoleMiddleware");

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.get("/auth", authMiddleware, UserController.check);
router.get("/allUser", checkRole("ADMIN"), UserController.getAll);

module.exports = router;
