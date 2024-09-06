const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function jwtAuthenticationMiddleware(req, res, next) {
  // console.log("헤더체크", req);
  const token = req.headers["authorization"]?.split(" ")[1] ?? null;
  // console.log("인증토큰", token);

  if (!token) {
    res
      .status(401)
      .json({ error: "로그인이 안되어있습니다. 로그인을 해주세요. " });
  }
  // let authCookie = req.cookies["jwt"];
  // console.log("쿠키인증", authCookie);
  // if (!authCookie) {
  //   return res.sendStatus(401);
  // }

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    next();
  });
}

module.exports = jwtAuthenticationMiddleware;
