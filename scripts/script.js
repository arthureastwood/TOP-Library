// DOM Elements
const form = document.getElementById('book-creator');
const newBookBtn = document.getElementById('new-book-button');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close-button');
const cardContainer = document.getElementById('card-container');

// Class for creating books
class Book {
    constructor(authorFirstName, authorLastName, title, bookPages, genre, isRead = false){
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
    toggleRead(){
        this.isRead = !this.isRead;
    }
}

// Library class to manage books
class Library {
    constructor() {
        this.books = [];
        this.addSampleBooks();
    }

    addSampleBooks() {
        this.books.push(new Book('J.K.', 'Rowling', 'Harry Potter and the Sorcerer\'s Stone', 309, 'Fantasy', true));
        this.books.push(new Book('George', 'Orwell', '1984', 328, 'Dystopian', false));
        this.books.push(new Book('Harper', 'Lee', 'To Kill a Mockingbird', 324, 'Fiction', true));
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(id) {
        const index = this.books.findIndex(b => b.id === id);
        if (index > -1) {
            this.books.splice(index, 1);
        }
    }

    toggleReadStatus(id) {
        const book = this.books.find(b => b.id === id);
        if (book) {
            book.toggleRead();
        }
    }

    render() {
        // Clear the container first
        cardContainer.innerHTML = '';
        
        for (let bookData of this.books) {
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
            changeReadStatusBtn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                this.toggleReadStatus(id);
                this.render();
            });
            buttonContainer.appendChild(changeReadStatusBtn);

            let deleteBookBtn = document.createElement('button');
            deleteBookBtn.setAttribute('type', 'button');
            deleteBookBtn.setAttribute('data-id', bookData.id);
            deleteBookBtn.classList.add('delete-book-btn');
            deleteBookBtn.textContent = 'Delete Book';
            deleteBookBtn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                this.removeBook(id);
                this.render();
            });
            buttonContainer.appendChild(deleteBookBtn);

            cardDiv.appendChild(buttonContainer);
        }
    }
}

// Create library instance
const library = new Library();


// Function to add books to the library
function addBookToLibrary() {
    const authorFirstName = document.getElementById('author-first-name').value;
    const authorLastName = document.getElementById('author-last-name').value;
    const title = document.getElementById('title-input').value;
    const bookPages = document.getElementById('pages-input').value;
    const genre = document.getElementById('genre-input').value;
    const isRead = document.getElementById('if-read-yes').checked;

    const newBook = new Book(authorFirstName, authorLastName, title, bookPages, genre, isRead);
    library.addBook(newBook);
    library.render();

    // Reset form and close modal
    form.reset();
    modal.close();
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

// Set footer year
const footerYear = new Date().getFullYear();
document.getElementById('footerYear').innerHTML = footerYear;

// Render initial library on page load
library.render();