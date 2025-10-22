// Массив для хранения заявок
const applications = [];

// Словарь для отображения причин
const reasonTexts = {
	illness: "Болезнь",
	family: "Семейные обстоятельства",
	work: "Работа",
	other: "Другое",
};

// Инициализация формы
function initForm() {
	const form = document.getElementById("retakeForm");

	// Добавляем слушатели для обновления предпросмотра
	const inputs = [
		"studentName",
		"studentId",
		"studentGroup",
		"subject",
		"teacher",
		"retakeDate",
		"reason",
	];

	inputs.forEach(inputId => {
		const input = document.getElementById(inputId);
		input.addEventListener("input", updatePreview);
		input.addEventListener("change", updatePreview);
	});

	// Обработчик отправки формы
	form.addEventListener("submit", handleFormSubmit);
}

// Обновление предпросмотра
function updatePreview() {
	const studentName = document.getElementById("studentName").value;
	const studentId = document.getElementById("studentId").value;
	const studentGroup = document.getElementById("studentGroup").value;
	const subject = document.getElementById("subject").value;
	const teacher = document.getElementById("teacher").value;
	const retakeDate = document.getElementById("retakeDate").value;
	const reason = document.getElementById("reason").value;

	document.getElementById("previewName").textContent = studentName || "-";
	document.getElementById("previewId").textContent = studentId || "-";
	document.getElementById("previewGroup").textContent = studentGroup || "-";
	document.getElementById("previewSubject").textContent = subject || "-";
	document.getElementById("previewTeacher").textContent = teacher || "-";
	document.getElementById("previewDate").textContent = retakeDate
		? formatDate(retakeDate)
		: "-";
	document.getElementById("previewReason").textContent = reason
		? reasonTexts[reason]
		: "-";
}

// Форматирование даты
function formatDate(dateString) {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();
	return `${day}.${month}.${year}`;
}

// Валидация формы
function validateForm() {
	let isValid = true;

	const fields = [
		{
			id: "studentName",
			error: "nameError",
			message: "Введите ФИО студента",
			pattern: /^[А-Яа-яЁё\s-]+$/,
			patternMessage: "ФИО должно содержать только русские буквы",
		},
		{
			id: "studentId",
			error: "idError",
			message: "Введите номер студенческого билета",
			pattern: /^\d{4,8}$/,
			patternMessage: "Номер должен содержать от 4 до 8 цифр",
		},
		{
			id: "studentGroup",
			error: "groupError",
			message: "Введите группу",
			pattern: /^[А-Яа-я]{2,4}-\d{2}$/,
			patternMessage: "Формат группы: ИТ-21",
		},
		{
			id: "subject",
			error: "subjectError",
			message: "Введите предмет пересдачи",
		},
		{
			id: "teacher",
			error: "teacherError",
			message: "Введите ФИО преподавателя",
		},
		{
			id: "retakeDate",
			error: "dateError",
			message: "Выберите дату пересдачи",
		},
		{
			id: "reason",
			error: "reasonError",
			message: "Выберите причину пересдачи",
		},
	];

	// Очищаем предыдущие ошибки
	fields.forEach(field => {
		const input = document.getElementById(field.id);
		const errorDiv = document.getElementById(field.error);
		input.classList.remove("error");
		errorDiv.textContent = "";
	});

	// Проверяем каждое поле
	fields.forEach(field => {
		const input = document.getElementById(field.id);
		const errorDiv = document.getElementById(field.error);
		const value = input.value.trim();

		if (!value) {
			input.classList.add("error");
			errorDiv.textContent = field.message;
			isValid = false;
		} else if (field.pattern && !field.pattern.test(value)) {
			input.classList.add("error");
			errorDiv.textContent = field.patternMessage;
			isValid = false;
		}
	});

	// Проверка на будущую дату
	const retakeDateInput = document.getElementById("retakeDate");
	const retakeDate = new Date(retakeDateInput.value);
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	if (retakeDate < today) {
		retakeDateInput.classList.add("error");
		document.getElementById("dateError").textContent =
			"Дата должна быть в будущем";
		isValid = false;
	}

	// Проверка на уникальность заявки
	if (isValid) {
		const studentName = document.getElementById("studentName").value.trim();
		const subject = document.getElementById("subject").value.trim();

		const duplicate = applications.find(
			app =>
				app.studentName.toLowerCase() === studentName.toLowerCase() &&
				app.subject.toLowerCase() === subject.toLowerCase()
		);

		if (duplicate) {
			showMessage(
				"error",
				"Заявка от этого студента на данный предмет уже существует!"
			);
			isValid = false;
		}
	}

	return isValid;
}

// Обработка отправки формы
function handleFormSubmit(e) {
	e.preventDefault();

	if (!validateForm()) {
		return;
	}

	// Создаем объект заявки
	const application = {
		studentName: document.getElementById("studentName").value.trim(),
		studentId: document.getElementById("studentId").value.trim(),
		studentGroup: document.getElementById("studentGroup").value.trim(),
		subject: document.getElementById("subject").value.trim(),
		teacher: document.getElementById("teacher").value.trim(),
		retakeDate: document.getElementById("retakeDate").value,
		reason: document.getElementById("reason").value,
	};

	// Добавляем в массив
	applications.push(application);

	// Добавляем в таблицу
	addApplicationToTable(application);

	// Показываем сообщение об успехе
	showMessage("success", "Заявка успешно подана!");

	// Очищаем форму
	document.getElementById("retakeForm").reset();

	// Очищаем предпросмотр
	updatePreview();

	// Убираем ошибки
	document
		.querySelectorAll(".error")
		.forEach(el => el.classList.remove("error"));
	document
		.querySelectorAll(".error-message")
		.forEach(el => (el.textContent = ""));
}

// Добавление заявки в таблицу
function addApplicationToTable(app) {
	const tbody = document.getElementById("applicationsBody");

	// Удаляем пустое состояние если есть
	if (tbody.querySelector(".empty-state")) {
		tbody.innerHTML = "";
	}

	const tr = document.createElement("tr");
	tr.style.animation = "slideDown 0.3s";

	const reasonClass = `reason-${app.reason}`;

	tr.innerHTML = `
                <td>${app.studentName}</td>
                <td>${app.studentId}</td>
                <td>${app.studentGroup}</td>
                <td>${app.subject}</td>
                <td>${app.teacher}</td>
                <td>${formatDate(app.retakeDate)}</td>
                <td><span class="reason-badge ${reasonClass}">${
		reasonTexts[app.reason]
	}</span></td>
            `;

	tbody.appendChild(tr);
}

// Показ сообщения
function showMessage(type, text) {
	const messageDiv = document.getElementById("formMessage");
	messageDiv.innerHTML = `<div class="alert alert-${type}">${text}</div>`;

	// Прокрутка к сообщению
	messageDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });

	// Автоматическое скрытие через 5 секунд
	setTimeout(() => {
		messageDiv.innerHTML = "";
	}, 5000);
}

window.addEventListener("DOMContentLoaded", initForm);
