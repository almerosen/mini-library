import { Book } from "./interface"

const baseURL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books"

// let books: Book[] = []

const main: HTMLElement = document.querySelector("main")
const overlay: HTMLElement = document.querySelector(".overlay")
const bookInfoWrapper: HTMLElement = document.querySelector(".bookInfoWrapper")
const closeButton: HTMLButtonElement = document.querySelector(".overlay-close")
const inputField: HTMLInputElement = document.querySelector("#search__input")
const searchButton: HTMLButtonElement = document.querySelector("#search__submit")
const readMoreButton: HTMLButtonElement = document.querySelector(".readMoreButton")




// Function to create books on index page
function createBooks(obj: Book): void {
    const productPanel: HTMLDivElement = document.createElement("div")
    productPanel.classList.add("productPanel")
    main.append(productPanel)

    const bookCover: HTMLDivElement = document.createElement("div")
    bookCover.classList.add("bookCover")
    bookCover.style.backgroundColor = obj.color
    productPanel.append(bookCover)

    const border = document.createElement("div")
    border.classList.add("border")
    bookCover.append(border)

    const bookTitle: HTMLHeadingElement = document.createElement("h3")
    bookTitle.classList.add("bookTitle")
    bookTitle.innerHTML = obj.title
    bookCover.append(bookTitle)

    const bookAuthor: HTMLParagraphElement = document.createElement("p")
    bookAuthor.classList.add("bookAuthor")
    bookAuthor.innerText = obj.author
    bookCover.append(bookAuthor)  

    const productPanelTextWrapper: HTMLDivElement = document.createElement("div")
    productPanelTextWrapper.classList.add("product-panel-text-wrapper")
    productPanel.append(productPanelTextWrapper)

    const productPanelTitle: HTMLHeadingElement = document.createElement("h3")
    productPanelTitle.classList.add("productPanel-title")
    productPanelTitle.innerHTML = obj.title
    productPanelTextWrapper.append(productPanelTitle)

    const productPanelAuthor: HTMLParagraphElement = document.createElement("p")
    productPanelAuthor.classList.add("productPanel-author")
    productPanelAuthor.innerHTML = obj.author
    productPanelTextWrapper.append(productPanelAuthor)
    
    const readMoreButton: HTMLButtonElement = document.createElement("button")
    readMoreButton.classList.add("readMoreButton")
    readMoreButton.innerHTML = "Read more"
    productPanel.append(readMoreButton)
}

// Function to create a single book with info...
function createBookInfo(obj: Book): void {
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


// Fetch and display all the books on index page:
async function getBooks(): Promise<void> {
    try {
        const response = await fetch(baseURL)
        if (!response.ok) {
            throw new Error(`Failed fetch data with status ${response.status}`)
        }

        const books: Book[] = await response.json()
        console.log(books)

        books.forEach((book) => {
            createBooks(book)
        })
        
        clickOnBook()
        clickOnReadMoreButton()
       
    } catch(error) {
        console.error(error)
        }   
}
getBooks()


// Function to get a single book
async function getBook(index: number): Promise<void> {
    try {
        const response = await fetch(baseURL)
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }

        const books: Book[] = await response.json()
        const book: Book = books[index]
        console.log(book)

        createBookInfo(book)

    } catch(error) {
        console.error("Error fetching data", error)
    }
}



// Show overlay 'page'
const overlayOpen = (): void => {
    overlay.classList.toggle("hidden")
}
// Hide overlay 
const overlayClose = (): void => {
    closeButton.addEventListener('click', () => {
        overlay.classList.toggle("hidden")
        
    })
}
// Click on book function 
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

function clickOnReadMoreButton(): void {
    let buttons = document.querySelectorAll(".readMoreButton")

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            getBook(index)
            overlayOpen()
        })
    })
}


// Function for filter book by title
function filterBooksBySearch(books: Book[], inputField: HTMLInputElement): void {
    const inputVal: string = inputField.value
    const filteredBooks: Book[] = books.filter((book) => {
        return book.title.toLowerCase().includes(inputVal.toLowerCase())
    })
    console.log(filteredBooks)
    filteredBooks.forEach((book) => {
        console.log(book)
        createBookInfo(book)
        overlayOpen()
    })
}


// Function for fetch books and then filter books by title name
async function searchBook(): Promise<void> {
    try {
        const response = await fetch(baseURL)
        if (!response.ok) {
            throw new Error (`Request failed with status ${response.status}`)
        } 
        const books: Book[] = await response.json()
        console.log(books)

        filterBooksBySearch(books, inputField)

        // let filteredBooks: Book[] = books.filter((book) => {
        //     return book.title.toLowerCase().includes(inputVal)
        // })
        // console.log(filteredBooks)
        // filteredBooks.forEach((book) => {
        //     console.log(book)
        //     createBookInfo(book)
        //     overlayOpen()
        // }) 

        
        // books.forEach((book, index) => {
        //     if (book.title.toLowerCase().includes(inputVal)) {
        //         getBook(index)
        //         overlayOpen()
        //     }
        // })  
    } catch(error) {
        console.error("Error fetching data:", error)
    }
}

// Search book on key press "enter"
inputField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        searchBook()
    }
})
// Search when clicking button in input field
searchButton.addEventListener('click', () => {
    searchBook()
})


