let gradesArray = [];

// Обновление таблицы
function updateTable() {
	const table = document.getElementById("gradesTable");
	table.innerHTML = "";

	for (let row = 0; row < 5; row++) {
		const tr = document.createElement("tr");
		for (let col = 0; col < 6; col++) {
			const td = document.createElement("td");
			const index = row * 6 + col;

			if (index < gradesArray.length) {
				const grade = gradesArray[index];
				td.textContent = grade;

				// Цветовое кодирование
				if (grade >= 50) {
					td.style.backgroundColor = "#28a745";
				} else {
					td.style.backgroundColor = "#dc3545";
				}
				td.style.color = "white";
			}

			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

// Обновление статистики
function updateStats() {
	const total = gradesArray.length;
	const passed = gradesArray.filter(g => g >= 50).length;
	const failed = gradesArray.filter(g => g < 50).length;

	document.getElementById("totalCount").textContent = total;
	document.getElementById("passedCount").textContent = passed;
	document.getElementById("failedCount").textContent = failed;
}

// Добавление нового результата
function addGrade() {
	const messageDiv = document.getElementById("message");

	// Проверка на заполненность таблицы
	if (gradesArray.length >= 30) {
		messageDiv.innerHTML =
			'<div class="alert alert-error">Все места заняты</div>';
		setTimeout(() => (messageDiv.innerHTML = ""), 3000);
		return;
	}

	// Генерация случайного балла
	const newGrade = Math.floor(Math.random() * 100);
	gradesArray.push(newGrade);

	// Обновление таблицы и статистики
	updateTable();
	updateStats();

	// Показываем сообщение об успехе
	const status = newGrade >= 50 ? "Сдал" : "Не сдал";
	messageDiv.innerHTML = `<div class="alert alert-success">Добавлен результат: ${newGrade} баллов (${status})</div>`;
	setTimeout(() => (messageDiv.innerHTML = ""), 3000);
}

// Инициализация при загрузке страницы
window.addEventListener("DOMContentLoaded", initTable);
