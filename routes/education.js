const express = require("express");
const { User, Education } = require("../models");
const router = express.Router();

// 학력 정보 조회 - GET/
router.get("/", async (req, res, next) => {
	try {
		const { user_id } = req.params;
		const educations = await Education.find({ user_id });
		res.json(educations);
	} catch (err) {
		res.status(500).json({ error: err.message });
		next(err);
	}
});

// 학력

// 학력 추가
router.post("/", async (req, res, next) => {
	try {
		const { school, major, periodStart, periodEnd } = req.body;
		const newEducation = new Education({
			school,
			major,
			periodStart,
			periodEnd,
		});
		await newEducation.save();
		console.log(newEducation);
		res.status(201).json(newEducation);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});
module.exports = router;
