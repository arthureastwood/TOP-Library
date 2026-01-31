// DOM Elements
const form = document.querySelector('#book-creator');
const newBookBtn = document.querySelector('#new-book-button');
const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('#close-button');
const addBookBtn = document.querySelector('#add-book-button');
const cardContainer = document.querySelector('#card-container');
const authorFirstName = document.querySelector('#author-first-name');
const authorLastName = document.querySelector('#author-last-name');
const title = document.querySelector('#title-input');
const bookPages = document.querySelector('#pages-input');
const authorFirstNameSpan = document.querySelector('#author-first-name-span');
const authorLastNameSpan = document.querySelector('#author-last-name-span');
const bookTitleSpan = document.querySelector('#book-title-span');
const toggleIfReadBtns = document.querySelectorAll('.card button:first-of-type');
const removeBkBtns = document.querySelectorAll('.card button:last-of-type');
const bkCards = document.querySelectorAll('.card');

// The library which is an array
const myLibrary = [];
let book;



// Constructor function for creating books
function Book(authorFirstName, authorLastName, title, pages, genre, ifRead){
    if(!new.target){
        throw Error("Use new as an operator to create objects using the constructor function");
    }
    this.author = `${authorFirstName} ${authorLastName}`;
    this.authorFirstName = authorFirstName;
    this.authorLastName = authorLastName;
    this.title = title;
    this.pages = pages;
    this.genre = genre;
    this.id = crypto.randomUUID();
    this.ifRead = ifRead;
}

// Method to add books to the library
Book.prototype.addBookToLibrary = function(){
    book = `${this.author} wrote ${this.title} that is ${this.pages} pages and is of the ${this.genre} genre.`;
    console.log(book);
    
    console.log(myLibrary);
    return book;
};

// Function to loop through the library and render books on the page
function renderLibrary(myLibrary){
    myLibrary.forEach((book) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.id = `id-${book.id}`;

        const authorDiv = document.createElement('div');
        authorDiv.classList.add('card-child');
        const authorLabel = document.createElement('h3');
        authorLabel.textContent = `Author:`;
        const authorValue = document.createElement('span');
        authorValue.textContent = `${book.author}`;
        authorDiv.appendChild(authorLabel);
        authorDiv.appendChild(authorValue);
        cardDiv.appendChild(authorDiv);

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('card-child');
        const titleLabel = document.createElement('h3');
        titleLabel.textContent = 'Title:';
        const titleValue = document.createElement('span');
        titleValue.textContent = `${book.title}`;
        titleDiv.appendChild(titleLabel);
        titleDiv.appendChild(titleValue);
        cardDiv.appendChild(titleDiv);

        const pagesDiv = document.createElement('div');
        pagesDiv.classList.add('card-child');
        const pagesLabel = document.createElement('h3');
        pagesLabel.textContent = 'Pages:';
        const pagesValue = document.createElement('span');
        pagesValue.textContent = `${book.pages}`;
        pagesDiv.appendChild(pagesLabel);
        pagesDiv.appendChild(pagesValue);
        cardDiv.appendChild(pagesDiv);

        const ifReadDiv = document.createElement('div');
        ifReadDiv.classList.add('card-child');
        const ifReadLabel = document.createElement('h3');
        ifReadLabel.textContent = 'Read this book?';
        const ifReadValue = document.createElement('span');
        ifReadValue.textContent = `${book.ifRead}`;
        ifReadDiv.appendChild(ifReadLabel);
        ifReadDiv.appendChild(ifReadValue);
        cardDiv.appendChild(ifReadDiv);

        const changeReadStatusBtn = document.createElement('button');
        changeReadStatusBtn.setAttribute('type', 'button');
        changeReadStatusBtn.classList.add(`id-${book.id}`);
        changeReadStatusBtn.textContent = 'Change read status';
        changeReadStatusBtn.addEventListener('click', changeReadStatus);
        cardDiv.appendChild(changeReadStatusBtn);

        const deleteBookBtn = document.createElement('button');
        deleteBookBtn.setAttribute('type', 'button');
        deleteBookBtn.classList.add(`id-${book.id}`);
        deleteBookBtn.textContent = 'Delete book';
        deleteBookBtn.addEventListener('click', deleteBook);
        cardDiv.appendChild(deleteBookBtn);
    });
}

// Function to change read status of books in the shelves(cards)
function changeReadStatus(book){
    
}

// Function to delete books from the shelves(cards)
function deleteBook(book){

}

// Function to display the modal for creating books
newBookBtn.addEventListener('click', () => {
    modal.showModal();
});




const bookOne = new Book("Arthur", "Welcome to Jam Rock", 560, "Fantasy");
bookOne.addBookToLibrary();
const bookTwo = new Book("Kite", "Fury in Hell", 405, "Action");
bookTwo.addBookToLibrary();
myLibrary.push(bookOne);
myLibrary.push(bookTwo);
const bookThree = new Book('Victoria', 'Goes in a dilemma', 603, 'Beauty');
bookThree.addBookToLibrary();
myLibrary.push(bookThree);

document.addEventListener('DOMContentLoaded', function(){
    const footerYear = new Date().getFullYear();
    document.getElementById('footerYear').innerHTML = footerYear;
});