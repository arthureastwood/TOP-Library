// DOM Elements
const form = document.getElementById('book-creator');
const newBookBtn = document.getElementById('new-book-button');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close-button');
const addBookBtn = document.getElementById('add-book-button');
const cardContainer = document.getElementById('card-container');
const authorFirstName = document.getElementById('author-first-name');
const authorLastName = document.getElementById('author-last-name');
const title = document.getElementById('title-input');
const bookPages = document.getElementById('pages-input');
const genre = document.getElementById('genre-input');
const authorFirstNameSpan = document.getElementById('author-first-name-span');
const authorLastNameSpan = document.getElementById('author-last-name-span');
const bookTitleSpan = document.getElementById('book-title-span');
const bookGenreSpan = document.getElementById('book-genre-span');
const toggleIfReadBtns = document.querySelectorAll('.card button:first-of-type');
const removeBkBtns = document.querySelectorAll('.card button:last-of-type');
const bkCards = document.querySelectorAll('.card');

// The library which is an array
const myLibrary = [];

// Constructor function for creating books
function Book(authorFirstName, authorLastName, title, bookPages, genre, toggleIfReadBtns){
    if(!new.target){
        throw Error("Use new as an operator to create objects using the constructor function");
    }
    this.author = `${authorFirstName} ${authorLastName}`;
    this.authorFirstName = authorFirstName;
    this.authorLastName = authorLastName;
    this.title = title;
    this.bookPages = parseInt(bookPages);
    this.genre = genre;
    this.id = crypto.randomUUID();
    this.toggleIfReadBtns = toggleIfReadBtns;
}

// Function to add books to the library
Book.prototype.addBookToLibrary = function(){
    authorFirstName = authorFirstName.value;
    authorLastName = authorLastName.value;
    author = `${authorFirstName} ${authorLastName}`;
    title = title.value;
    bookPages = bookPages.value;
    genre = genre.value;
    toggleIfReadBtns = toggleIfReadBtns.value;
    let book = `${this.author} ${this.title} ${this.bookPages} ${this.genre} ${this.toggleIfReadBtns}`;
    addBookBtn.addEventListener('submit', function(){
        myLibrary.push(book);
    });
    renderLibrary();
};

// Function to loop through the library and render books on the page
function renderLibrary(myLibrary){
    myLibrary.forEach((book) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.id = `id: ${book.id}`;
        cardContainer.appendChild(cardDiv);

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

        const genreDiv = document.createElement('div');
        genreDiv.classList.add('card-child');
        const genreLabel = document.createElement('h3');
        genreLabel.textContent = 'Genre:';
        const genreValue = document.createElement('span');
        genreValue.textContent = `${book.genre}`;
        genreDiv.appendChild(genreLabel);
        genreDiv.appendChild(genreValue);
        cardDiv.appendChild(genreDiv);

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

// Event listeners
newBookBtn.addEventListener('click', () => {
    modal.showModal();
});

// Function to close the dialog
closeBtn.addEventListener('click', () => {
    modal.close();
 });



document.addEventListener('DOMContentLoaded', function(){
    const footerYear = new Date().getFullYear();
    document.getElementById('footerYear').innerHTML = footerYear;
});