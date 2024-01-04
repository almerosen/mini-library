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
const main = document.querySelector("main");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".overlay-close");
const inputField = document.querySelector("#search__input");
const searchButton = document.querySelector("#search__submit");
// Function to create books on index page
function createBooks(obj) {
    const productPanel = document.createElement("div");
    productPanel.classList.add("productPanel");
    main.append(productPanel);
    const bookCover = document.createElement("div");
    bookCover.classList.add("bookCover");
    bookCover.style.background = `linear-gradient(208deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.00) 92.13%), ${obj.color}`;
    productPanel.append(bookCover);
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
    const productPanelTextWrapper = document.createElement("div");
    productPanelTextWrapper.classList.add("product-panel-text-wrapper");
    productPanel.append(productPanelTextWrapper);
    const productPanelTitle = document.createElement("h3");
    productPanelTitle.classList.add("productPanel-title");
    productPanelTitle.innerHTML = obj.title;
    productPanelTextWrapper.append(productPanelTitle);
    const productPanelAuthor = document.createElement("p");
    productPanelAuthor.classList.add("productPanel-author");
    productPanelAuthor.innerHTML = obj.author;
    productPanelTextWrapper.append(productPanelAuthor);
    const readMoreButton = document.createElement("button");
    readMoreButton.classList.add("readMoreButton");
    readMoreButton.innerHTML = "Quick look";
    productPanel.append(readMoreButton);
}
// Function to create a single book with info...
function createBookInfo(obj) {
    const overlayBookCover = document.querySelector(".overlay__book-cover");
    overlayBookCover.style.background = `linear-gradient(208deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.00) 92.13%), ${obj.color}`;
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
function getBooks(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`Failed fetch data with status ${response.status}`);
            }
            const books = yield response.json();
            console.log(books);
            books.forEach((book) => {
                createBooks(book);
            });
            clickOnBook();
            clickOnReadMoreButton();
        }
        catch (error) {
            console.error(error);
        }
    });
}
getBooks(baseURL);
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
function clickOnReadMoreButton() {
    let buttons = document.querySelectorAll(".readMoreButton");
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            getBook(index);
            overlayOpen();
        });
    });
}
// Search Function for filter book by title
function filterBooksBySearch(books, inputField) {
    const inputVal = inputField.value;
    const filteredBooks = books.filter((book) => {
        return book.title.toLowerCase().includes(inputVal.toLowerCase());
    });
    console.log(filteredBooks);
    filteredBooks.forEach((book) => {
        console.log(book);
        createBookInfo(book);
    });
    overlayOpen();
}
// Function for fetch books and then filter books by title name
function searchBook(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const books = yield response.json();
            console.log(books);
            filterBooksBySearch(books, inputField);
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
        searchBook(baseURL);
    }
});
// Search when clicking button in input field
searchButton.addEventListener('click', () => {
    searchBook(baseURL);
});
