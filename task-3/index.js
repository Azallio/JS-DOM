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
		priority: "medium",
		status: "in_progress",
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
		priority: "high",
		status: "pending",
		id: 4,
	},
	{
		name: "Николаев Сергей",
		photo: "https://example.com/photo5.jpg",
		group: "ИТ-24",
		debtSubject: "Физика",
		priority: "medium",
		status: "pending",
		id: 5,
	},
];

let currentFilter = "all";

// Отображение студентов
function renderStudents() {
	const grid = document.getElementById("studentsGrid");
	grid.innerHTML = "";

	// Фильтрация студентов
	let filteredStudents = studentsData;
	if (currentFilter !== "all") {
		if (["high", "medium", "low"].includes(currentFilter)) {
			filteredStudents = studentsData.filter(s => s.priority === currentFilter);
		} else if (currentFilter === "pending") {
			filteredStudents = studentsData.filter(s => s.status === "pending");
		}
	}

	// Создание карточек
	filteredStudents.forEach(student => {
		const card = document.createElement("div");
		card.className = `student-card priority-${student.priority}`;

		// Получаем инициалы
		const initials = student.name
			.split(" ")
			.map(n => n[0])
			.join("");

		// Текст приоритета
		const priorityText = {
			high: "Высокий",
			medium: "Средний",
			low: "Низкий",
		};

		// Текст статуса
		const statusText = {
			pending: "Ожидает",
			in_progress: "В процессе",
			completed: "Завершено",
		};

		card.innerHTML = `
                    <div class="student-photo">
                        ${initials}
                        <div class="priority-badge">${
													priorityText[student.priority]
												}</div>
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
                            ${statusText[student.status]}
                        </span>
                        <button class="process-btn" onclick="markAsProcessed(${
													student.id
												})" 
                                ${
																	student.status === "completed"
																		? "disabled"
																		: ""
																}>
                            ${
															student.status === "completed"
																? "✓ Обработан"
																: "Отметить как обработанный"
														}
                        </button>
                    </div>
                `;

		grid.appendChild(card);
	});
}

// Отметить студента как обработанного
function markAsProcessed(id) {
	const student = studentsData.find(s => s.id === id);
	if (student && student.status !== "completed") {
		student.status = "completed";
		renderStudents();
	}
}

// Фильтрация студентов
function filterStudents(filter) {
	currentFilter = filter;

	// Обновление активной кнопки
	const buttons = document.querySelectorAll(".filter-btn");
	buttons.forEach(btn => btn.classList.remove("active"));
	event.target.classList.add("active");

	renderStudents();
}

// Инициализация при загрузке
window.addEventListener("DOMContentLoaded", renderStudents);
