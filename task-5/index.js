// Инициализация слайдера
function initSlider() {
	const track = document.getElementById("sliderTrack");
	const thumb = document.getElementById("sliderThumb");
	const valueDisplay = document.getElementById("sliderValue");
	const fill = document.getElementById("sliderFill");
	const difficultyLabel = document.getElementById("difficultyLabel");

	let isDragging = false;
	let currentValue = 1;

	// Описания сложности
	const difficultyTexts = {
		1: "Очень легко",
		2: "Легко",
		3: "Довольно легко",
		4: "Ниже среднего",
		5: "Средне",
		6: "Выше среднего",
		7: "Сложно",
		8: "Очень сложно",
		9: "Крайне сложно",
		10: "Максимальная сложность",
	};

	// Обновление слайдера
	function updateSlider(value) {
		currentValue = Math.max(1, Math.min(10, value));
		const percentage = ((currentValue - 1) / 9) * 100;

		thumb.style.left = percentage + "%";
		fill.style.width = percentage + "%";
		valueDisplay.textContent = currentValue;

		const hue = 120 - ((currentValue - 1) / 9) * 120;
		const color = `hsl(${hue}, 70%, 50%)`;

		fill.style.background = color;
		thumb.style.borderColor = color;
		valueDisplay.style.background = color;

		difficultyLabel.textContent = difficultyTexts[currentValue];
		difficultyLabel.style.color = color;
	}

	function handleMove(clientX) {
		const rect = track.getBoundingClientRect();
		const x = clientX - rect.left;
		console.log("user ", x);
		const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
		const value = Math.round((percentage / 100) * 9) + 1;
		// console.log("width", rect.width);
		// console.log("percentage", percentage);
		// console.log("value", value);
		updateSlider(value);
	}

	// События мыши для бегунка
	thumb.addEventListener("mousedown", function (e) {
		isDragging = true;
		e.preventDefault();
	});

	// Глобальные события для перетаскивания
	document.addEventListener("mousemove", function (e) {
		if (isDragging) {
			handleMove(e.clientX);
		}
	});

	document.addEventListener("mouseup", function () {
		isDragging = false;
	});

	// Клик по треку
	track.addEventListener("click", function (e) {
		handleMove(e.clientX);
	});

	document.addEventListener("touchmove", function (e) {
		if (isDragging && e.touches.length > 0) {
			handleMove(e.touches[0].clientX);
		}
	});

	document.addEventListener("touchend", function () {
		isDragging = false;
	});

	track.addEventListener("touchstart", function (e) {
		if (e.touches.length > 0) {
			handleMove(e.touches[0].clientX);
		}
	});

	// Инициализация начального значения
	updateSlider(1);
}

window.addEventListener("DOMContentLoaded", initSlider);
