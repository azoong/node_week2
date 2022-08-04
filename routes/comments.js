const express = require('express');

const { Comment } = require("../models");
const { Post } = require("../models");
const authMiddleware = require("../middlewares/auth_middlewares")

const router = express.Router();

router.get("/" ,(req, res ) => {
    res.send("welcome to comment")
}) 

// 댓글 작성  
router.post("/:postId", authMiddleware, async (req, res) => {
    const { nickname }= res.locals.user
    const { comment } = req.body;
    const { postId } = req.params;
    if(!nickname){
        res.status(400).json({errorMessage: "로그인을 해주세요"})
    }else if (!comment){
        res.status(400).json({errorMessage: "댓글 내용을 입력해주세요."})
    }else{
        Comment.create({ nickname, comment, postId });
        res.status(201).json({message : "댓글을 생성하였습니다."});
    }

});

//댓글 조회  
router.get("/:postId", async (req, res) => {
    const { postId } = req.params; 
    const comments = await (await Comment.findAll({where: {postId: postId}})).reverse()
  
    res.json({
        data : comments.map((comment)=>({
            postId : comment.postId,
            commentId : comment.commentId,
            nickname : comment.nickname,
            comment : comment.comment,
            createdAt : comment.createdAt,
            updatedAt : comment.updatedAt
        }))
    })
})

//댓글 수정  

router.put("/:commentid", authMiddleware, async (req, res) => {
    const { nickname }= res.locals.user
    const { comment } = req.body;
    const { commentid } = req.params;
    
    const comments = await Comment.findOne({where: {commentId: commentid}})
    
    if(!nickname){
        res.status(400).json({errorMessage: "로그인을 해주세요"})
    }else if ( nickname !== comments.nickname ){
        res.status(400).json({errorMessage: "본인 댓글만 수정 가능합니다."})
    }else if (!comment){
        res.status(400).json({errorMessage: "댓글 내용을 입력해주세요."})
    }else{    
        await comments.update({ comment: comment }) 
        res.status(201).json({ message : "댓글을 수정하였습니다." })
    }
})




//댓글 삭제

router.delete("/:commentid", authMiddleware, async (req, res) =>{
    const { nickname }= res.locals.user
    const { commentid } = req.params;
    const comments = await Comment.findOne({where: {commentId: commentid}})

    if (!nickname){
        res.status(400).json({errorMessage: "로그인을 해주세요"})
    }else if ( nickname !== comments.nickname ){
        res.status(400).json({errorMessage: "본인 댓글만 삭제 가능합니다."})
    }else{
        await comments.destroy()
        res.json({ message : "댓글을 삭제하였습니다."})    
    }
   
})






module.exports = router;