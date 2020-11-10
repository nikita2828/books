import { templateBook } from "./templateBook";
import { routes } from "../constants/routes";
const myUrlAuthors = "http://localhost:2828/authors";
const myUrlCategory = "http://localhost:2828/categories";
const myUrlBooks = "http://localhost:2828/books";
let addBookBtn = document.querySelector(".add_book_btn");
let cancelBtn = document.querySelector(".cancel_btn");
let modalWindow = document.querySelector(".modal_window_background");
let sectionForBooks = document.querySelector(".section_books");
let search = document.querySelector(".search");

let modalWindowName = document.querySelector("#modal_input_name");
let modalWindowAuthor = document.querySelector("#modal_select_author");
let modalWindowCategory = document.querySelector("#modal_select_category");
let modalWindowPages = document.querySelector("#modal_input_pages");
let modalWindowSize = document.querySelector("#modal_input_size");
let modalWindowQuality = document.querySelector("#modal_input_quality");
let modalWindowLanguage = document.querySelector("#modal_input_language");
let modalWindowYear = document.querySelector("#modal_input_year");
let modalWindowImg = document.querySelector("#modal_input_img");
let modalWindowDescription = document.querySelector(
  "#modal_window_description"
);

let createBtn = document.querySelector(".create_btn");
let editBtn = document.querySelector(".edit_btn");
let modalWindowItems = document.querySelectorAll(".modal_window_items");
let listOfFieldsCreateBook = [
  modalWindowName,
  modalWindowAuthor,
  modalWindowCategory,
  modalWindowPages,
  modalWindowSize,
  modalWindowQuality,
  modalWindowLanguage,
  modalWindowYear,
  modalWindowImg,
];
let listForPostRequest = [
  modalWindowName,
  modalWindowAuthor,
  modalWindowCategory,
  modalWindowDescription,
  modalWindowImg,
];

let bookId = null;

addBookBtn.addEventListener("click", () => {
  modalWindow.style.display = "block";
  createBtn.style.display = "block";
  editBtn.style.display = "none";
});

cancelBtn.addEventListener("click", () => closeModal());

window.addEventListener("click", (e) => {
  if (e.target === modalWindow) {
    closeModal();
  }
});

const closeModal = () => {
  modalWindow.style.display = "none";
  modalWindowItems.forEach((item) => {
    item.value = "";
    item.style.outline = "";
    item.nextElementSibling.style.display = "none";
  });
};

//GET REQUEST
function getBooks(myUrl) {
  myUrl.forEach((oneBook) => {
    const book = document.createElement("div");
    book.classList.add("section_for_one_book");
    book.innerHTML = templateBook;

    let bookImg = book.querySelector(".img_item");
    let bookName = book.querySelector(".name_item");
    let bookAuthor = book.querySelector(".author_item");
    let bookCategory = book.querySelector(".category_item");
    let bookPages = book.querySelector(".pages_item");
    let bookSize = book.querySelector(".size_item");
    let bookQuality = book.querySelector(".quality_item");
    let bookLanguage = book.querySelector(".language_item");
    let bookYear = book.querySelector(".year_item");
    let bookDescription = book.querySelector(".description_item");

    bookImg.setAttribute("src", oneBook.imgData);
    bookName.innerHTML = `<b>Название: </b> ${oneBook.nameData}`;
    bookAuthor.innerHTML = `<b>Автор: </b>${oneBook.authorData}`;
    bookCategory.innerHTML = `<b>Категрия: </b>${oneBook.categoryData}`;
    bookPages.innerHTML = `<b>Количество страниц: </b>${oneBook.pagesData}`;
    bookSize.innerHTML = `<b>Размер: </b>${oneBook.sizeData}`;
    bookQuality.innerHTML = `<b>Качество: </b>${oneBook.qualityData}`;
    bookLanguage.innerHTML = `<b>Язык: </b>${oneBook.languageData}`;
    bookYear.innerHTML = `<b>Год: </b>${oneBook.yearData}`;
    bookDescription.innerHTML = `<b>Описание: </b>${oneBook.descriptionData}`;

    if (!oneBook.pagesData) {
      bookPages.remove();
    }
    if (!oneBook.sizeData) {
      bookSize.remove();
    }
    if (!oneBook.qualityData) {
      bookQuality.remove();
    }
    if (!oneBook.languageData) {
      bookLanguage.remove();
    }
    if (!oneBook.yearData) {
      bookYear.remove();
    }

    let changeBtn = book.querySelector(".change");
    changeBtn.addEventListener("click", () => changeBook(oneBook));

    let deleteBtn = book.querySelector(".delete");
    deleteBtn.addEventListener("click", () => deleteBook(oneBook.id));

    sectionForBooks.appendChild(book);
    console.log("---------------getRequest end");
  });
}

//POST REQUEST
function postBook() {
  let post = {
    imgData: modalWindowImg.value,
    nameData: modalWindowName.value,
    authorData: modalWindowAuthor.value,
    categoryData: modalWindowCategory.value,
    pagesData: +modalWindowPages.value,
    sizeData: modalWindowSize.value,
    qualityData: modalWindowQuality.value,
    languageData: modalWindowLanguage.value,
    yearData: +modalWindowYear.value,
    descriptionData: modalWindowDescription.value,
  };
  fetch(myUrlBooks, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(closeModal)
    .then(console.log("--------postBook"))
    .then(getEverything(location.pathname));
}

//DELETE REQUEST
function deleteBook(id) {
  fetch(`${myUrlBooks}/${id}`, {
    method: "DELETE",
  }).then(getEverything(location.pathname));
}

//CHANGE REQUEST
function changeBook(oneBook) {
  bookId = oneBook;
  modalWindow.style.display = "block";
  createBtn.style.display = "none";
  editBtn.style.display = "block";

  modalWindowName.value = oneBook.nameData;
  modalWindowAuthor.value = oneBook.authorData;
  modalWindowPages.value = oneBook.pagesData;
  modalWindowSize.value = oneBook.sizeData;
  modalWindowQuality.value = oneBook.qualityData;
  modalWindowLanguage.value = oneBook.languageData;

  modalWindowYear.value = oneBook.yearData;
  modalWindowImg.value = oneBook.imgData;
  modalWindowDescription.value = oneBook.descriptionData;
}

editBtn.addEventListener("click", () => put());

function put() {
  let id = bookId;
  let post = {
    imgData: modalWindowImg.value,
    nameData: modalWindowName.value,
    authorData: modalWindowAuthor.value,
    categoryData: modalWindowCategory.value,
    pagesData: +modalWindowPages.value,
    sizeData: modalWindowSize.value,
    qualityData: modalWindowQuality.value,
    languageData: modalWindowLanguage.value,
    yearData: +modalWindowYear.value,
    descriptionData: modalWindowDescription.value,
  };
  fetch(`${myUrlBooks}/${id.id}`, {
    method: "PUT",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(closeModal)
    .then(getEverything(location.pathname));
}

//VALIDATION

createBtn.addEventListener("click", () => {
  listOfFieldsCreateBook.forEach((items) => {
    if (!items.value) {
      items.style.outline = "1px solid yellow";
      items.nextElementSibling.style.display = "block";
    } else if (items.value) {
      items.style.outline = "1px solid green";
      items.nextElementSibling.style.display = "none";
    }
  });

  const isEmpty = listForPostRequest.every((input) => input.value);

  if (modalWindowDescription.value.length >= 10 && isEmpty) {
    console.log("-----validation");
    postBook();
  }
  if (modalWindowDescription.value.length < 10) {
    modalWindowDescription.style.outline = "1px solid yellow";

    modalWindowDescription.nextElementSibling.style.display = "block";
  } else {
    modalWindowDescription.style.outline = "1px solid green";

    modalWindowDescription.nextElementSibling.style.display = "none";
  }
});

modalWindowDescription.addEventListener("blur", () => {
  if (modalWindowDescription.value.length < 10) {
    modalWindowDescription.style.outline = "1px solid yellow";
    modalWindowDescription.nextElementSibling.style.display = "block";
  } else {
    modalWindowDescription.style.outline = "1px solid green";
    modalWindowDescription.nextElementSibling.style.display = "none";
  }
});

listOfFieldsCreateBook.forEach((el) => {
  el.addEventListener("blur", () => {
    if (!el.value) {
      el.style.outline = "1px solid yellow";
      el.nextElementSibling.style.display = "block";
    } else {
      el.style.outline = "1px solid green";
      el.nextElementSibling.style.display = "none";
    }
  });
});

//SEARCH
search.addEventListener("keyup", () => {
  let searchValue = search.value.toUpperCase();
  let sectionForOneBook = sectionForBooks.querySelectorAll(
    ".section_for_one_book"
  );

  for (let i = 0; i < sectionForOneBook.length; i++) {
    let name = sectionForOneBook[i].querySelectorAll(".name_item")[0];
    if (name.innerHTML.toUpperCase().indexOf(searchValue) > -1) {
      sectionForOneBook[i].style.display = "block";
    } else {
      sectionForOneBook[i].style.display = "none";
    }
  }
});

//GET REQUST FOR CATEGORY
function getCategorys() {
  fetch(myUrlCategory)
    .then((response) => response.json())
    .then((categorys) => {
      categorys.forEach((category) => {
        const selectForCategory = document.querySelector(".category_select");
        let optionForCategory = document.createElement("option");
        optionForCategory.innerText = `${category.nameCategory}`;
        selectForCategory.appendChild(optionForCategory);
      });
    });
}
getCategorys();

//GET REQUST FOR AUTHORS
function getAuthors() {
  fetch(myUrlAuthors)
    .then((response) => response.json())
    .then((authors) => {
      authors.forEach((author) => {
        const select = document.querySelector(".author_select");
        let option = document.createElement("option");
        option.innerText = `${author.nameAuthor}`;
        select.appendChild(option);
      });
    });
}
getAuthors();

//HISTORY API
const link = document.querySelectorAll(".a");
link.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    history.pushState(null, "", href);
    getEverything(href);
  });
});

window.addEventListener("popstate", () => {
  getEverything(location.pathname);
});

document.addEventListener("DOMContentLoaded", () => {
  getEverything(location.pathname);
});

const getEverything = (path) => {
  console.log("-----------getEverything");
  sectionForBooks.innerHTML = "";
  fetch(myUrlBooks)
    .then((response) => response.json())
    .then((books) => {
      if (path === routes.comp) {
        const booksComp = books.filter((book) => book.categoryData === "comp");
        getBooks(booksComp);
      } else if (path === routes.science) {
        const booksScience = books.filter(
          (book) => book.categoryData === "science"
        );
        getBooks(booksScience);
      } else if (path === routes.home) {
        const allBooks = books;
        getBooks(allBooks);
      } else {
        let h1 = document.createElement("h1");
        h1.innerText = "PAGE NOT FOUND 404";
        sectionForBooks.appendChild(h1);
        h1.style.color = "black";
      }
    });
};
