const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const { DB } = require("./config");
const userRouter = require("./routes/UserRouter");
const postRouter = require("./routes/PostRouter");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to soical-media API 😀");
});

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("CONNECT TO MONGODB 😀"))
  .catch((err) => console.log(err));

app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at post:${PORT}`));
