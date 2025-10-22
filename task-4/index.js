// Данные меню с расписанием пересдач
	const menuData = {
	"Факультет информационных технологий": {
		"ИТ-21": {
			"Иванов Алексей": "Математический анализ - 15.11.2025, 10:00, ауд. 301",
			"Козлова Анна": "Веб-технологии - 18.11.2025, 14:00, ауд. 205",
		},
		"ИТ-22": {
			"Петрова Мария": "Программирование - 20.11.2025, 09:00, ауд. 412",
			"Смирнов Игорь":
				"Алгоритмы и структуры данных - 22.11.2025, 11:00, ауд. 315",
		},
	},
	"Факультет прикладной математики": {
		"ИТ-23": {
			"Сидоров Дмитрий": "Базы данных - 22.11.2025, 13:00, ауд. 108",
			"Васильева Ольга": "Дискретная математика - 24.11.2025, 10:00, ауд. 210",
		},
		"ИТ-24": {
			"Николаев Сергей": "Физика - 25.11.2025, 15:00, ауд. 501",
			"Кузнецова Елена": "Математический анализ - 26.11.2025, 09:00, ауд. 302",
		},
	},
	"Факультет экономики и управления": {
		"ЭУ-31": {
			"Морозов Андрей": "Экономическая теория - 27.11.2025, 12:00, ауд. 115",
			"Новикова Дарья": "Статистика - 28.11.2025, 14:00, ауд. 220",
		},
	},
};

// Создание меню
function createMenu() {
	const menuContainer = document.getElementById("facultyMenu");
	menuContainer.innerHTML = "";

	Object.keys(menuData).forEach((faculty, index) => {
		const facultyItem = createMenuItem(
			faculty,
			menuData[faculty],
			1,
			index + 1
		);
		menuContainer.appendChild(facultyItem);
	});
}

// Создание элемента меню
function createMenuItem(title, children, level, index) {
	const li = document.createElement("li");
	li.className = "menu-item";

	const header = document.createElement("div");
	header.className = "menu-header";

	const titleSpan = document.createElement("span");
	titleSpan.className = "menu-title";

	if (level === 1) {
		titleSpan.innerHTML = `<span class="level-icon">🏛</span><span>${title}</span>`;
	} else if (level === 2) {
		titleSpan.innerHTML = `<span class="level-icon">👥</span><span>${title}</span>`;
	} else {
		titleSpan.innerHTML = `<span class="level-icon">👤</span><span>${title}</span>`;
	}

	header.appendChild(titleSpan);

	if (typeof children === "object" && !Array.isArray(children)) {
		const arrow = document.createElement("span");
		arrow.className = "menu-arrow";
		arrow.textContent = "▶";
		header.appendChild(arrow);

		li.appendChild(header);

		const submenu = document.createElement("ul");
		submenu.className = "submenu menu-list";

		Object.keys(children).forEach((key, idx) => {
			const childItem = createMenuItem(key, children[key], level + 1, idx + 1);
			submenu.appendChild(childItem);
		});

		li.appendChild(submenu);

		header.addEventListener("click", function (e) {
			e.stopPropagation();

			submenu.classList.toggle("open");
			arrow.classList.toggle("open");
			header.classList.toggle("active");
		});
	} else if (typeof children === "string") {
		li.appendChild(header);

		const details = document.createElement("div");
		details.className = "student-details";
		details.innerHTML = `<strong>Расписание пересдачи:</strong><br>${children}`;
		details.style.display = "none";
		li.appendChild(details);

		header.addEventListener("click", function (e) {
			e.stopPropagation();

			if (details.style.display === "none") {
				details.style.display = "block";
				header.classList.add("active");
			} else {
				details.style.display = "none";
				header.classList.remove("active");
			}
		});
	}

	return li;
}

window.addEventListener("DOMContentLoaded", createMenu);
