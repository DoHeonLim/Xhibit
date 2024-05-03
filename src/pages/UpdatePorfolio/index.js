// 포폴 섹션 - 학력, 수상이력, 자격증, 플젝
const portfolioSection = [
	{ className: "education", title: "학력" },
	{ className: "awards", title: "수상이력" },
	{ className: "certificate", title: "자격증" },
	{ className: "projects", title: "프로젝트" },
];

// 수정 버튼 누를때만 수정이 가능하게 만들도록 제어하는 함수
const toggleInputs = (form, disable) => {
	const inputs = form.querySelectorAll("input");
	inputs.forEach((input) => (input.disabled = disable));
};

// 클릭된 곳이 인풋 폼의 부모 엘리먼트 안에 포함이 되어 있지 않고
// 수정 버튼을 누른 폼일 시 더 이상 수정 못하게 인풋을 disable함
const handleOutsideClick = (event, form) => {
	if (
		!form.parentElement.contains(event.target) &&
		form.classList.contains("edit")
	) {
		form.classList.toggle("edit");
		toggleInputs(form, true);
	}
};

// 수정, delete 버튼 한세트로 만들어 주는 함수
const createEditBtns = () => {
	const btnContainer = document.createElement("div");
	btnContainer.className = "buttons";

	const editBtn = document.createElement("div");
	editBtn.className = "btn edit";
	const editIcon = document.createElement("span");
	editIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#422613" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" fill="#422613"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" fill="#422613"/>
        </svg>
        `;
	editBtn.appendChild(editIcon);

	// 편집버튼 클릭할때 해당 폼 수정 가능하게 해줌
	editBtn.addEventListener("click", () => {
		const form = btnContainer
			.closest(".portfolio-section")
			.querySelector("form");
		console.log("Enabling inputs...");
		toggleInputs(form, false);
		form.classList.add("edit");

		// 해당 폼 바깥을 클릭할때 수정 종료
		// 문제: 폼을 여러개 만들었을때 다른 폼의 인풋을 클릭하면 클릭 인식이 안됨
		// clicked가 출력되지 않음 -> 이건 편집 버튼 없애는 걸로 수정
		document.addEventListener("click", (event) => {
			// console.log("clicked");
			handleOutsideClick(event, form);
		});
	});

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

	// 삭제 버튼 기능 추가
	deleteBtn.addEventListener("click", () => {
		const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
		modal.show();

		const confirmButton = modal._element.querySelector(".btn-primary");
		confirmButton.addEventListener(
			"click",
			() => {
				// Code to delete the form goes here
				console.log("폼을 삭제합니다");
				const form = deleteBtn.closest(".portfolio-section");
				form.remove();
				modal.hide();
			},
			{ once: true }
		);

		const closeButton = modal._element.querySelectorAll("button")[0];
		closeButton.addEventListener(
			"click",
			() => {
				console.log("삭제 취소");
				modal.hide();
			},
			{ once: true }
		);
	});

	btnContainer.appendChild(editBtn);
	btnContainer.appendChild(deleteBtn);
	return btnContainer;
};

// . 만들어주는 함수
const createDivider = () => {
	const span = document.createElement("span");
	span.innerText = ".";
	return span;
};

// 인풋 만들어주는 함수
const createInput = (name, placeholder, maxLength = 0, isDate = false) => {
	const input = document.createElement("input");
	if (isDate) {
		input.name = name;
		input.maxLength = maxLength;
	} else {
		input.className = name;
	}
	input.placeholder = placeholder;
	input.disabled = true;
	return input;
};

// 날짜 입력 받는 html 만드는 인풋 합수
function createDateInput(section) {
	const dateInput = document.createElement("div");
	dateInput.className = "date";

	const startYear = createInput("startYear", "YYYY", 4, true);
	const startMonth = createInput("startMonth", "MM", 2, true);
	const endYear = createInput("endYear", "YYYY", 4, true);
	const endMonth = createInput("endMonth", "MM", 2, true);

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
		const day = createInput("day", "DD", 2, true);
		dateInput.append(startYear, divider1, startMonth, divider2, day);
	}

	return dateInput;
}

// 학력, 상, 자격증, 플젝 - 각 섹션의 인풋 폼을 만들어 주는 함수
const createSectionForm = (section) => {
	const sectionContainer = document.createElement("div");
	sectionContainer.className = `portfolio-section ${section}`;

	const sectionInput = document.createElement("form");
	sectionInput.className = `item ${section}`;

	const editBtnContainer = createEditBtns();

	let date = createDateInput(section);

	// 순서대로
	// 학력: 학교명, 전공 및 학위, 날짜
	// 수상이력, 자격증은 구조가 같음 - 날짜, 이름 + 기관
	// 프로젝트는 이름,날짜, 링크, 플젝 소개
	if (section === "education") {
		const schoolName = createInput("school-name", "학교명");
		const major = createInput("major", "전공 및 학위 (ex. 경영학과 학사)");
		sectionInput.appendChild(schoolName);
		sectionInput.appendChild(major);
		sectionInput.appendChild(date);
	} else if (section === "projects") {
		const projName = createInput("proj-name", "프로젝트 이름");
		sectionInput.appendChild(projName);
		sectionInput.appendChild(date);

		const link = createInput("proj-link", "프로젝트 링크");
		sectionInput.appendChild(link);

		const details = createInput("project-details", "프로젝트 소개");
		sectionInput.appendChild(details);
	} else {
		sectionInput.appendChild(date);

		const details = document.createElement("div");
		details.className = `details ${section}`;

		const placeholder = section === "awards" ? "수상명" : "자격명";
		const name = createInput("name", placeholder);
		details.appendChild(name);

		const institution = createInput("institution-name", "발급 기관");
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
		const newForm = createSectionForm(sectionData.className);
		section.insertBefore(newForm, section.children[1]);
	});
	header.appendChild(addNewItemBtn);
	section.appendChild(header);

	const sectionForm = createSectionForm(sectionData.className);
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

let textarea = document.querySelector(".my-card-content textarea");
let textContainer = document.querySelector(".my-card-content");
let cardContainer = document.querySelector(".my-card");

textarea.addEventListener("input", function () {
	let textBoxWith = textarea.getBoundingClientRect();
	let textLength = textarea.value.length;
	console.log(textLength);
	console.log(textBoxWith);

	let currHeight = textarea.getBoundingClientRect().height;
	let newHeight = textarea.scrollHeight;
	let heightDiff = newHeight - currHeight;

	console.log("curr", currHeight);
	console.log("new", newHeight);
	console.log("diff", heightDiff);

	textarea.style.height =
		currHeight > newHeight ? `{currHeight}px` : `${newHeight}px`;

	const textContainerRect = textContainer.getBoundingClientRect();
	textContainer.style.height = `${textContainerRect.height + heightDiff}px`;

	const cardContainerRect = cardContainer.getBoundingClientRect();
	cardContainer.style.height = `${cardContainerRect.height + heightDiff}px`;

	console.log("textarea:", textarea.style.height);
	console.log("textContainer:", textContainer.style.height);
	console.log("cardContainer:", cardContainer.style.height);
});

updatePortfolioSections();
