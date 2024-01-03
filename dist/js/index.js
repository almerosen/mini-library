var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseURL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
// let books: Book[] = []
const main = document.querySelector("main");
const overlay = document.querySelector(".overlay");
const bookInfoWrapper = document.querySelector(".bookInfoWrapper");
const closeButton = document.querySelector(".overlay-close");
const inputField = document.querySelector("#search__input");
const searchButton = document.querySelector("#search__submit");
// Function to create books on index page
function createBooks(obj) {
    const bookCover = document.createElement("div");
    bookCover.classList.add("bookCover");
    bookCover.style.backgroundColor = obj.color;
    main.append(bookCover);
    const border = document.createElement("div");
    border.classList.add("border");
    bookCover.append(border);
    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("bookTitle");
    bookTitle.innerHTML = obj.title;
    bookCover.append(bookTitle);
    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("bookAuthor");
    bookAuthor.innerText = obj.author;
    bookCover.append(bookAuthor);
}
// Function to create a single book with info...
function createBookInfo(obj) {
    const overlayBookCover = document.querySelector(".overlay__book-cover");
    overlayBookCover.style.backgroundColor = obj.color;
    const overlayBookTitle = document.querySelector(".overlay__book-title");
    overlayBookTitle.innerHTML = obj.title;
    const overlayAuthor = document.querySelector(".overlay__author");
    overlayAuthor.innerHTML = obj.author;
    const bookInfoTitle = document.querySelector(".overlay__book-info__title");
    bookInfoTitle.innerHTML = obj.title;
    const bookInfoAuthor = document.querySelector(".overlay__book-info__author");
    bookInfoAuthor.innerHTML = obj.author;
    const bookInfoPlot = document.querySelector(".overlay__book-info__summary");
    bookInfoPlot.innerHTML = obj.plot;
    const bookInfoAudience = document.querySelector("#book-info__data__audience");
    bookInfoAudience.innerHTML = obj.audience;
    const bookInfoPublished = document.querySelector("#book-info__data__published");
    bookInfoPublished.innerHTML = obj.year;
    const bookInfoPages = document.querySelector("#book-info__data__pages");
    bookInfoPages.innerHTML = obj.pages;
    const bookInfoPublisher = document.querySelector("#book-info__data__publisher");
    bookInfoPublisher.innerHTML = obj.publisher;
}
// Fetch and display all the books on index page:
function getBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(baseURL);
            if (!response.ok) {
                throw new Error(`Failed fetch data with status ${response.status}`);
            }
            const books = yield response.json();
            console.log(books);
            books.forEach((book) => {
                createBooks(book);
            });
            clickOnBook();
        }
        catch (error) {
            console.error(error);
        }
    });
}
getBooks();
// Function to get a single book
function getBook(index) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(baseURL);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const books = yield response.json();
            const book = books[index];
            console.log(book);
            createBookInfo(book);
        }
        catch (error) {
            console.error("Error fetching data", error);
        }
    });
}
// Show overlay 'page'
const overlayOpen = () => {
    overlay.classList.toggle("hidden");
};
// Hide overlay 
const overlayClose = () => {
    closeButton.addEventListener('click', () => {
        overlay.classList.toggle("hidden");
    });
};
// Click on book function 
function clickOnBook() {
    let bookCovers = document.querySelectorAll(".bookCover");
    bookCovers.forEach((book, index) => {
        book.addEventListener('click', () => {
            getBook(index);
            overlayOpen();
        });
    });
    overlayClose();
}
// Function for search book by title
function searchBook() {
    return __awaiter(this, void 0, void 0, function* () {
        let inputVal = inputField.value;
        console.log(inputVal);
        try {
            const response = yield fetch(baseURL);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const books = yield response.json();
            console.log(books);
            let filteredBooks = books.filter((book) => {
                return book.title.toLowerCase().includes(inputVal);
            });
            console.log(filteredBooks);
            filteredBooks.forEach((book) => {
                console.log(book);
                createBookInfo(book);
                overlayOpen();
            });
            // books.forEach((book, index) => {
            //     if (book.title.toLowerCase().includes(inputVal)) {
            //         getBook(index)
            //         overlayOpen()
            //     }
            // })  
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    });
}
// Search book on key press "enter"
inputField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchBook();
    }
});
// Search when clicking button in input field
searchButton.addEventListener('click', () => {
    searchBook();
});
