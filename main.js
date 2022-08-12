//Constructor
function book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        let readStatus;
        if (read === true){
            readStatus = "read";
        }else{
            readStatus = "not read yet"
        }
        return `${title} by ${author}, ${pages} pages, ${readStatus}`;
    }
}

//
let library = [];

//Creates new books using book constructor and adds them to the library array
function addBook(title,author,pages,read) {
    library.push(new book(title,author,pages,read))
}

//Adding some dummy books
addBook("A Brief History of Tax Evasion","Al Capone","8",true);
addBook("Why Is The Cat Screaming?","Some Guy","62",false);
addBook("Extreme Knitting For Beginners","GRANDMA.","685",false);
addBook("Spreadsheets for Fun and Profit","Dr. X.L. Sheetz, M.D.","9946",true);

//Printing the contents of the library array
library.forEach(
    element => {
        console.log(element.info());
    }
);