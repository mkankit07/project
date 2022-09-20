const express=require('express');
const router= express.Router()
const userController= require("../controller/user.controller")

router.post("/auth",userController.addNewUser)
router.post("/auth/login",userController.login)

module.exports = router