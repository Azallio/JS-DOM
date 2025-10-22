const applications = [];
const REASON_TEXTS = {
	illness: "Болезнь",
	family: "Семья",
	work: "Работа",
	other: "Другое",
};

const DOM = {
	form: document.getElementById("retakeForm"),
	applicationsBody: document.getElementById("applicationsBody"),
	formMessage: document.getElementById("formMessage"),
	preview: {
		name: document.getElementById("previewName"),
		id: document.getElementById("previewId"),
		group: document.getElementById("previewGroup"),
		subject: document.getElementById("previewSubject"),
		teacher: document.getElementById("previewTeacher"),
		date: document.getElementById("previewDate"),
		reason: document.getElementById("previewReason"),
	},
};

function getFormData() {
	const f = DOM.form;
	return {
		studentName: f.studentName.value.trim(),
		studentId: f.studentId.value.trim(),
		studentGroup: f.studentGroup.value.trim(),
		subject: f.subject.value.trim(),
		teacher: f.teacher.value.trim(),
		retakeDate: f.retakeDate.value,
		reason: f.reason.value,
	};
}

function formatDate(d) {
	if (!d) return "-";
	return new Date(d).toLocaleDateString("ru-RU");
}

function updatePreview() {
	const d = getFormData();
	DOM.preview.name.textContent = d.studentName || "-";
	DOM.preview.id.textContent = d.studentId || "-";
	DOM.preview.group.textContent = d.studentGroup || "-";
	DOM.preview.subject.textContent = d.subject || "-";
	DOM.preview.teacher.textContent = d.teacher || "-";
	DOM.preview.date.textContent = formatDate(d.retakeDate);
	DOM.preview.reason.textContent = d.reason ? REASON_TEXTS[d.reason] : "-";
}

function showMessage(type, text) {
	DOM.formMessage.innerHTML = `<div class="alert alert-${type}">${text}</div>`;
	setTimeout(() => (DOM.formMessage.innerHTML = ""), 5000);
}

function addApplicationToTable(app) {
	const row = document.createElement("tr");
	row.innerHTML = `
		<td>${app.studentName}</td>
		<td>${app.studentId}</td>
		<td>${app.studentGroup}</td>
		<td>${app.subject}</td>
		<td>${app.teacher}</td>
		<td>${formatDate(app.retakeDate)}</td>
		<td>${REASON_TEXTS[app.reason] || "-"}</td>
	`;
	DOM.applicationsBody.appendChild(row);
}

function handleFormSubmit(e) {
	e.preventDefault();
	const d = getFormData();

	// простая проверка обязательных полей
	if (
		!d.studentName ||
		!d.studentId ||
		!d.studentGroup ||
		!d.subject ||
		!d.teacher ||
		!d.retakeDate ||
		!d.reason
	) {
		showMessage("error", "Заполните все поля!");
		return;
	}

	// проверка дубликатов
	if (
		applications.some(
			a =>
				a.studentName.toLowerCase() === d.studentName.toLowerCase() &&
				a.subject.toLowerCase() === d.subject.toLowerCase()
		)
	) {
		showMessage("error", "Заявка уже существует!");
		return;
	}

	applications.push(d);
	addApplicationToTable(d);
	showMessage("success", "Заявка подана!");
	DOM.form.reset();
	updatePreview();
}

if (DOM.form) {
	DOM.form.addEventListener("submit", handleFormSubmit);
	DOM.form.addEventListener("input", updatePreview);
	DOM.form.addEventListener("change", updatePreview);
	updatePreview();
}
в