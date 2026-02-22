// DOM Elements
const form = document.getElementById('book-creator');
const newBookBtn = document.getElementById('new-book-button');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close-button');
const cardContainer = document.getElementById('card-container');

// The library which is an array
const myLibrary = [];

// Constructor function for creating books
function Book(authorFirstName, authorLastName, title, bookPages, genre, isRead = false) {
    if (!new.target) {
        throw Error("Use new as an operator to create objects using the constructor function");
    }
    this.authorFirstName = authorFirstName;
    this.authorLastName = authorLastName;
    this.title = title;
    this.bookPages = parseInt(bookPages);
    this.genre = genre;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

// Method to change read status
Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
};

// Add sample books to the library for testing
myLibrary.push(new Book('J.K.', 'Rowling', 'Harry Potter and the Sorcerer\'s Stone', 309, 'Fantasy', true));
myLibrary.push(new Book('George', 'Orwell', '1984', 328, 'Dystopian', false));
myLibrary.push(new Book('Harper', 'Lee', 'To Kill a Mockingbird', 324, 'Fiction', true));

// Function to loop through the library and render books on the page
function renderLibrary(array = myLibrary) {
    // Clear the container first
    cardContainer.innerHTML = '';
    
    for (let i = 0; i < array.length; i++) {
        let bookData = array[i];
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.setAttribute('data-id', bookData.id);
        cardContainer.appendChild(cardDiv);

        let authorDiv = document.createElement('div');
        authorDiv.classList.add('card-child-div');
        let authorLabel = document.createElement('h3');
        authorLabel.textContent = `Author: `;
        let authorValue = document.createElement('span');
        authorValue.textContent = `${bookData.authorFirstName} ${bookData.authorLastName}`;
        authorDiv.appendChild(authorLabel);
        authorDiv.appendChild(authorValue);
        cardDiv.appendChild(authorDiv);

        let titleDiv = document.createElement('div');
        titleDiv.classList.add('card-child-div');
        let titleLabel = document.createElement('h3');
        titleLabel.textContent = 'Title: ';
        let titleValue = document.createElement('span');
        titleValue.textContent = `${bookData.title}`;
        titleDiv.appendChild(titleLabel);
        titleDiv.appendChild(titleValue);
        cardDiv.appendChild(titleDiv);

        let pagesDiv = document.createElement('div');
        pagesDiv.classList.add('card-child-div');
        let pagesLabel = document.createElement('h3');
        pagesLabel.textContent = 'Pages: ';
        let pagesValue = document.createElement('span');
        pagesValue.textContent = `${bookData.bookPages}`;
        pagesDiv.appendChild(pagesLabel);
        pagesDiv.appendChild(pagesValue);
        cardDiv.appendChild(pagesDiv);

        let genreDiv = document.createElement('div');
        genreDiv.classList.add('card-child-div');
        let genreLabel = document.createElement('h3');
        genreLabel.textContent = 'Genre: ';
        let genreValue = document.createElement('span');
        genreValue.textContent = `${bookData.genre}`;
        genreDiv.appendChild(genreLabel);
        genreDiv.appendChild(genreValue);
        cardDiv.appendChild(genreDiv);

        let ifReadDiv = document.createElement('div');
        ifReadDiv.classList.add('card-child-div');
        let ifReadLabel = document.createElement('h3');
        ifReadLabel.textContent = 'Read: ';
        let ifReadValue = document.createElement('span');
        ifReadValue.textContent = bookData.isRead ? 'Yes' : 'No';
        ifReadDiv.appendChild(ifReadLabel);
        ifReadDiv.appendChild(ifReadValue);
        cardDiv.appendChild(ifReadDiv);

        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        let changeReadStatusBtn = document.createElement('button');
        changeReadStatusBtn.setAttribute('type', 'button');
        changeReadStatusBtn.setAttribute('data-id', bookData.id);
        changeReadStatusBtn.classList.add('toggle-read-btn');
        changeReadStatusBtn.textContent = 'Toggle Read Status';
        changeReadStatusBtn.addEventListener('click', changeReadStatus);
        buttonContainer.appendChild(changeReadStatusBtn);

        let deleteBookBtn = document.createElement('button');
        deleteBookBtn.setAttribute('type', 'button');
        deleteBookBtn.setAttribute('data-id', bookData.id);
        deleteBookBtn.classList.add('delete-book-btn');
        deleteBookBtn.textContent = 'Delete Book';
        deleteBookBtn.addEventListener('click', deleteBook);
        buttonContainer.appendChild(deleteBookBtn);

        cardDiv.appendChild(buttonContainer);
    }
}

// Function to add books to the library
function addBookToLibrary() {
    const authorFirstName = document.getElementById('author-first-name').value;
    const authorLastName = document.getElementById('author-last-name').value;
    const title = document.getElementById('title-input').value;
    const bookPages = document.getElementById('pages-input').value;
    const genre = document.getElementById('genre-input').value;
    const isRead = document.getElementById('if-read-yes').checked;
    
    const newBook = new Book(authorFirstName, authorLastName, title, bookPages, genre, isRead);
    myLibrary.push(newBook);
    renderLibrary();
    
    // Reset form and close modal
    form.reset();
    modal.close();
}

// Function to change read status of books in the shelves(cards)
function changeReadStatus(event) {
    const bookId = event.target.getAttribute('data-id');
    const book = myLibrary.find(b => b.id === bookId);
    if (book) {
        book.toggleRead();
        renderLibrary();
    }
}

// Function to delete books from the shelves(cards)
function deleteBook(event) {
    const bookId = event.target.getAttribute('data-id');
    const bookIndex = myLibrary.findIndex(b => b.id === bookId);
    if (bookIndex > -1) {
        myLibrary.splice(bookIndex, 1);
        renderLibrary();
    }
}

// Event listeners
newBookBtn.addEventListener('click', () => {
    modal.showModal();
});

// Function to close the dialog
closeBtn.addEventListener('click', () => {
    modal.close();
    form.reset();
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    addBookToLibrary();
});

document.addEventListener('DOMContentLoaded', function() {
    const footerYear = new Date().getFullYear();
    document.getElementById('footerYear').innerHTML = footerYear;
    // Render initial library on page load
    renderLibrary();
});