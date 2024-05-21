const jwt = require("jsonwebtoken");

function jwtAuthenticationMiddleware(req, res, next) {
  // console.log("헤더체크", req);
  const token = req.headers["authorization"]?.split(" ")[1] ?? null;
  const requestUserId = req.url.split("/")[2] ?? null; // 요청 받은 유저 id 랑 토큰 페이로드 유저 id 비교 한 후 다르다면 인가되지 않는다.
  console.log("유저 아이디", requestUserId);
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
  const decoded = jwt.decode(token); // jwt 디코드 메서드 사용 해서 페이로드 값을 들고 온다.
  console.log("페이로드 값", decoded._id);

  if (requestUserId === decoded._id) {
    // 만약 api에서 받은 유저 아이디랑 세션에 jwt 토큰 페이로드 값 비교 한다.
    jwt.verify(token, "elice", (err, user) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    // 아닐경우 403에러 띄우고 미들웨어 넘어간다.
    res.status(403);
    next();
  }
}

module.exports = jwtAuthenticationMiddleware;
