const express = require('express');
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const app = express();
const port = 3000;


//db연결
const connect = require("./schemas");
connect();

app.use(express.json());


app.use("/posts", [postsRouter]);
app.use("/comments", [commentsRouter])


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});