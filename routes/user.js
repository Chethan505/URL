const express=require('express')
const {userSignUp,userLogin}=require('../controller/user')

const router=express.Router()

router.post('/',userSignUp)
router.post('/login',userLogin)

module.exports=router