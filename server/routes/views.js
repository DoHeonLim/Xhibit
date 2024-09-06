const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/config", (req, res) => {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  res.json({ baseUrl });
});

router.use("/", serveStatic("signIn"));
router.use("/signup", serveStatic("signUp"));
router.use("/signin", serveStatic("signIn"));
router.use("/main", serveStatic("main"));
router.use("/otherspage", serveStatic("othersPage"));
router.use("/mypage", serveStatic("myPage"));
router.use("/welcomePage", serveStatic("welcomePage"));
router.use("/errorPage", serveStatic("errorPage"));

function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../../client/views`);
  const option = { index: `${resource}.html` };

  return express.static(resourcePath, option);
}

module.exports = router;
