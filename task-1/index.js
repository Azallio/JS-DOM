const grades = [];
for (let i = 0; i < 30; i++) {
	grades.push(Math.floor(Math.random() * 100));
}

// Получаем таблицу
const table = document.getElementById("gradesTable");
table.innerHTML = "";

// Создаем 5 строк
for (let row = 0; row < 5; row++) {
	const tr = document.createElement("tr");

	// В каждой строке 6 ячеек
	for (let col = 0; col < 6; col++) {
		const td = document.createElement("td");
		const grade = grades[row * 6 + col];
		td.textContent = grade;

		// Цветовое кодирование
		if (grade >= 50) {
			td.style.backgroundColor = "#28a745"; // Зеленый
		} else {
			td.style.backgroundColor = "#dc3545"; // Красный
		}
		td.style.color = "white";

		tr.appendChild(td);
	}
	table.appendChild(tr);
}
