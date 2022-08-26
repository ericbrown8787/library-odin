//Global Variables
let library = [];
const bookContainer = document.getElementById("book-display");
let indexNumCount = 0;

//Constructors
function book(title, author, pages, read, indexNumber) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.indexNumber = indexNumber;
  this.displayTitle = function () {
    return `<h2 class="title">${title}</h2>`;
  };
  this.displayAuthor = function () {
    return `<p class="author"><span class="info-type">Author:</span><span class="info-value"> ${author}</span></p>`;
  };
  this.displayPages = function () {
    return `<p class="pages"><span class="info-type">Pages:</span><span class="info-value"> ${pages}</span></p>`;
  };
  this.displayIfRead = function () {
    let readStatus;
    if (read === true) {
      readStatus = "Yes";
    } else {
      readStatus = "No";
    }
    return `<p class="read"><span class="info-type">Read:</span><span class="info-value"> ${readStatus}</span></p>`;
  };

  this.info = function () {
    let readStatus;
    if (read === true) {
      readStatus = "read";
    } else {
      readStatus = "not read yet";
    }
    return `${title} by ${author}, ${pages} pages, ${readStatus}`;
  };
}

//Adding and deleting books from library/DOM
function addBook(title, author, pages, read) {
  let indexNumber = indexNumCount;
  indexNumCount++;
  library.push(new book(title, author, pages, read, indexNumber));
}

function updateDisplayedBooks() {
  let displayedBooks = "";
  library.forEach(function (book) {
    displayedBooks += `<section class="displayedBook" data-index-number=${
      book.indexNumber
    }>${book.displayTitle()} ${book.displayAuthor()} ${book.displayPages()} ${book.displayIfRead()}</section>`;
  });
  bookContainer.innerHTML = displayedBooks;
}

function addNewBook() {
  const title = document.getElementById("titleInput").value;
  const author = document.getElementById("authorInput").value;
  const pages = document.getElementById("pagesInput").value;
  const read = document.getElementById("readInput").checked;
  addBook(title, author, pages, read);
  updateDisplayedBooks();
}

function clearInputs() {
  const title = document.getElementById("titleInput");
  const author = document.getElementById("authorInput");
  const pages = document.getElementById("pagesInput");
  const read = document.getElementById("readInput");
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
}

function removeBook(indexNo) {
  library.forEach(function (book) {
    if (book.indexNumber === indexNo) {
      const domElement = document.querySelector(
        `[data-index-number="${book.indexNumber}"]`
      );
      library.splice(library.indexOf(book), 1);
      console.log(library);
      domElement.remove();
    }
  });
}

document.getElementById("addBook").addEventListener("click", () => {
  addNewBook();
  clearInputs();
});

updateDisplayedBooks();
