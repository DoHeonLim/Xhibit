// 환경 변수 로드
require("dotenv").config();

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
const eduRouter = require("./routes/education");
const awardRouter = require("./routes/award");
const certificateRouter = require("./routes/certificate");
const projectRouter = require("./routes/project");

const app = express();

// 환경 변수 사용
const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

// Mongoose 설정
mongoose.set("strictQuery", false);

let corsOptions = {
  origin: true, // 출처 허용 옵션
  credentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  exposedHeaders: ["set-cookie", "Authorization"], // 이 기능은 브라우저에서 노출시킬 헤더 목록을 만드는 것인데, set-cookie를 추가해주지 않으면 헤더의 set-cookie 부분이 노출 X
};

app.use(cors(corsOptions)); // cors 적용

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));
app.use(viewsRouter);

app.use(passport.initialize());
passportConfig();

// MongoDB 연결을 관리하는 함수
const connectToDatabase = async () => {
  try {
    const client = await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
    return client;
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
    throw err;
  }
};

// 서버 시작 시 MongoDB 연결
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start the server due to DB connection issue", err);
    process.exit(1);
  });

// db 저장
app.post("/saveData", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const collection = db.collection("data");
    const jsonData = req.body;
    await collection.insertOne(jsonData);
    res.status(200).send("Data saved successfully");
  } catch (err) {
    console.error("Error occurred while processing request:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/api", userRouter);
app.use("/api/education", eduRouter);
app.use("/api/award", awardRouter);
app.use("/api/certificate", certificateRouter);
app.use("/api/project", projectRouter);

module.exports = app;
