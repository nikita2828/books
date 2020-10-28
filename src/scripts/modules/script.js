import {templateBook} from './templateBook';
const myUrl = "http://localhost:2828/posts";
let addBookBtn = document.querySelector(".add_book_btn");
let cancelBtn = document.querySelector(".cancel_btn");
let modalWindow = document.querySelector(".modal_window_background");
let sectionForBooks = document.querySelector(".section_books");

addBookBtn.addEventListener("click", () => {
modalWindow.style.display = "block";
});

cancelBtn.addEventListener("click", () => {
    modalWindow.style.display = "none";
    });
    window.addEventListener("click", (e) => {
        if(e.target === modalWindow){
            modalWindow.style.display = "none";
        }
    });

    function getBooks(){
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

                sectionForBooks.appendChild(book);
            });
        });
    }
    getBooks();