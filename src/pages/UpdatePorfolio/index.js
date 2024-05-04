// 포폴 섹션 - 학력, 수상이력, 자격증, 플젝
const portfolioSection = [
	{ className: "education", title: "학력" },
	{ className: "awards", title: "수상이력" },
	{ className: "certificate", title: "자격증" },
	{ className: "projects", title: "프로젝트" },
];

// delete 버튼 만들어 주는 함수
const createEditBtns = () => {
	const btnContainer = document.createElement("div");
	btnContainer.className = "buttons";

	const deleteBtn = document.createElement("div");
	deleteBtn.className = "btn";
	const trashIcon = document.createElement("span");
	trashIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="2vw" height="2vw" fill="#422613" fill-rule="evenodd" class="bi bi-trash" viewBox="0 0 16 16">
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

	btnContainer.appendChild(deleteBtn);
	return btnContainer;
};

// 날짜 "."로 나눌 수 있게 . 만들어주는 함수
const createDivider = () => {
	const span = document.createElement("span");
	span.innerText = ".";
	return span;
};

// 인풋 타입 만들어주는 함수
const createInput = (name, placeholder, maxLength = 80, isDate = false) => {
	const input = document.createElement("input");
	if (isDate) {
		input.name = name;

		// 날짜는 숫자만 받아야함
		input.type = "number";

		// e 는 숫자이기 때문에 타입을 숫자로 설정해도 e 넣을 수 있음
		// 따로 prevent default로 막아야함
		// +, -도 따로 막아줘야 함
		// input을 넘버로 하면 property maxLength 작동이 안되기 때문에 따로 체크 필요
		// max length가 되었을때 delete, arrow left & right 등은 허용
		input.addEventListener("keydown", (event) => {
			const currValue = event.target.value;
			const invalidKeys = ["e", "E", "+", "-"];
			const allowedKeys = [
				"Backspace",
				"Delete",
				"ArrowLeft",
				"ArrowRight",
				"ArrowUp",
				"ArrowDown",
			];
			if (
				invalidKeys.includes(event.key) ||
				(currValue.length >= maxLength && !allowedKeys.includes(event.code))
			) {
				event.preventDefault();
			}
		});
	} else {
		input.className = name;
	}
	input.placeholder = placeholder;
	if (name === "proj-link") {
		input.type = "url";
		input.maxLength = 30;
		input.required = true;
	}
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
		dateInput.append(startYear, divider1, startMonth);
	}

	return dateInput;
}

// 사용자가 프로젝트 섹션에 스킬 추가 할때 칩 만들어서 업데이트 해주는 함수
const createSkills = (chipset) => {
	const skills = createInput("skills", "스킬 태그를 추가해주세요");
	// chipset.appendChild(skills);

	skills.addEventListener("keypress", async function (event) {
		if (event.key === "Enter") {
			const skill = document.createElement("md-input-chip");
			skill.className = "skill";
			skill.label = event.target.value;

			chipset.appendChild(skill);
			callChip();
			event.target.value = "";
		}
	});

	// chipset.removeChild(skill);

	return skills;
};

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

		const link = createInput("proj-link", "https://example.com");
		sectionInput.appendChild(link);

		const details = document.createElement("textarea");
		details.placeholder = "프로젝트 소개";
		// 사용자가 쓰는 만큼 textarea가 늘어나거나 줄어들게 하는 함수
		details.addEventListener("input", function () {
			details.style.height = "auto";
			details.style.height = `${details.scrollHeight}px`;
		});

		// 스킬 부분에 사용자가 스킬 입력하면 칩 만들어줌
		// ex. react.js 치고 엔터 -> 칩 생성
		const chipset = document.createElement("md-chip-set");
		chipset.className = "chipset";
		const skills = createSkills(chipset);

		sectionInput.appendChild(details);
		sectionInput.appendChild(skills);
		sectionInput.appendChild(chipset);
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

// 엘리먼트 기다려주는 함수
// 쓰려고 했는데 코드를 수정하면서 필요없게 됨
// 혹시 몰라 일단 남겨둠
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

//프로필 자기소개 인풋
// 원래는 사용자가 쓰는 대로 text area랑 container 맞춰서 늘리려고 했는데
// 줄어드는것도 따로 설정해줘야 해서 일단 그냥 word limit 설정함
// 사용자가 입력할때마다 얼마만큼 남았는지 보여주는 함수
// 영어, 한국어, 글자마다 부피가 달라서 여러번 테스트 해보다가 일단 80으로 설정함
let textarea = document.querySelector(".my-card-content textarea");

textarea.addEventListener("input", function () {
	const wordLimit = document.querySelector(".word-limit");

	const currLength = textarea.value.length;
	wordLimit.innerText = `${currLength}/80`;
});

updatePortfolioSections();

// 스킬 부분 칩 설정
async function callChip() {
	const chip = await waitForElement(".chipset");
	const currIdx = chip.children.length - 1;
	const shadowRoot =
		chip.children[currIdx].shadowRoot.querySelector(".container");
	shadowRoot.removeChild(shadowRoot.querySelector(".outline"));

	const button = chip.children[currIdx].shadowRoot
		.querySelector(".container")
		.querySelectorAll("button");

	const label = button[0].querySelector(".label");
	label.style.color = "#4C4C4C";
	label.style.fontFamily = "jalnan";
	label.style.fontSize = "1.2vw";

	button.forEach((btn, i) => {
		const touch = btn.querySelector(".touch");
		touch.remove();

		if (btn.className.includes("trailing")) {
			const closeBtn = btn.querySelector(".trailing.icon");
			closeBtn.style.height = "2vw";
			closeBtn.style.width = "2vw";
		}
	});
}
