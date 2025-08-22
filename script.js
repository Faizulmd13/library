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
    statusButton.classList.add("btn");
    if (book.status) {
      statusButton.classList.add("btn-light-green");
      statusButton.textContent = "Read";
    } else {
      statusButton.classList.add("btn-light-red");
      statusButton.textContent = "Not Read";
    }

    statusButton.addEventListener("click", () => {
      book.status = !book.status;
      statusButton.classList.toggle("btn-light-green", book.status);
      statusButton.classList.toggle("btn-light-red", !book.status);
      statusButton.textContent = book.status ? "Read" : "Not Read";
    });
    buttonContainer.appendChild(statusButton);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      const index = myLibrary.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        bookCard.remove();
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
  const submitButton = document.querySelector(".submit-btn");
  const overlay = document.querySelector(".overlay");
  const booksContainer = document.querySelector(".books-container");
  const form = document.querySelector(".new-book-form");

  generateCard(booksContainer);

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const title = form.querySelector(".title").value;
    const author = form.querySelector(".author").value;
    const pages = form.querySelector(".pages").value;
    const status = form.querySelector(".status").checked;

    if (title && author && pages) {
      addBookToLibrary(title, author, pages, status);
      generateCard(booksContainer);

      form.reset();
      inputFormDiv.classList.remove("active");
      overlay.classList.remove("active");
    }
  });

  addNewBook.addEventListener("click", () => {
    inputFormDiv.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    inputFormDiv.classList.remove("active");
    overlay.classList.remove("active");
  });
});
