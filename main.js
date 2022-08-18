//Global Variables
let library = [];
const bookContainer = document.getElementById("book-display");
let indexNumCount = 0

//Constructors
function book(title, author, pages, read,indexNumber) {
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
  indexNumCount++
  library.push(new book(title, author, pages, read,indexNumber));
}

function displayBookCard(book) {


//Title Element
let title = document.createElement('h2');
title.setAttribute('class','title');
title.innerHTML = book.title;

//Author Element
let author = document.createElement('p');
author.setAttribute('class','author');
let authorLabel = document.createElement('span');
authorLabel.setAttribute('class','info-type');
authorLabel.innerHTML='Author:';
let authorValue = document.createElement('span');
authorValue.setAttribute('class','info-value');
authorLabel.innerHTML=book.author;
author.appendChild(authorLabel);
author.appendChild(authorValue);

//Pages element
let pages = document.createElement('p');
pages.setAttribute('class','pages');
let pagesLabel = document.createElement('span');
pagesLabel.setAttribute('class','info-type');
pagesLabel.innerHTML='Pages:';
let pagesValue = document.createElement('span');
pagesValue.setAttribute('class','info-value');
pagesLabel.innerHTML=book.pages;
pages.appendChild(pagesLabel);
pages.appendChild(pagesValue);

//If read element
let readStatus;
if (book.read === true) {
  readStatus = "Yes";
} else {
  readStatus = "No";
}
let ifRead = document.createElement('p');
ifRead.setAttribute('class','pages');
let ifReadLabel = document.createElement('span');
ifReadLabel.setAttribute('class','info-type');
ifReadLabel.innerHTML='Read: ';
let ifReadValue = document.createElement('span');
ifReadValue.setAttribute('class','info-value');
ifReadValue.innerHTML = readStatus;
ifRead.appendChild(ifReadLabel);
ifRead.appendChild(ifReadValue);

//Container
const card = document.createElement('section');
card.setAttribute('class','book-card');
card.setAttribute('data-index-number',`${book.indexNumber}`);

card.appendChild(title);
card.appendChild(author);
card.appendChild(pages);
card.appendChild(ifRead);

document.getElementById("book-display").appendChild(card);

}

function updateDisplayedBooks(){
let displayedBooks = "";
library.forEach(function (book) {
  displayedBooks += `<section class="displayedBook" data-index-number=${book.indexNumber}>${book.displayTitle()} ${book.displayAuthor()} ${book.displayPages()} ${book.displayIfRead()}</section>`;
});
bookContainer.innerHTML = displayedBooks;
}

function addNewBook() {
    addBook("Why Is The Cat Screaming?", "Some Guy", "62", false);
    updateDisplayedBooks();
}

function removeBook(indexNo){
    library.forEach(function(book){
      if (book.indexNumber === indexNo){
        const domElement = document.querySelector(`[data-index-number="${book.indexNumber}"]`);
        library.splice(library.indexOf(book),1);
        console.log(library)
        domElement.remove();
      }
    });
}

document.getElementById("addBook").addEventListener("click", () => {addNewBook()});

// addBook("A Brief History of Tax Evasion", "Al Capone", "8", true);
// addBook("Why Is The Cat Screaming?", "Some Guy", "62", false);
// addBook("Extreme Knitting For Beginners", "GRANDMA.", "685", false);
// addBook(
//   "Spreadsheets for Fun and Profit",
//   "Dr. X.L. Sheetz, M.D.",
//   "9946",
//   true
// );
updateDisplayedBooks();