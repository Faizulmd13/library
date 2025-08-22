const myLibrary = [];

function Book(title, author, pages, status) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
  const myBook = Book(title, author, pages, status);
  myLibrary.push(myBook);
}

function generateCard(container) {
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    container.appendChild(bookCard);
  });
}

addBookToLibrary("My life", "Me", 69, true);

document.addEventListener("DOMContentLoaded", () => {
  const addNewBook = document.querySelector("#new-book");
  const inputFormDiv = document.querySelector(".new-book-info");
  const submitButton = document.querySelector("#submit-btn");
  const overlay = document.querySelector(".overlay");
  const booksContainer = document.querySelector(".books-container");
  generateCard(booksContainer);

  submitButton.addEventListener("click", function () {
    inputFormDiv.classList.toggle("active");
    overlay.classList.toggle("active");
  });
  addNewBook.addEventListener("click", function () {
    inputFormDiv.classList.toggle("active");
    overlay.classList.toggle("active");
  });
});
