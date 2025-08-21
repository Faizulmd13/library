const myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // take params, create a book then store it in the array
}

document.addEventListener("DOMContentLoaded", () => {
  const addNewBook = document.querySelector("#new-book");
  const inputForm = document.querySelector(".new-book-info");
  const submitButton = document.querySelector("#submit-btn");

  submitButton.addEventListener("click", function () {
    inputForm.classList.toggle("active");
  });
  addNewBook.addEventListener("click", function () {
    inputForm.classList.toggle("active");
  });
});
