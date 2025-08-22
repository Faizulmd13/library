// ====== Data Handling ======
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

function saveLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadLibrary() {
  const stored = localStorage.getItem("myLibrary");
  if (stored) {
    const parsed = JSON.parse(stored);
    parsed.forEach((book) => {
      myLibrary.push(
        new Book(book.title, book.author, book.pages, book.status, book.id)
      );
    });
  }
}

// ====== UI Rendering ======
function generateCard(container) {
  container.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    // Title
    const bookTitle = document.createElement("h2");
    bookTitle.textContent = `"${book.title}"`;
    bookCard.appendChild(bookTitle);

    // Author
    const bookAuthor = document.createElement("h2");
    bookAuthor.textContent = book.author;
    bookCard.appendChild(bookAuthor);

    // Pages
    const bookPages = document.createElement("h2");
    bookPages.textContent = `${book.pages} pages`;
    bookCard.appendChild(bookPages);

    // Button container
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-group");

    // Status Button
    const statusButton = document.createElement("button");
    statusButton.classList.add("btn");
    updateStatusButton(statusButton, book);

    statusButton.addEventListener("click", () => {
      book.status = !book.status;
      updateStatusButton(statusButton, book);
      saveLibrary();
    });
    buttonContainer.appendChild(statusButton);

    // Remove Button
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      const index = myLibrary.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        saveLibrary();
        generateCard(container);
      }
    });
    buttonContainer.appendChild(removeBtn);

    bookCard.appendChild(buttonContainer);
    container.appendChild(bookCard);
  });
}

function updateStatusButton(button, book) {
  button.classList.toggle("btn-light-green", book.status);
  button.classList.toggle("btn-light-red", !book.status);
  button.textContent = book.status ? "Read" : "Not Read";
}

// ====== Event Handling ======
document.addEventListener("DOMContentLoaded", () => {
  const addNewBook = document.querySelector("#new-book");
  const inputFormDiv = document.querySelector(".new-book-info");
  const submitButton = document.querySelector(".submit-btn");
  const overlay = document.querySelector(".overlay");
  const booksContainer = document.querySelector(".books-container");
  const form = document.querySelector(".new-book-form");

  // Load existing books
  loadLibrary();
  generateCard(booksContainer);

  // Add book form submit
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const title = form.querySelector(".title").value.trim();
    const author = form.querySelector(".author").value.trim();
    const pages = form.querySelector(".pages").value.trim();
    const status = form.querySelector(".status").checked;

    if (title && author && pages) {
      addBookToLibrary(title, author, pages, status);
      saveLibrary();
      generateCard(booksContainer);

      form.reset();
      inputFormDiv.classList.remove("active");
      overlay.classList.remove("active");
    }
  });

  // Show form
  addNewBook.addEventListener("click", () => {
    inputFormDiv.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  // Hide form when overlay clicked
  overlay.addEventListener("click", () => {
    inputFormDiv.classList.remove("active");
    overlay.classList.remove("active");
  });
});
