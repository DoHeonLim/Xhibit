const portfolio = document.querySelector(".resume-content");

// 포폴 섹션 - 학력, 수상이력, 자격증, 플젝
const portfolioSection = [
	{ className: "education", title: "학력" },
	{ className: "awards", title: "수상이력" },
	{ className: "certificate", title: "자격증" },
	{ className: "projects", title: "프로젝트" },
];

// 수정, delete 버튼 한세트로 만들어 주는 함수
const initEditBtns = () => {
	const btnContainer = document.createElement("div");
	btnContainer.className = "buttons";

	const editBtn = document.createElement("div");
	editBtn.className = "btn";
	const editIcon = document.createElement("span");
	editIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#422613" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" fill="#422613"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" fill="#422613"/>
        </svg>
        `;
	editBtn.appendChild(editIcon);

	const deleteBtn = document.createElement("div");
	deleteBtn.className = "btn";
	const trashIcon = document.createElement("span");
	trashIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#422613" fill-rule="evenodd" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" fill="#422613"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" fill="#422613"/>
        </svg>
	`;
	deleteBtn.appendChild(trashIcon);

	btnContainer.appendChild(editBtn);
	btnContainer.appendChild(deleteBtn);
	return btnContainer;
};

const createDivider = () => {
	const span = document.createElement("span");
	span.innerText = ".";
	return span;
};

// 각 연월일을 입력할 인풋 만들어주는 함수
const createInput = (name, maxLength, placeholder) => {
	const input = document.createElement("input");
	input.name = name;
	input.maxLength = maxLength;
	input.placeholder = placeholder;
	return input;
};

// 날짜 입력 받는 html 만드는 인풋 합수
function createDateInput(section) {
	const dateInput = document.createElement("div");
	dateInput.className = "date";

	const startYear = createInput("startYear", 4, "YYYY");
	const startMonth = createInput("startMonth", 2, "MM");
	const endYear = createInput("endYear", 4, "YYYY");
	const endMonth = createInput("endMonth", 2, "MM");

	const divider1 = createDivider();
	const divider2 = createDivider();

	const dash = document.createElement("span");
	dash.innerText = "~";

	if (section === "education" || section === "projects") {
		dateInput.append(
			startYear,
			divider1,
			startMonth,
			dash,
			endYear,
			divider2,
			endMonth
		);
	} else {
		const day = document.createElement("input");
		day.name = "startMonth";
		day.maxLength = 2;
		day.placeholder = "DD";

		dateInput.append(startYear, divider1, startMonth, divider2, day);
	}

	return dateInput;
}

// 학력, 상, 자격증, 플젝 - 각 섹션의 인풋 폼을 만들어 주는 함수
const initSectionForm = (section) => {
	const sectionContainer = document.createElement("div");
	sectionContainer.className = `portfolio-section ${section}`;

	const sectionInput = document.createElement("form");
	sectionInput.className = `item ${section}`;

	const editBtnContainer = initEditBtns();

	let date = createDateInput(section);

	// 순서대로
	// 학력: 학교명, 전공 및 학위, 날짜
	// 수상이력, 자격증은 구조가 같음 - 날짜, 이름 + 기관
	// 프로젝트는 이름,날짜, 링크, 플젝 소개
	if (section === "education" || section === "projects") {
		const name = document.createElement("input");
		name.className = section === "education" ? "school-name" : "proj-name";
		name.placeholder = section === "education" ? "학교명" : "프로젝트 이름";
		sectionInput.appendChild(name);

		if (section === "education") {
			const major = document.createElement("input");
			major.className = "major";
			major.placeholder = "전공 및 학위 (ex. 경영학과 학사)";
			sectionInput.appendChild(major);
			sectionInput.appendChild(date);
		}
		if (section === "projects") {
			sectionInput.appendChild(date);

			const link = document.createElement("input");
			link.placeholder = "프로젝트 링크";
			sectionInput.appendChild(link);

			const details = document.createElement("input");
			details.placeholder = "프로젝트 소개";
			sectionInput.appendChild(details);
		}
	} else {
		sectionInput.appendChild(date);

		const details = document.createElement("div");
		details.className = `details ${section}`;

		const name = document.createElement("input");
		name.placeholder = section === "awards" ? "수상명" : "자격명";
		details.appendChild(name);

		const institution = document.createElement("input");
		institution.placeholder = "발급 기관";
		details.appendChild(institution);

		sectionInput.appendChild(details);
	}

	sectionContainer.appendChild(sectionInput);
	sectionContainer.appendChild(editBtnContainer);

	return sectionContainer;
};

const waitForElement = (selector) => {
	return new Promise((resolve) => {
		const element = document.querySelector(selector);
		if (element) {
			resolve(element);
		} else {
			const observer = new MutationObserver((mutations) => {
				const element = document.querySelector(selector);
				if (element) {
					resolve(element);
					observer.disconnect();
				}
			});
			observer.observe(document.body, { childList: true, subtree: true });
		}
	});
};

// 각 섹션 토대 만드는 함수 - 박스 + 제목
const createSection = (sectionData) => {
	const section = document.createElement("div");
	section.className = "section";
	section.classList.add(sectionData.className);

	const header = document.createElement("div");
	header.className = "title-bar";

	const title = document.createElement("h3");
	title.innerText = sectionData.title;
	header.appendChild(title);

	const addNewItemBtn = document.createElement("button");
	addNewItemBtn.innerText = "+ 추가";
	addNewItemBtn.addEventListener("click", async () => {
		const newForm = initSectionForm(sectionData.className);
		section.insertBefore(newForm, section.children[1]);
	});
	header.appendChild(addNewItemBtn);
	section.appendChild(header);

	const sectionForm = initSectionForm(sectionData.className);
	section.appendChild(sectionForm);

	return section;
};

// 포트폴리오 각 섹션 토대 업데이트 하는 함수
const updatePortfolioSections = () => {
	const portfolio = document.querySelector(".resume-content");

	portfolioSection.forEach((section) => {
		const newSection = createSection(section);
		portfolio.appendChild(newSection);
	});
};

updatePortfolioSections();
