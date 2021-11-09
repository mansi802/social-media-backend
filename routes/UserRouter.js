const router = require("express").Router();
const { login, register, getUserInfo } = require("../controllers/User");

router.post("/register", register);
router.post("/login", login);


module.exports = router;