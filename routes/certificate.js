const { Router } = require("express");
const { User, Certificate } = require("../models");

const router = Router();

// 자격증 조회
router.get("/", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const certificate = await Certificate.find({ user_id }).lean();
    res.json(certificate);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 자격증 추가
router.post("/", async (req, res, next) => {
  try {
    const { name, agency, licenseDate } = req.body;
    const certificate = await Certificate.create({
      name,
      agency,
      licenseDate,
    });
    res.json(certificate);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
