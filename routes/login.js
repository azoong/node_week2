const express = require('express');
const router = express.Router();
const { Member } = require("../models");

const jwt = require("jsonwebtoken")

router.get("/" ,(req, res ) => {
    res.send("welcome to login")
})

router.post("/", async (req, res) => {
    try{
        const { nickname, password } = req.body 

        const user = await Member.findOne({ where: { nickname, password } })
        if (!user){
            res.status(400).send({ 
                errorMessage: '잘못된 닉네임 또는 패스워드입니다.'
            })
            return
        }

        const token = jwt.sign({ privatekey : user.id}, "secret_key")
        res.send({
            token
        })
    }catch(err){
        console.log(err);
        res.status(400).send({
            errorMessage: "요청한 데이터 형식이 알맞지 않습니다."
        })
    }
})









module.exports = router;