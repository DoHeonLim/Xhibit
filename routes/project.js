const { Router } = require("express");
const { User, Project } = require("../models");

const router = Router();

// 자격증 조회
router.get("/", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const project = await Project.find({ user_id }).lean();
    res.json(certificate);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 자격증 추가
router.post("/", async (req, res, next) => {
  try {
    const {
      link,
      name,
      contentTitle,
      contentDetail,
      techStack,
      periodStart,
      periodEnd,
    } = req.body;
    const project = await Project.create({
      link,
      name,
      contentTitle,
      contentDetail,
      techStack,
      periodStart,
      periodEnd,
    });
    res.json(project);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
