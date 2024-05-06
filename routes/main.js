const { Router } = require("express");
const { User } = require("../models");

const router = Router();

// 메인 페이지
router.get("/", async (req, res, next) => {
  try {
    const user = await User.find({}, { email: 1, name: 1, introduce: 1 });
    res.json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 유저 상세 포트폴리오
router.get("/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log(user_id);
    const user = await User.findById(user_id);
    res.json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
