// 세션에서 토큰 가져온다.
const token = sessionStorage.getItem("token");

// 베이스 url 설정
export const fetchBaseUrl = async () => {
  try {
    // '/config' 엔드포인트에서 환경 변수를 가져옵니다.
    const response = await axios.get("/config");
    // 응답 데이터에서 baseUrl을 추출합니다.
    const baseUrl = response.data.baseUrl;

    // baseUrl을 사용하는 추가적인 코드
    return baseUrl;
  } catch (error) {
    console.error("Error fetching base URL:", error);
    // 에러 발생 시 기본값을 반환하거나 다른 적절한 처리를 할 수 있습니다.
    return null;
  }
};

const BASE_URL = await fetchBaseUrl();

const baseInstance = axios.create({
  baseURL: BASE_URL, // 기본 URL 설정
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// 유저 정보 한꺼번에 가져오기
export const getUserInfo = async (userId) => {
  try {
    const response = await baseInstance.get(`/api/${userId}`);
    // 유저 상세 정보 전부 선언
    const { user, education, award, certificate, project } = response.data;
    return { user, education, award, certificate, project };
  } catch (err) {
    console.error(`${section} 가져오는데 실패`, err);
    throw err;
  }
};

// 폼 정보 가져오기
export const getFormInfo = async (userId, section) => {
  try {
    const response = await baseInstance.get(
      `${BASE_URL}/api/${section}/${userId}`
    );
    return response.data;
  } catch (err) {
    console.error(`${section} 가져오는데 실패`, err);
    throw err;
  }
};

// 새로운 폼 생성
export const createNewForm = async (userId, section, newData) => {
  try {
    const response = await baseInstance.post(
      `${BASE_URL}/api/${section}/${userId}`,
      newData
    );
    return response.data;
  } catch (error) {
    console.error(`${section} 생성 실패:`, error);
    throw error;
  }
};

// 폼 업데이트
export const updateForm = async (section, formId, formData) => {
  try {
    const response = await baseInstance.patch(
      `${BASE_URL}/api/${section}/${formId}`,
      formData
    );
    return response.data;
  } catch (err) {
    console.error("업데이트 실패:", err);
    throw err;
  }
};

// 폼 지우기
export const deleteForm = async (section, formId) => {
  try {
    const response = await baseInstance.post(
      `${BASE_URL}/api/${section}/softdelete/${formId}`
    );
    return response.data;
  } catch (err) {
    console.error(`${section} 삭제 실패:`, err);
    throw err;
  }
};

// 프로필 업데이트
export const updateProfile = async (userId, newData) => {
  try {
    const response = await baseInstance.patch(
      `${BASE_URL}/api/changeIntroduce/${userId}`,
      { newIntroduce: newData }
    );
    return response.data;
  } catch (error) {
    console.error(`profile text 업데이트 실패:`, error);
    throw error;
  }
};

// 비밀번호 업데이트
export const verifyAndUpdatePassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  try {
    const response = await baseInstance.patch(
      `${BASE_URL}/api/changepassword/${userId}`,
      { currentPassword, newPassword }
    );
    return response.data;
  } catch (error) {
    console.error(`비밀번호 업데이트 실패:`, error);
    throw error;
  }
};

// 유저 소프트 삭제
export const verifyAndDeleteUser = async (userId, currentPassword) => {
  try {
    const response = await baseInstance.post(
      `${BASE_URL}/api/softdelete/${userId}`,
      { currentPassword }
    );
    return response.data;
  } catch (error) {
    console.error(`회원 삭제 실패:`, error);
    throw error;
  }
};
