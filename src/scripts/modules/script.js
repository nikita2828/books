import { templateBook } from "./templateBook";
import { templateSingleBook } from "./templateSingleBook";
import { routes } from "../constants/routes";
const myUrlAuthors = "http://localhost:2828/authors";
const myUrlCategory = "http://localhost:2828/categories";
const myUrlBooks = "http://localhost:2828/books";
let addBookBtn = document.querySelector(".add_book_btn");
let cancelBtn = document.querySelector(".cancel_btn");
let modalWindowBackground = document.querySelector(".modal_window_background");
let modalWindow = document.querySelector(".modal_window");
let sectionForBooks = document.querySelector(".section_books");
let search = document.querySelector(".search");

const modalWindowName = document.querySelector("#modal_input_name");
const modalWindowAuthor = document.querySelector("#modal_select_author");
const modalWindowCategory = document.querySelector("#modal_select_category");
const modalWindowPages = document.querySelector("#modal_input_pages");
const modalWindowSize = document.querySelector("#modal_input_size");
const modalWindowQuality = document.querySelector("#modal_input_quality");
const modalWindowLanguage = document.querySelector("#modal_input_language");
const modalWindowYear = document.querySelector("#modal_input_year");
const modalWindowImg = document.querySelector("#modal_input_img");
const modalWindowDescription = document.querySelector(
  "#modal_window_description"
);

const createBtn = document.querySelector(".create_btn");
const editBtn = document.querySelector(".edit_btn");
const modalWindowItems = document.querySelectorAll(".modal_window_items");
const listForPostRequest = [
  modalWindowName,
  modalWindowAuthor,
  modalWindowCategory,
  modalWindowImg,
];

let book = null;

const store = {
  books: [],
};

addBookBtn.addEventListener("click", () => {
  modalWindowBackground.style.display = "block";
  modalWindow.style.display = "block";
  createBtn.style.display = "block";
  editBtn.style.display = "none";
});

modalWindowBackground.addEventListener("click", (e) => {
  if (e.target === modalWindowBackground) {
    closeModal();
  }
});

const closeModal = () => {
  modalWindowBackground.style.display = "none";
  modalWindow.style.display = "none";
  modalWindowDescription.parentNode.querySelector(
    ".modal_window_warning"
  ).style.display = "none";
  modalWindowDescription.style.outline = "";
  modalWindowItems.forEach((item) => {
    item.value = "";
  });
  listForPostRequest.forEach((i) => {
    i.parentNode.querySelector(".modal_window_warning").style.display = "none";
    i.style.outline = "";
  });
};
cancelBtn.addEventListener("click", closeModal);

//RENDER BOOKS
const renderBooks = async (myUrl) => {
  const authors = await getAuthors();
  const categorys = await getCategorys();
  myUrl.forEach((oneBook) => {
    const book = document.createElement("div");
    book.classList.add("section_for_one_book");
    book.innerHTML = templateBook;

    const bookImg = book.querySelector(".img_item");
    const bookName = book.querySelector(".name_item");
    bookName.addEventListener("click", (e) => {
      e.preventDefault();
      const href = e.target.getAttribute("href");
      history.pushState(null, "", href);
      render(href);
    });

    const bookAuthor = book.querySelector(".author_item");
    const bookCategory = book.querySelector(".category_item");
    const bookPages = book.querySelector(".pages_item");
    const bookSize = book.querySelector(".size_item");
    const bookQuality = book.querySelector(".quality_item");
    const bookLanguage = book.querySelector(".language_item");
    const bookYear = book.querySelector(".year_item");
    const bookDescription = book.querySelector(".description_item");

    const categoryName = categorys.find(
      (category) => category.id === oneBook.categoryData
    ).nameCategory;

    bookImg.setAttribute("src", oneBook.imgData);
    bookName.innerHTML = `<b>Название: </b> ${oneBook.nameData}`;

    bookName.setAttribute("href", `/${categoryName}/${oneBook.id}`);

    bookAuthor.innerHTML = `<b>Автор: </b>${
      authors.find((author) => author.id === oneBook.authorData).nameAuthor
    }`;
    bookCategory.innerHTML = `<b>Категрия: </b>${
      categorys.find((category) => category.id === oneBook.categoryData)
        .nameCategory
    }`;
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

    const changeBtn = book.querySelector(".change");
    changeBtn.addEventListener("click", () => changeBook(oneBook));

    const deleteBtn = book.querySelector(".delete");
    deleteBtn.addEventListener("click", () => deleteBook(oneBook.id));

    sectionForBooks.appendChild(book);
  });
};

//POST REQUEST
const createBook = () => {
  const bookData = {
    imgData: modalWindowImg.value,
    nameData: modalWindowName.value,
    authorData: +modalWindowAuthor.value,
    categoryData: +modalWindowCategory.value,
    pagesData: +modalWindowPages.value,
    sizeData: modalWindowSize.value,
    qualityData: modalWindowQuality.value,
    languageData: modalWindowLanguage.value,
    yearData: +modalWindowYear.value,
    descriptionData: modalWindowDescription.value,
  };
  fetch(myUrlBooks, {
    method: "POST",
    body: JSON.stringify(bookData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(closeModal)
    .then(console.log("--------createBook"))
    .then(render(location.pathname));
};

//DELETE REQUEST
const deleteBook = (id) => {
  fetch(`${myUrlBooks}/${id}`, {
    method: "DELETE",
  }).then(render(location.pathname));
};

//CHANGE REQUEST
const changeBook = (oneBook) => {
  book = oneBook;
  modalWindowBackground.style.display = "block";
  modalWindow.style.display = "block";
  createBtn.style.display = "none";
  editBtn.style.display = "block";

  modalWindowName.value = oneBook.nameData;
  modalWindowAuthor.value = oneBook.authorData;
  modalWindowCategory.value = oneBook.categoryData;
  modalWindowPages.value = oneBook.pagesData;
  modalWindowSize.value = oneBook.sizeData;
  modalWindowQuality.value = oneBook.qualityData;
  modalWindowLanguage.value = oneBook.languageData;
  modalWindowYear.value = oneBook.yearData;
  modalWindowImg.value = oneBook.imgData;
  modalWindowDescription.value = oneBook.descriptionData;
};
const putRequest = () => {
  let id = book.id;
  const bookData = {
    imgData: modalWindowImg.value,
    nameData: modalWindowName.value,
    authorData: +modalWindowAuthor.value,
    categoryData: +modalWindowCategory.value,
    pagesData: +modalWindowPages.value,
    sizeData: modalWindowSize.value,
    qualityData: modalWindowQuality.value,
    languageData: modalWindowLanguage.value,
    yearData: +modalWindowYear.value,
    descriptionData: modalWindowDescription.value,
  };
  fetch(`${myUrlBooks}/${id}`, {
    method: "PUT",
    body: JSON.stringify(bookData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(closeModal)
    .then(render(location.pathname));
};
editBtn.addEventListener("click", putRequest);

//VALIDATION
createBtn.addEventListener("click", () => {
  listForPostRequest.forEach((item) => {
    const errorNode = item.parentNode.querySelector(".modal_window_warning");
    if (!item.value) {
      item.style.outline = "1px solid yellow";
      errorNode.style.display = "block";
    } else if (item.value) {
      item.style.outline = "1px solid green";
      errorNode.style.display = "none";
    }
  });
  const isEmpty = listForPostRequest.every((input) => input.value);
  if (modalWindowDescription.value.length >= 10 && isEmpty) {
    console.log("-----validation");
    createBook();
  }
  if (modalWindowDescription.value.length < 10) {
    modalWindowDescription.style.outline = "1px solid yellow";
    modalWindowDescription.parentNode.querySelector(
      ".modal_window_warning"
    ).style.display = "block";
  } else {
    modalWindowDescription.style.outline = "1px solid green";
    modalWindowDescription.parentNode.querySelector(
      ".modal_window_warning"
    ).style.display = "none";
  }
});

modalWindowDescription.addEventListener("blur", () => {
  if (modalWindowDescription.value.length < 10) {
    modalWindowDescription.style.outline = "1px solid yellow";
    modalWindowDescription.parentNode.querySelector(
      ".modal_window_warning"
    ).style.display = "block";
  } else {
    modalWindowDescription.style.outline = "1px solid green";
    modalWindowDescription.parentNode.querySelector(
      ".modal_window_warning"
    ).style.display = "none";
  }
});

listForPostRequest.forEach((el) => {
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
const getCategorys = async () => {
  try {
    const categorysForRender = await fetch(myUrlCategory).then((res) =>
      res.json()
    );
    return categorysForRender;
  } catch (error) {
    console.warn(error);
  }
};

const renderCategorys = async () => {
  const categorys = await getCategorys();
  categorys.forEach((category) => {
    const selectForCategory = document.querySelector(".category_select");
    const optionForCategory = document.createElement("option");
    optionForCategory.innerText = `${category.nameCategory}`;
    optionForCategory.setAttribute("value", `${category.id}`);
    selectForCategory.appendChild(optionForCategory);
  });
};
renderCategorys();

//GET REQUST FOR AUTHORS
const getAuthors = async () => {
  try {
    const authorsForRender = await fetch(myUrlAuthors).then((res) =>
      res.json()
    );
    return authorsForRender;
  } catch (error) {
    console.warm(error);
  }
};
const renderAuthors = async () => {
  const authors = await getAuthors();
  authors.forEach((author) => {
    const select = document.querySelector(".author_select");
    const option = document.createElement("option");
    option.setAttribute("value", `${author.id}`);
    option.innerText = `${author.nameAuthor}`;
    select.appendChild(option);
  });
};
renderAuthors();

//HISTORY API

document.addEventListener("DOMContentLoaded", async () => {
  store.books = await fetch(myUrlBooks).then((response) => response.json());
  render(location.pathname);

  const link = document.querySelectorAll(".link");
  link.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = e.target.getAttribute("href");
      history.pushState(null, "", href);
      render(href);
    });
  });

  window.addEventListener("popstate", () => {
    render(location.pathname);
  });
});

const render = (path) => {
  const arrPath = path.split("/");
  sectionForBooks.innerHTML = "";
  const { books } = store;
  if (path === routes.comp) {
    const booksComp = books.filter((book) => book.categoryData === 1);
    renderBooks(booksComp);
  } else if (path === routes.science) {
    const booksScience = books.filter((book) => book.categoryData === 2);
    renderBooks(booksScience);
  } else if (path === routes.home) {
    const allBooks = books;
    renderBooks(allBooks);
  } else if (
    (`/${arrPath[1]}` === routes.comp || `/${arrPath[1]}` === routes.science) &&
    arrPath.length === 3
  ) {
    const id = arrPath[2];
    const singleBook = books.find((book) => book.id === +id);
    single(singleBook);
  } else {
    let h1 = document.createElement("h1");
    h1.innerText = "PAGE NOT FOUND 404";
    sectionForBooks.appendChild(h1);
    h1.style.color = "black";
  }
};

async function single(oneBook) {
  const authors = await getAuthors();
  const categorys = await getCategorys();
  sectionForBooks.innerHTML = "";
  const book = document.createElement("div");
  book.classList.add("section_for_one_book");
  book.innerHTML = templateSingleBook;

  const bookImg = book.querySelector(".img_item");
  const bookName = book.querySelector(".name_item");
  const bookAuthor = book.querySelector(".author_item");
  const bookCategory = book.querySelector(".category_item");
  const bookPages = book.querySelector(".pages_item");
  const bookSize = book.querySelector(".size_item");
  const bookQuality = book.querySelector(".quality_item");
  const bookLanguage = book.querySelector(".language_item");
  const bookYear = book.querySelector(".year_item");
  const bookDescription = book.querySelector(".description_item");

  bookImg.setAttribute("src", oneBook.imgData);
  bookName.innerHTML = `<b>Название: </b> ${oneBook.nameData}`;
  bookAuthor.innerHTML = `<b>Автор: </b>${
    authors.find((author) => author.id === oneBook.authorData).nameAuthor
  }`;
  bookCategory.innerHTML = `<b>Категрия: </b>${
    categorys.find((category) => category.id === oneBook.categoryData)
      .nameCategory
  }`;
  bookPages.innerHTML = `<b>Количество страниц: </b>${oneBook.pagesData}`;
  bookSize.innerHTML = `<b>Размер: </b>${oneBook.sizeData}`;
  bookQuality.innerHTML = `<b>Качество: </b>${oneBook.qualityData}`;
  bookLanguage.innerHTML = `<b>Язык: </b>${oneBook.languageData}`;
  bookYear.innerHTML = `<b>Год: </b>${oneBook.yearData}`;
  bookDescription.innerHTML = `<b>Описание: </b>${oneBook.descriptionData}`;

  sectionForBooks.appendChild(book);
}
