const API_BASE_URL = "http://localhost:8080";

// 학력 가져오기
export const getEducations = async (userId) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/${userId}`);
		return response.data;
	} catch (err) {
		console.error("Error fetching education info:", err);
		throw err;
	}
};

// 학력 업데이트
export const updateEducation = async (userId, educationData) => {
	try {
		const response = await axios.put(
			`${API_BASE_URL}/${educationId}`,
			educationData
		);
		return response.data;
	} catch (err) {
		console.error("Error updating education:", err);
		throw err;
	}
};

// 학력 지우기
export const deleteEducation = async (educationId) => {
	try {
		const response = await axios.delete(`${API_BASE_URL}/${educationId}`);
		return response.data;
	} catch (err) {
		console.error("Error deleting education:", err);
		throw err;
	}
};

// 학력 생성
export const createEducation = async (userId, educationData) => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/api/education`,
			educationData
		);
		return response.data;
	} catch (err) {
		console.error("Error creating education:", err);
		throw err;
	}
};
