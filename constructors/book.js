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