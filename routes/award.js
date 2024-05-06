const { Router } = require("express");
const { User, Award } = require("../models");

const router = Router();

// 상 조회
router.get("/", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const award = await Award.find({ user_id }).lean();
    res.json(award);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 상 추가
router.post("/", async (req, res, next) => {
  try {
    const { name, agency, periodStart, periodEnd } = req.body;
    const award = await Award.create({
      name,
      agency,
      periodStart,
      periodEnd,
    });
    res.json(award);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
