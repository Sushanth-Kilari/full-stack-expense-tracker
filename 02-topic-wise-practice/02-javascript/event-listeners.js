// Event handling: add, delete (event delegation) and live search
// Assumes: <form id="form">, <input id="title">, <input id="search">, <ul id="list">

const form = document.getElementById("form");
const titleInput = document.getElementById("title");
const searchInput = document.getElementById("search");
const list = document.getElementById("list");

// submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;

  const li = document.createElement("li");
  li.innerHTML = `<span>${title}</span> <button data-action="delete">x</button>`;
  list.appendChild(li);
  form.reset();
});

// event delegation - one listener handles every delete button
list.addEventListener("click", (e) => {
  if (e.target.dataset.action === "delete") {
    e.target.closest("li").remove();
  }
});

// input event - filter the list while typing
searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();
  [...list.children].forEach((li) => {
    li.hidden = !li.textContent.toLowerCase().includes(q);
  });
});

// keyboard event
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") searchInput.value = "";
});
