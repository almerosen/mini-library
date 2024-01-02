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
let books = [];
const main = document.querySelector("main");
const overlay = document.querySelector(".overlay");
const bookInfoWrapper = document.querySelector(".bookInfoWrapper");
const closeButton = document.querySelector(".overlay-close");
const inputField = document.querySelector("#search__input");
function createBooks(obj) {
    const bookCover = document.createElement("div");
    bookCover.classList.add("bookCover");
    bookCover.style.backgroundColor = obj.color;
    main.append(bookCover);
    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("bookTitle");
    bookTitle.innerHTML = obj.title;
    bookCover.append(bookTitle);
    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("bookAuthor");
    bookAuthor.innerText = obj.author;
    bookCover.append(bookAuthor);
}
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
// Display all the books on index page:
function getBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(baseURL);
            if (response.status === 200) {
                const books = yield response.json();
                console.log(books);
                books.forEach((book) => {
                    createBooks(book);
                });
                clickOnBook();
            }
            else {
                throw Error("Response failed");
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
getBooks();
// Function for creating a single book with info
function getBook(index) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(baseURL);
        const books = yield response.json();
        const book = books[index];
        console.log(book);
        createBookInfo(book);
    });
}
const overlayOpen = () => {
    overlay.classList.toggle("hidden");
};
const overlayClose = () => {
    closeButton.addEventListener('click', () => {
        overlay.classList.toggle("hidden");
    });
};
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
function searchBook() {
    const inputVal = inputField.value;
    console.log(inputVal);
}
inputField.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchBook();
    }
});
export {};
