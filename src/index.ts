import { Book } from "./interface"

const baseURL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books"

let books: Book[] = []

const main: HTMLElement = document.querySelector("main")
const overlay: HTMLElement = document.querySelector(".overlay")
const bookInfoWrapper: HTMLElement = document.querySelector(".bookInfoWrapper")
const closeButton: HTMLButtonElement = document.querySelector(".overlay-close")
const inputField: HTMLInputElement = document.querySelector("#search__input")





function createBooks(obj: {color: string, title: string, author: string }): void {
    const bookCover = document.createElement("div")
    bookCover.classList.add("bookCover")
    bookCover.style.backgroundColor = obj.color
    main.append(bookCover)

    const bookTitle = document.createElement("h3")
    bookTitle.classList.add("bookTitle")
    bookTitle.innerHTML = obj.title
    bookCover.append(bookTitle)

    const bookAuthor = document.createElement("p")
    bookAuthor.classList.add("bookAuthor")
    bookAuthor.innerText = obj.author
    bookCover.append(bookAuthor)   
}


function createBookInfo(obj: {color: string, title: string, author: string, plot: string, audience: string, year: string, pages: string, publisher: string}): void {
    const overlayBookCover = document.querySelector(".overlay__book-cover") as HTMLElement
    overlayBookCover.style.backgroundColor = obj.color
    const overlayBookTitle = document.querySelector(".overlay__book-title") as HTMLElement
    overlayBookTitle.innerHTML = obj.title
    const overlayAuthor = document.querySelector(".overlay__author") as HTMLElement
    overlayAuthor.innerHTML = obj.author

    const bookInfoTitle = document.querySelector(".overlay__book-info__title") as HTMLElement
    bookInfoTitle.innerHTML = obj.title
    const bookInfoAuthor = document.querySelector(".overlay__book-info__author") as HTMLElement
    bookInfoAuthor.innerHTML = obj.author

    const bookInfoPlot = document.querySelector(".overlay__book-info__summary") as HTMLElement
    bookInfoPlot.innerHTML = obj.plot

    const bookInfoAudience = document.querySelector("#book-info__data__audience") as HTMLElement
    bookInfoAudience.innerHTML = obj.audience 

    const bookInfoPublished = document.querySelector("#book-info__data__published") as HTMLElement
    bookInfoPublished.innerHTML = obj.year

    const bookInfoPages = document.querySelector("#book-info__data__pages") as HTMLElement
    bookInfoPages.innerHTML = obj.pages

    const bookInfoPublisher = document.querySelector("#book-info__data__publisher") as HTMLElement
    bookInfoPublisher.innerHTML = obj.publisher

}


// Display all the books on index page:
async function getBooks() {
    try {
        const response = await fetch(baseURL)
        if (response.status === 200) {
            const books: Book[] = await response.json()
            console.log(books)

            books.forEach((book) => {
                createBooks(book)
            })
        
            clickOnBook()

        } else {
            throw Error("Response failed")
        }
    } catch(error) {
        console.error(error)
        }   
}
getBooks()


// Function for creating a single book with info
async function getBook(index: number) {

    const response = await fetch(baseURL)
    const books: Book[] = await response.json()
    const book: Book = books[index]
    console.log(book)

    createBookInfo(book)
}




const overlayOpen = (): void => {
    overlay.classList.toggle("hidden")
}

const overlayClose = (): void => {
    closeButton.addEventListener('click', () => {
        overlay.classList.toggle("hidden")
    })
}


function clickOnBook(): void {
    let bookCovers: NodeListOf<Element> = document.querySelectorAll(".bookCover")

    bookCovers.forEach((book, index) => {
        book.addEventListener('click', () => {
            getBook(index)
            overlayOpen()
        })
    })
    overlayClose()
}





function searchBook() {
    const inputVal = inputField.value
    console.log(inputVal)

}


inputField.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchBook()
    }
})


