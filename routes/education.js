const express = require("express");
const { Education } = require("../models");
const router = express.Router();

// 학력 정보 조회 - GET/
router.get("/", async (req, res) => {
	try {
		const educations = await Education.find();
		res.json(educations);
		console.log(educations);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const newEducation = new Education(req.body);
		await newEducation.save();
		res.status(201).json(newEducation);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});
module.exports = router;
