let addBookBtn = document.querySelector(".add_book_btn");
let cancelBtn = document.querySelector(".cancel_btn");
let modalWindow = document.querySelector(".modal_window_background");

addBookBtn.addEventListener("click", () => {
modalWindow.style.display = "block";
});

cancelBtn.addEventListener("click", () => {
    modalWindow.style.display = "none";
    });
    window.addEventListener("click", (e) => {
        if(e.target == modalWindow){
            modalWindow.style.display = "none";
        }
    });