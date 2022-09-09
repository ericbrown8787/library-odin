//Global Variables
let library = [];
const bookContainer = document.getElementById("book-display");
let indexNumCount = 0;

//Constructors
function Book(title, author, pages, read, indexNumber) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.indexNumber = indexNumber;

  function displayInfo(infoType, infoValue) {
    const element = document.createElement("p");
    const infoTypeSpan = document.createElement("span");
    const infoValueSpan = document.createElement("span");
    infoTypeSpan.setAttribute("class", "info-type");
    infoTypeSpan.innerText = `${infoType}: `;
    infoValueSpan.setAttribute("class", "info-value");
    infoValueSpan.innerText = infoValue;
    element.appendChild(infoTypeSpan);
    element.appendChild(infoValueSpan);
    return element;
  }

  this.displayTitle = function () {
    const titleElement = document.createElement("h2");
    titleElement.setAttribute("class", "title");
    titleElement.innerText = this.title;
    return titleElement;
  };

  this.displayAuthor = function () {
    const element = displayInfo("Author", author);
    element.setAttribute("class", "author");
    return element;
  };

  this.displayPages = function () {
    const element = displayInfo("Pages", pages);
    element.setAttribute("class", "pages");
    return element;
  };

  this.displayIfRead = function () {
    let readStatus;
    if (read === true) {
      readStatus = "Yes";
    } else {
      readStatus = "No";
    }
    const element = displayInfo("Read?", readStatus);
    element.setAttribute("class", "read-status");
    return element;
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
  library.push(new Book(title, author, pages, read, indexNumber));
}

function generateCard(book) {
  const card = document.createElement("section");
  const removeButton = document.createElement("button");
  removeButton.setAttribute("class", "remove-button");
  removeButton.addEventListener("click", () => {
    removeBook(book.indexNumber);
  });
  removeButton.innerText = "Remove Book";
  card.setAttribute("class", "book-card");
  card.setAttribute("data-index-number", book.indexNumber);
  card.appendChild(book.displayTitle());
  card.appendChild(book.displayAuthor());
  card.appendChild(book.displayPages());
  card.appendChild(book.displayIfRead());
  card.appendChild(removeButton);
  return card;
}

function populateDisplayedBooks() {
  let displayedBooks = new DocumentFragment();
  library.forEach(function (book) {
    const card = generateCard(book);
    displayedBooks.append(card);
  });
  bookContainer.appendChild(displayedBooks);
}

function inputBook() {
  const title = document.getElementById("titleInput").value;
  const author = document.getElementById("authorInput").value;
  const pages = document.getElementById("pagesInput").value;
  const read = document.getElementById("readInput").checked;
  addBook(title, author, pages, read);
}

function displayNewCard() {
  const card = generateCard(library[library.length - 1]);
  bookContainer.append(card);
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
      domElement.remove();
    }
  });
}

//Event Listeners
document.getElementById("addBook").addEventListener("click", () => {
  inputBook();
  displayNewCard();
  clearInputs();
});
addBook("Spreadsheets For Fun And Profit", "Dr. X.L. Sheetz", 343, true);
//On page loading
populateDisplayedBooks();
