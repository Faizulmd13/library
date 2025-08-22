const myLibrary = [];

function Book(title, author, pages, status) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
  const myBook = new Book(title, author, pages, status);
  myLibrary.push(myBook);
}

function generateCard(container) {
  container.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookTitle = document.createElement("h2");
    bookTitle.textContent = `"${book.title}"`;
    bookCard.appendChild(bookTitle);

    const bookAuthor = document.createElement("h2");
    bookAuthor.textContent = book.author;
    bookCard.appendChild(bookAuthor);

    const bookPages = document.createElement("h2");
    bookPages.textContent = `${book.pages} pages`;
    bookCard.appendChild(bookPages);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-group");

    const statusButton = document.createElement("button");
    statusButton.classList.add("status-btn");
    if (book.status === true) {
      statusButton.classList.add("btn-light-green");
      statusButton.textContent = "Read";
    } else {
      statusButton.classList.add("btn-light-red");
      statusButton.textContent = "Not Read";
    }

    statusButton.addEventListener("click", function () {
      if (statusButton.classList.contains("btn-light-green")) {
        statusButton.classList.remove("btn-light-green");
        statusButton.classList.add("btn-light-red");
        statusButton.textContent = "Not Read";
        book.status = false;
      } else {
        statusButton.classList.remove("btn-light-red");
        statusButton.classList.add("btn-light-green");
        statusButton.textContent = "Read";
        book.status = true; // update data too!
      }
    });
    buttonContainer.appendChild(statusButton);

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function () {
      const toDelete = book.id;
      const index = myLibrary.findIndex((b) => b.id === toDelete);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        bookCard.remove(); // also remove from DOM
      }
    });
    buttonContainer.appendChild(removeBtn);

    bookCard.appendChild(buttonContainer);

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
