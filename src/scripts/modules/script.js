import { templateBook } from "./templateBook";
import { ROUTES } from "../constants/routes";
const myUrlAuthors = "http://localhost:2828/authors";
let addBookBtn = document.querySelector(".add_book_btn");
let cancelBtn = document.querySelector(".cancel_btn");
let modalWindow = document.querySelector(".modal_window_background");
let sectionForBooks = document.querySelector(".section_books");
let search = document.querySelector(".search");

let modalWindowName = document.querySelector("#name");
let modalWindowAuthor = document.querySelector("#author");
let modalWindowPages = document.querySelector("#pages");
let modalWindowSize = document.querySelector("#size");
let modalWindowQuality = document.querySelector("#quality");
let modalWindowLanguage = document.querySelector("#language");
let modalWindowYear = document.querySelector("#year");
let modalWindowImg = document.querySelector("#img");
let modalWindowDescription = document.querySelector(
  "#modal_window_description"
);

let createBtn = document.querySelector(".create_btn");
let editBtn = document.querySelector(".edit_btn");
let modalWindowItems = document.querySelectorAll(".modal_window_items");
let listOfFieldsCreateBook = [
  modalWindowName,
  modalWindowAuthor,
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
  sectionForBooks.innerHTML = "";
  fetch(myUrl)
    .then((response) => response.json())
    .then((books) => {
      books.forEach((oneBook) => {
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

        bookImg.setAttribute("src", oneBook.imgServer);
        bookName.innerHTML = `<b>Название: </b> ${oneBook.nameServer}`;
        bookAuthor.innerHTML = `<b>Автор: </b>${oneBook.authorServer}`;
        bookPages.innerHTML = `<b>Количество страниц: </b>${oneBook.pagesServer}`;
        bookSize.innerHTML = `<b>Размер: </b>${oneBook.sizeServer}`;
        bookQuality.innerHTML = `<b>Качество: </b>${oneBook.qualityServer}`;
        bookLanguage.innerHTML = `<b>Язык: </b>${oneBook.languageServer}`;
        bookYear.innerHTML = `<b>Год: </b>${oneBook.yearServer}`;
        bookDescription.innerHTML = `<b>Описание: </b>${oneBook.descriptionServer}`;

        if (!oneBook.pagesServer) {
          bookPages.remove();
        }
        if (!oneBook.sizeServer) {
          bookSize.remove();
        }
        if (!oneBook.qualityServer) {
          bookQuality.remove();
        }
        if (!oneBook.languageServer) {
          bookLanguage.remove();
        }
        if (!oneBook.yearServer) {
          bookYear.remove();
        }

        let changeBtn = book.querySelector(".change");
        changeBtn.addEventListener("click", () => changeBook(oneBook));

        let deleteBtn = book.querySelector(".delete");
        deleteBtn.addEventListener("click", () => deleteBook(oneBook.id));

        sectionForBooks.appendChild(book);
      });
    });
}
// getBooks();

//POST REQUEST
function postBook() {
  let post = {
    imgServer: modalWindowImg.value,
    nameServer: modalWindowName.value,
    authorServer: modalWindowAuthor.value,
    pagesServer: +modalWindowPages.value,
    sizeServer: modalWindowSize.value,
    qualityServer: modalWindowQuality.value,
    languageServer: modalWindowLanguage.value,
    yearServer: +modalWindowYear.value,
    descriptionServer: modalWindowDescription.value,
  };
  fetch(myUrl, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(closeModal)
    .then(getBooks);
}

//DELETE REQUEST
function deleteBook(id) {
  fetch(`${myUrl}/${id}`, {
    method: "DELETE",
  }).then(getBooks);
}

//CHANGE REQUEST
function changeBook(oneBook) {
  bookId = oneBook;
  modalWindow.style.display = "block";
  createBtn.style.display = "none";
  editBtn.style.display = "block";

  modalWindowName.value = oneBook.nameServer;
  modalWindowAuthor.value = oneBook.authorServer;
  modalWindowPages.value = oneBook.pagesServer;
  modalWindowSize.value = oneBook.sizeServer;
  modalWindowQuality.value = oneBook.qualityServer;
  modalWindowLanguage.value = oneBook.languageServer;

  modalWindowYear.value = oneBook.yearServer;
  modalWindowImg.value = oneBook.imgServer;
  modalWindowDescription.value = oneBook.descriptionServer;
}

editBtn.addEventListener("click", () => put());

function put() {
  let id = bookId;
  let post = {
    imgServer: modalWindowImg.value,
    nameServer: modalWindowName.value,
    authorServer: modalWindowAuthor.value,
    pagesServer: +modalWindowPages.value,
    sizeServer: modalWindowSize.value,
    qualityServer: modalWindowQuality.value,
    languageServer: modalWindowLanguage.value,
    yearServer: +modalWindowYear.value,
    descriptionServer: modalWindowDescription.value,
  };
  fetch(`${myUrl}/${id.id}`, {
    method: "PUT",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(closeModal)
    .then(getBooks);
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

  if (modalWindowDescription.value.length > 20 && isEmpty) {
    postBook();
  }
  if (modalWindowDescription.value.length < 20) {
    modalWindowDescription.style.outline = "1px solid yellow";

    modalWindowDescription.nextElementSibling.style.display = "block";
  } else {
    modalWindowDescription.style.outline = "1px solid green";

    modalWindowDescription.nextElementSibling.style.display = "none";
  }
});

modalWindowDescription.addEventListener("blur", () => {
  if (modalWindowDescription.value.length < 20) {
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

//GET REQUST FOR SELECT
function getAuthors() {
  fetch(myUrlAuthors)
    .then((response) => response.json())
    .then((authors) => {
      authors.forEach((author) => {
        const select = document.querySelector(".author_select");
        let option = document.createElement("option");
        option.classList.add("author_option");

        option.innerText = `${author.author}`;
        select.appendChild(option);
      });
    });
}
getAuthors();

//HISTORY API
const getCompBooks = () => {
  console.log("render for comp");
  const myUrlComp = "http://localhost:2828/comp";
  getBooks(myUrlComp);
};

const getScienceBooks = () => {
  console.log("render for science");
  const myUrlScience = "http://localhost:2828/science";
  getBooks(myUrlScience);
};
const getAllBooks = () => {
  console.log("render for home");
  getCompBooks();
  getScienceBooks();
};
function render(path) {
  if (path === ROUTES.COMP) {
    getCompBooks();
  }
  if (path === ROUTES.SCIENCE) {
    getScienceBooks();
  }
  if (path === ROUTES.HOME) {
    getAllBooks();
  }
}

const a = document.querySelectorAll(".a");
a.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    history.pushState(null, "", href);
    render(href);
  });
});

window.onload = () => {
  if (location.pathname === "/") {
    location.pathname = ROUTES.HOME;
    render(ROUTES.HOME);
  }
};

window.addEventListener("popstate", () => {
  render(location.pathname);
});

document.addEventListener("DOMContentLoaded", () => {
  render(location.pathname);
});
