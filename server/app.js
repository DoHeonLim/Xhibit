const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const passport = require("passport");
const passportConfig = require("./passport");
const cors = require("cors"); // cors 설정을 편안하게 하는 패키지

const viewsRouter = require("./routes/views");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const eduRouter = require("./routes/education");
const awardRouter = require("./routes/award");
const certificateRouter = require("./routes/certificate");
const projectRouter = require("./routes/project");

const app = express();
const url =
  "mongodb+srv://myname:jM7DA5XYx1tyqNer@cluster0.3jc98iw.mongodb.net/";
const dbName = "portfolio_user";

let corsOptions = {
  origin: true, // 출처 허용 옵션
  credentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};
app.use(cors(corsOptions)); // cors 적용

mongoose.connect(
  "mongodb+srv://myname:jM7DA5XYx1tyqNer@cluster0.3jc98iw.mongodb.net/"
);
mongoose.set("strictQuery", false);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static("public"));
app.use(viewsRouter);
// app.use(express.static(path.join(__dirname, "public")));
// const resourcePath = path.join(__dirname, "public");
// console.log(resourcePath);

app.use(passport.initialize());
passportConfig();

// db 저장
app.post("/saveData", async (req, res) => {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    const collection = db.collection("data");
    const jsonData = req.body;
    await collection.insertOne(jsonData);
    client.close();
    res.status(200).send("Data saved successfully");
  } catch (err) {
    console.error("Error occurred while processing request:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/api", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/education", eduRouter);
app.use("/api/award", awardRouter);
app.use("/api/certificate", certificateRouter);
app.use("/api/project", projectRouter);

app.listen(3000);

module.exports = app;