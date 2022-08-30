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
  this.displayTitle = function () {
    const titleElement = document.createElement('h2');
    titleElement.setAttribute("class","title");
    titleElement.innerText = this.title;
    return titleElement;
  };
  this.displayAuthor = function () {
    const element = document.createElement('p');
    const infoTypeSpan = document.createElement('span');
    const infoValueSpan = document.createElement('span');
    infoTypeSpan.setAttribute("class","info-type");
    infoTypeSpan.innerText = 'Author:'
    infoValueSpan.setAttribute("class","info-value");
    infoValueSpan.innerText = author;
    element.setAttribute("class","author");
    element.appendChild(infoTypeSpan);
    element.appendChild(infoValueSpan);
    return element;
  };
  this.displayPages = function () {
    const element = document.createElement('p');
    const infoTypeSpan = document.createElement('span');
    const infoValueSpan = document.createElement('span');
    infoTypeSpan.setAttribute("class","info-type");
    infoTypeSpan.innerText = 'Pages:'
    infoValueSpan.setAttribute("class","info-value");
    infoValueSpan.innerText = pages;
    element.setAttribute("class","author");
    element.appendChild(infoTypeSpan);
    element.appendChild(infoValueSpan);
    return element;
  };
  this.displayIfRead = function () {
    let readStatus;
    if (read === true) {
      readStatus = "Yes";
    } else {
      readStatus = "No";
    }
    const element = document.createElement('p');
    const infoTypeSpan = document.createElement('span');
    const infoValueSpan = document.createElement('span');
    infoTypeSpan.setAttribute("class","info-type");
    infoTypeSpan.innerText = 'Read?:'
    infoValueSpan.setAttribute("class","info-value");
    infoValueSpan.innerText = readStatus;
    element.setAttribute("class","author");
    element.appendChild(infoTypeSpan);
    element.appendChild(infoValueSpan);
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

function updateDisplayedBooks() {
  let displayedBooks = new DocumentFragment();
  library.forEach(function (book) {
    const card = document.createElement('section');
    card.setAttribute("class","displayedBook");
    card.setAttribute('data-index-number',book.indexNumber);
    card.appendChild(book.displayTitle());
    card.appendChild(book.displayAuthor());
    card.appendChild(book.displayPages());
    card.appendChild(book.displayIfRead());
    displayedBooks.append(card);
  });
  bookContainer.appendChild(displayedBooks);
}

function inputBook(){
  const title = document.getElementById("titleInput").value;
  const author = document.getElementById("authorInput").value;
  const pages = document.getElementById("pagesInput").value;
  const read = document.getElementById("readInput").checked;
  addBook(title, author, pages, read);
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

//Event Listeners
document.getElementById("addBook").addEventListener("click", () => {
  inputBook();
  updateDisplayedBooks();
  clearInputs();
});

//On page loading
updateDisplayedBooks();
