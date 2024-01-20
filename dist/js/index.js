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
const inputField = document.querySelector("#search__input");
const searchButton = document.querySelector("#search__submit");
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
            books.map((obj) => {
                main.innerHTML +=
                    `
            <div class="productPanel">
                <div class="bookCover" data-id="${obj.id}" style="background: linear-gradient(208deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.00) 92.13%), ${obj.color}">
                    <div class="border"></div>
                    <h3 class="bookTitle">${obj.title}</h3>
                    <p class="bookAuthor">${obj.author}</p>
                </div>
        
                <div class="product-panel-text-wrapper">
                    <h3 class="productPanel-title">${obj.title}</h3>
                    <p class="productPanel-author">${obj.author}</p>
                </div>
        
                <button class="readMoreButton" data-id="${obj.id}">Quick look</button>
            </div>
            `;
            });
            clickOnBook();
            clickOnReadMoreButton();
        }
        catch (error) {
            console.error("Error fetching data", error);
        }
    });
}
getBooks(baseURL);
// Function to get a single book
function getBook(url, bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${url}/${bookId}`);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
            overlay.innerHTML = "";
            overlay.innerHTML +=
                `
            <div class="overlay-close">&#10005;</div>
            <div class="bookInfoWrapper">
                <div class="overlay__book-cover" style="background: linear-gradient(208deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.00) 92.13%), ${data.color}">
                    <div class="overlay__book-info__border"></div>
                    <h1 class="overlay__book-title">${data.title}</h1>
                    <p class="overlay__author">${data.author}</p>
                </div>
                <div class="overlay__book-info">
                    <div class="overlay__book-info__title-div">
                        <h1 class="overlay__book-info__title">${data.title}</h1>
                        <h3 class="overlay__book-info__author">${data.author}</h3>
                    </div>
                    <p class="overlay__book-info__summary">${data.plot}</p>
                    <div class="overlay__book-info__data">
                        <p class="book-info__data__txt">Audience: <span id="book-info__data__audience">${data.audience}</span></p>
                        <p class="book-info__data__txt">First published: <span id="book-info__data__published">${data.year}</span></p>
                        <p class="book-info__data__txt">Pages: <span id="book-info__data__pages">${data.pages}</span></p>
                        <p class="book-info__data__txt">Publisher: <span id="book-info__data__publisher">${data.publisher}</span></p>
                    </div>
                    <button>Read it</button>
                </div>
            </div>
            `;
        }
        catch (error) {
            console.error("Error fetching data", error);
        }
    });
}
// Show overlay 'page'
const overlayOpen = () => {
    overlay.classList.toggle("visible");
};
// Hide overlay 
function overlayClose() {
    const closeButton = document.querySelector(".overlay-close");
    closeButton.addEventListener("click", () => {
        overlay.classList.remove("visible");
    });
}
// Click on book function 
function clickOnBook() {
    let bookCovers = document.querySelectorAll(".bookCover");
    bookCovers.forEach((book) => {
        book.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            const bookId = +book.getAttribute("data-id");
            yield getBook(baseURL, bookId);
            overlayOpen();
            overlayClose();
        }));
    });
}
function clickOnReadMoreButton() {
    let buttons = document.querySelectorAll(".readMoreButton");
    buttons.forEach((button) => {
        button.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            const bookId = +button.getAttribute("data-id");
            yield getBook(baseURL, bookId);
            overlayOpen();
            overlayClose();
        }));
    });
}
// Search Function for filter book by title
function filterBooksBySearch(books, inputField) {
    const inputVal = inputField.value;
    const filteredBooks = books.filter((book) => {
        return book.title.toLowerCase().includes(inputVal.toLowerCase());
    });
    console.log(filteredBooks);
    // Render close button in overlay
    overlay.innerHTML = `<div class="overlay-close">&#10005;</div>`;
    // Render the filtered books in the overlay
    filteredBooks.forEach((book) => {
        overlay.innerHTML +=
            `
        <div class="bookInfoWrapper">
            <div class="overlay__book-cover" style="background: linear-gradient(208deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.00) 92.13%), ${book.color}">
                <div class="overlay__book-info__border"></div>
                <h1 class="overlay__book-title">${book.title}</h1>
                <p class="overlay__author">${book.author}</p>
            </div>
            <div class="overlay__book-info">
                <div class="overlay__book-info__title-div">
                    <h1 class="overlay__book-info__title">${book.title}</h1>
                    <h3 class="overlay__book-info__author">${book.author}</h3>
                </div>
                <p class="overlay__book-info__summary">${book.plot}</p>
                <div class="overlay__book-info__data">
                    <p class="book-info__data__txt">Audience: <span id="book-info__data__audience">${book.audience}</span></p>
                    <p class="book-info__data__txt">First published: <span id="book-info__data__published">${book.year}</span></p>
                    <p class="book-info__data__txt">Pages: <span id="book-info__data__pages">${book.pages}</span></p>
                    <p class="book-info__data__txt">Publisher: <span id="book-info__data__publisher">${book.publisher}</span></p>
                </div>
                <button>Read it</button>
            </div>
        </div>
        `;
    });
    overlayOpen();
    overlayClose();
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
