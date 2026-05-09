const modal = document.getElementById("modal");
const memoInput = document.getElementById("memoInput");

const saveButton = document.getElementById("saveButton");
const cancelButton = document.getElementById("cancelButton");
const addButton = document.getElementById("addButton");
const memoList = document.getElementById("memoList");

let memos = JSON.parse(localStorage.getItem("todayMemos")) || [
  { text: "水切りネット", done: false },
  { text: "果物買う", done: true }
];

function saveMemos() {
  localStorage.setItem("todayMemos", JSON.stringify(memos));
}

function renderMemos() {
  memoList.innerHTML = "";

  memos.forEach(function (memo, index) {
    const newMemo = document.createElement("div");
    newMemo.className = "memo-item";
    if (memo.done) {
  newMemo.classList.add("done");
}

    const textSpan = document.createElement("span");
    textSpan.textContent = (memo.done ? "☑ " : "□ ") + memo.text;

    let pressTimer;

textSpan.addEventListener("touchstart", function () {

  pressTimer = setTimeout(function () {

    const newText = prompt("タスクを編集", memo.text);

    if (newText === null || newText.trim() === "") {
      return;
    }

    memos[index].text = newText;

    saveMemos();
    renderMemos();

  }, 600);

});

textSpan.addEventListener("touchend", function () {
  clearTimeout(pressTimer);
});

textSpan.addEventListener("click", function () {
  memos[index].done = !memos[index].done;

  saveMemos();
  renderMemos();
});

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "x";

    deleteButton.addEventListener("click", function (event) {
      event.stopPropagation();
      memos.splice(index, 1);
      saveMemos();
      renderMemos();
    });

    newMemo.appendChild(textSpan);
    newMemo.appendChild(deleteButton);
    memoList.appendChild(newMemo);
  });
}

addButton.addEventListener("click", function () {
  modal.classList.remove("hidden");
  memoInput.value = "";
});

saveButton.addEventListener("click", function () {

  const text = memoInput.value;

  if (text.trim() === "") {
    return;
  }

  memos.push({
    text: text,
    done: false
  });

  saveMemos();
  renderMemos();

  modal.classList.add("hidden");
});

cancelButton.addEventListener("click", function () {
  modal.classList.add("hidden");
});

renderMemos();