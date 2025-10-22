const studentsData = [
	{
		name: "Иванов Алексей",
		photo: "https://example.com/photo1.jpg",
		group: "ИТ-21",
		debtSubject: "Математический анализ",
		priority: "high",
		status: "pending",
		id: 1,
	},
	{
		name: "Петрова Мария",
		photo: "https://example.com/photo2.jpg",
		group: "ИТ-22",
		debtSubject: "Программирование",
		priority: "high",
		status: "pending",
		id: 2,
	},
	{
		name: "Сидоров Дмитрий",
		photo: "https://example.com/photo3.jpg",
		group: "ИТ-23",
		debtSubject: "Базы данных",
		priority: "low",
		status: "pending",
		id: 3,
	},
	{
		name: "Козлова Анна",
		photo: "https://example.com/photo4.jpg",
		group: "ИТ-21",
		debtSubject: "Веб-технологии",
		priority: "low",
		status: "pending",
		id: 4,
	},
	{
		name: "Николаев Сергей",
		photo: "https://example.com/photo5.jpg",
		group: "ИТ-24",
		debtSubject: "Физика",
		priority: "high",
		status: "pending",
		id: 5,
	},
];

// Константы для текстов
const PRIORITY_TEXT = {
	high: "Высокий",
	low: "Низкий",
};

const STATUS_TEXT = {
	pending: "Ожидает",
	in_progress: "В процессе",
	completed: "Завершено",
};

const PRIORITY_FILTERS = ["high", "medium", "low"];

let currentFilter = "all";

// Получение инициалов из имени
function getInitials(name) {
	return name
		.split(" ")
		.map(n => n[0])
		.join("");
}

// Фильтрация студентов
function getFilteredStudents(filter) {
	if (filter === "all") return studentsData;

	if (PRIORITY_FILTERS.includes(filter)) {
		return studentsData.filter(s => s.priority === filter);
	}

	return studentsData.filter(s => s.status === filter);
}

// Создание HTML карточки студента
function createStudentCard(student) {
	const card = document.createElement("div");
	card.className = `student-card priority-${student.priority}`;
	card.dataset.studentId = student.id;

	const isCompleted = student.status === "completed";
	const buttonText = isCompleted ? "✓ Обработан" : "Отметить как обработанный";

	card.innerHTML = `
		<div class="student-photo">
			${getInitials(student.name)}
			<div class="priority-badge">${PRIORITY_TEXT[student.priority]}</div>
		</div>
		<div class="student-info">
			<div class="student-name">${student.name}</div>
			<div class="student-detail">
				<span class="detail-label">Группа:</span>
				<span>${student.group}</span>
			</div>
			<div class="student-detail">
				<span class="detail-label">Предмет:</span>
				<span>${student.debtSubject}</span>
			</div>
			<span class="status-badge status-${student.status}">
				${STATUS_TEXT[student.status]}
			</span>
			<button class="process-btn" data-action="mark-processed" ${
				isCompleted ? "disabled" : ""
			}>
				${buttonText}
			</button>
		</div>
	`;

	return card;
}

// Отображение студентов
function renderStudents() {
	const grid = document.getElementById("studentsGrid");
	if (!grid) {
		console.error("Элемент studentsGrid не найден");
		return;
	}

	grid.innerHTML = "";

	const filteredStudents = getFilteredStudents(currentFilter);

	if (filteredStudents.length === 0) {
		grid.innerHTML = '<p class="no-results">Студенты не найдены</p>';
		return;
	}

	const fragment = document.createDocumentFragment();
	filteredStudents.forEach(student => {
		fragment.appendChild(createStudentCard(student));
	});

	grid.appendChild(fragment);
}

// Обработчик событий делегирования
function handleGridClick(e) {
	const button = e.target.closest('[data-action="mark-processed"]');
	if (!button || button.disabled) return;

	const card = button.closest("[data-student-id]");
	if (card) {
		const studentId = parseInt(card.dataset.studentId);
		markAsProcessed(studentId);
	}
}

// Отметить студента как обработанного
function markAsProcessed(id) {
	const student = studentsData.find(s => s.id === id);
	if (!student) {
		console.error(`Студент с id ${id} не найден`);
		return;
	}

	if (student.status !== "completed") {
		student.status = "completed";
		renderStudents();
	}
}

// Фильтрация студентов
function filterStudents(filter, buttonElement) {
	currentFilter = filter;

	if (buttonElement) {
		buttonElement.classList.add("active");
	}

	renderStudents();
}

function handleFilterClick(e) {
	const button = e.target.closest(".filter-btn");
	if (!button) return;

	const filter = button.dataset.filter || "all";
	filterStudents(filter, button);
}

// Инициализация
function init() {
	renderStudents();

	// Добавление обработчиков событий через делегирование
	const grid = document.getElementById("studentsGrid");
	if (grid) {
		grid.addEventListener("click", handleGridClick);
	}

	const filterContainer = document.querySelector(".filters");
	if (filterContainer) {
		filterContainer.addEventListener("click", handleFilterClick);
	}
}

window.addEventListener("DOMContentLoaded", init);