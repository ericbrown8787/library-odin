//Constructor
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
    return `<p class="title"><span class="info-type">Pages:</span><span class="info-value"> ${pages}</span></p>`;
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

//
let library = [];
const bookContainer = document.getElementById("book-display");
let indexNumCount = 0

//Creates new books using book constructor and adds them to the library array
function addBook(title, author, pages, read) {
  let indexNumber = indexNumCount;
  indexNumCount++
  library.push(new book(title, author, pages, read,indexNumber));
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