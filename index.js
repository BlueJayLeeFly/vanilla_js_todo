const userInput = document.querySelector('.add-task-input'); // Input
const todoList = document.querySelector('.todo-list'); // ul
const addBtn = document.querySelector('.add-btn'); // button
const todoCounter = document.querySelector('.todo-counter'); // Counter

// Todo Counter
let counter = 0;
const updateCounter = () =>
	(todoCounter.textContent = `You Have ${counter} To Do${
		counter > 1 ? 's' : '' // make plural
	}.`);

addBtn.addEventListener('click', (e) => {
	e.preventDefault();

	let isChecked = false;
	let editClicked = false;

	// list and remove button
	const wrapper = document.createElement('div');
	const todoItem = document.createElement('li');
	const editBtn = document.createElement('button');
	const completeBtn = document.createElement('button');
	const removeBtn = document.createElement('button');

	// add class to wrapper
	wrapper.classList.add('todo-wrapper');

	// content of created elements
	todoItem.textContent = userInput.value;
	userInput.value = ''; // After user clicks add button, empty the input field
	editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
	completeBtn.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
	removeBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

	// Append elements
	todoList.appendChild(wrapper);
	wrapper.append(todoItem, editBtn, completeBtn, removeBtn);

	// add counter
	counter++;
	updateCounter();

	// Edit button event handling
	editBtn.addEventListener('click', (e) => {
		// icon and attribute change
		if (!editClicked) {
			e.preventDefault();
			editBtn.innerHTML = '<i class="fa-regular fa-floppy-disk"></i>';
			todoItem.setAttribute('contentEditable', 'true');
		} else {
			e.preventDefault();
			editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
			todoItem.setAttribute('contentEditable', 'false');
		}
		editClicked = !editClicked;
	});

	// Complete button event handling
	completeBtn.addEventListener('click', (e) => {
		e.preventDefault();
		todoItem.classList.toggle('complete');

		if (counter !== 0 && !isChecked) {
			counter--;
			updateCounter();
		} else {
			counter++;
			updateCounter();
		}

		isChecked = !isChecked;
	});

	// Remove button event handling
	removeBtn.addEventListener('click', (e) => {
		e.preventDefault();

		if (!isChecked && counter !== 0) {
			counter--;
			updateCounter();
		}

		wrapper.remove();
	});
});
