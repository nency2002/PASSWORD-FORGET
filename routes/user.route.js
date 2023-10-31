const {Router} = require("express");
const { login, home, signup, signdata, logindata, profile, logout, gallery, reset, resetpass } = require("../controllers/user.controllers");
const passport = require("passport");
const { isAuth } = require("../middleware/user.middleware");
const router = Router();

router.get("/", home)
router.get("/login" , login)
router.get("/signup" ,signup)
router.get("/gallery",isAuth,gallery)
router.get("/reset",reset)

// password reset

router.post("/reset",isAuth ,resetpass )


router.post("/signup",signdata );
router.post("/login",passport.authenticate("local",{
    failureRedirect:"/signup",
    successRedirect:"/",
})
,logindata);
// login hoy to user na data dekhade
router.get("/profile",isAuth, profile);
// logout karva
router.get("/logout",logout)

module.exports = router