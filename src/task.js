const form = document.querySelector(".task__form");
const input = document.querySelector(".task__input");
const pending = document.querySelector(".pending");
const finished = document.querySelector(".finished");
const title = document.querySelector(".movie__detail__title");
const addMoiveButton = document.querySelector(".btn-addmovie");

const PENDING = "pending";
const FINISHED = "finished";

let pendingTasks = [];
let finishedTasks = [];

const addTask = (id, text, type) => {
    const taskObj = {
        id,
        text
    };
    if (type === PENDING) {
        pendingTasks.push(taskObj);
        localStorage.setItem(type, JSON.stringify(pendingTasks));
    } else if (type === FINISHED) {
        finishedTasks.push(taskObj);
        localStorage.setItem(type, JSON.stringify(finishedTasks));
    }
};

const loadTasks = () => {
    const parsedPendingList = JSON.parse(localStorage.getItem(PENDING));
    if (parsedPendingList) {
        parsedPendingList.forEach((e) => addItem(e.text, PENDING));
    }
    const parsedFinishedList = JSON.parse(localStorage.getItem(FINISHED));
    if (parsedFinishedList) {
        parsedFinishedList.forEach((e) => addItem(e.text, FINISHED));
    }
};

const deleteTask = (e, type) => {
    const {
        target: { parentNode }
    } = e;
    let target = parentNode.parentNode;
    if (e.target.nodeName === "I") {
        target = target.parentNode
    }
    if (type === PENDING) {
        pending.removeChild(target);
        pendingTasks = pendingTasks.filter(
            (task) => task.id !== parseInt(target.id, 10)
        );
        localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
    } else if (type === FINISHED) {
        finished.removeChild(target);
        finishedTasks = finishedTasks.filter(
            (task) => task.id !== parseInt(target.id, 10)
        );
        localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
    }
};

const changeState = (e, type) => {
    const {
        target: { parentNode }
    } = e;
    let target = parentNode.parentNode;
    if (e.target.nodeName === "I") {
        target = target.parentNode
    }
    const text = target.querySelector("span").innerText;
    deleteTask(e, type);
    type = type === PENDING ? FINISHED : PENDING;
    addItem(text, type);
};

const createItem = (text, type) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const div = document.createElement("div");
    const deleteButton = document.createElement("button");
    const secondButton = document.createElement("button");
    li.classList.add("item__container");
    span.classList.add("item__left");
    div.classList.add("item__right");
    deleteButton.classList.add("item__button");
    secondButton.classList.add("item__button");
    deleteButton.addEventListener("click", (e) => deleteTask(e, type));
    secondButton.addEventListener("click", (e) => changeState(e, type));
    span.innerText = text.includes("•") ? text : `• ${text}`;
    deleteButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;
    if (type === PENDING) {
        secondButton.innerHTML = `<i class="fas fa-check"></i>`;
    } else if (type === FINISHED) {
        secondButton.innerHTML = `<i class="fas fa-redo-alt"></i>`;
    }
    li.appendChild(span);
    div.appendChild(deleteButton);
    div.appendChild(secondButton);
    li.appendChild(div);
    return li;
};

const addItem = (text, type) => {
    const li = createItem(text, type);
    const id = Date.now();
    li.id = id;
    if (type === PENDING) {
        pending.appendChild(li);
    } else if (type === FINISHED) {
        finished.appendChild(li);
    }
    addTask(id, text, type);
    input.value = "";
};

const addMovie = () => {
}

function init() {
    loadTasks();
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addItem(input.value, PENDING);
    });
    addMoiveButton.addEventListener("click", () => addItem(`영화 '${title.innerText}' 관람`, PENDING));
};

init();