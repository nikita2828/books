import {templateBook} from './templateBook';
const myUrl = "http://localhost:2828/posts";
let addBookBtn = document.querySelector(".add_book_btn");
let cancelBtn = document.querySelector(".cancel_btn");
let modalWindow = document.querySelector(".modal_window_background");
let sectionForBooks = document.querySelector(".section_books");

let modalWindowName = document.querySelector("#name");
let modalWindowAuthor = document.querySelector("#author");
let modalWindowPages = document.querySelector("#pages");
let modalWindowSize = document.querySelector("#size");
let modalWindowQuality = document.querySelector("#quality");
let modalWindowLanguage = document.querySelector("#language");
let modalWindowYear = document.querySelector("#year");
let modalWindowImg = document.querySelector("#img");
let modalWindowDescription = document.querySelector("#modal_window_description");
let createBtn = document.querySelector(".create_btn");
let editBtn = document.querySelector(".edit_btn");

addBookBtn.addEventListener("click", () => {
modalWindow.style.display = "block";
});

cancelBtn.addEventListener("click", () => closeModal());

window.addEventListener("click", (e) => {
        if(e.target === modalWindow){
            closeModal();
        }
    });

const closeModal = () => {
    modalWindow.style.display = "none";
};

//GET REQUEST
    function getBooks(){
        sectionForBooks.innerHTML = "";
        fetch(myUrl)
        .then(response => response.json())
        .then(books => {
            books.forEach(oneBook => {
                const book = document.createElement("div");
                book.classList.add("section_for_one_book");
                book.innerHTML = templateBook;

                let bookImg = book.querySelector(".img_item");
                let bookName = book.querySelector(".name_item");
                let bookAuthor = book.querySelector(".author_item");
                let bookPages = book.querySelector(".pages_item");
                let bookSize = book.querySelector(".size_item");
                let bookQuality = book.querySelector(".quality_item");
                let bookLanguage = book.querySelector(".language_item");
                let bookYear = book.querySelector(".year_item");
                let bookDescription = book.querySelector(".description_item");

                bookImg.setAttribute("src", oneBook.imgNode);
                bookName.innerHTML = `<b>Название: </b> ${oneBook.nameNode}`;
                bookAuthor.innerHTML = `<b>Автор: </b>${oneBook.authorNode}`;
                bookPages.innerHTML = `<b>Количество страниц: </b>${oneBook.pagesNode}`;
                bookSize.innerHTML = `<b>Размер: </b>${oneBook.sizeNode}`;
                bookQuality.innerHTML = `<b>Качество: </b>${oneBook.qualityNode}`;
                bookLanguage.innerHTML = `<b>Язык: </b>${oneBook.languageNode}`;
                bookYear.innerHTML = `<b>Год: </b>${oneBook.yearNode}`;
                bookDescription.innerHTML = `<b>Описание: </b>${oneBook.descriptionNode}`;

                let changeBtn = book.querySelector(".change");
                changeBtn.addEventListener("click", () => changeBook(oneBook));

                let deleteBtn = book.querySelector(".delete");
                deleteBtn.addEventListener("click", () => deleteBook(oneBook.id));

                sectionForBooks.appendChild(book);
            });
        });
    }
    getBooks();

//POST REQUEST
    createBtn.addEventListener("click", () => {
        let post = {
            imgNode: modalWindowImg.value,
            nameNode: modalWindowName.value,
            authotNode: modalWindowAuthor.value,
            pagesNode: +modalWindowPages.value,
            sizeNode: modalWindowSize.value,
            qualityNode: modalWindowQuality.value,
            languageNode: modalWindowLanguage.value,
            yearNode: +modalWindowYear.value,
            descriptionNode: modalWindowDescription.value
        };
        fetch(myUrl, {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                        'Content-Type': 'application/json',
                     }
        })
        .then(closeModal)
        .then(getBooks);
    });

//DELETE REQUEST
     function deleteBook(id){
        fetch(`${myUrl}/${id}`, {
            method: "DELETE"
        })
        .then(getBooks);
     }

//CHANGE REQUEST
    function changeBook(oneBook){
        modalWindow.style.display = "block";
        createBtn.style.display = "none";
        editBtn.style.display = "block";
        
        modalWindowName.value = oneBook.nameNode;
        modalWindowAuthor.value = oneBook.authorNode;
        modalWindowPages.value = oneBook.pagesNode;
        modalWindowSize.value = oneBook.sizeNode;
        modalWindowQuality.value = oneBook.qualityNode;
        modalWindowLanguage.value = oneBook.languageNode;
        modalWindowYear.value = oneBook.yearNode;
        modalWindowImg.value = oneBook.imgNode;
        modalWindowDescription.value = oneBook.descriptionNode;

        editBtn.addEventListener("click", () => put(oneBook.id));
};

function put(id){
    let post = {
        imgNode: modalWindowImg.value,
        nameNode: modalWindowName.value,
        authotNode: modalWindowAuthor.value,
        pagesNode: +modalWindowPages.value,
        sizeNode: modalWindowSize.value,
        qualityNode: modalWindowQuality.value,
        languageNode: modalWindowLanguage.value,
        yearNode: +modalWindowYear.value,
        descriptionNode: modalWindowDescription.value
    };
    fetch(`${myUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: {
                    'Content-Type': 'application/json',
                 }
    })
    .then(closeModal)
    .then(getBooks);
};






