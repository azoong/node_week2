const express = require('express');
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const indexRouter = require("./routes/")
const app = express();
require('dotenv').config();

process.env.Port


//db연결
const connect = require("./schemas");
connect();

app.use(express.json());

app.use("/",[indexRouter]);
app.use("/posts", [postsRouter]);
app.use("/comments", [commentsRouter])




app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});