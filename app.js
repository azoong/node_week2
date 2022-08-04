const express = require('express');
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const userRouter = require("./routes/users")
const loginRouter = require("./routes/login")

const indexRouter = require("./routes/")
require("dotenv").config();


const app = express();
// require("dotenv").config();

const port = process.env.Port



app.use(express.json());

app.use("/",[indexRouter]);
app.use("/posts", [postsRouter]);//게시글
app.use("/comments", [commentsRouter])//댓글
app.use("/signup", [userRouter]) //회원가입
app.use("/login", [loginRouter]) //로그인



app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});