import {
    renderItemsList,
    checkAllInputs,
    getInputs,
    clearInputs
} from "./utils.js";

import { getAllBooks, updateBook, deleteBook } from "./api.js";

const findButton = document.getElementById("find-button");
const clearFindButton = document.getElementById("clear-find-button");
const findInput = document.getElementById("find-input");
const sortByPriceAscButton = document.getElementById("sort-button");
const submitButton = document.getElementById("submit-button");
const hideWindowButton = document.getElementById("window_button");

let Books = [];

let currentItemId;

const removeBook = (element) => {
    const itemId = element.target.id.replace('delete_', "");
    deleteBook(itemId).then(renderBooks(editBook, removeBook));

}

const editBook = (element) => {
    const itemId = element.target.id.replace('edit_', "");
    currentItemId = itemId;
    document.getElementById("operations_container").style.display = 'block';

}

const renderBooks = async(editBook, removeBook) => {
    const allBooks = await getAllBooks();
    Books = allBooks;
    renderItemsList(Books, editBook, removeBook);
}

findButton.addEventListener("click", () => {
    const foundBooks = Books.filter(book => book.brand.search(findInput.value) !== -1);

    renderItemsList(foundBooks, editBook, removeBook);
});


sortByPriceAscButton.addEventListener("click", () => {
    const sortedBooks = Books.sort((book_1, book_2) => (book_1.price > book_2.price) ? 1 : -1);

    renderItemsList(sortedBooks, editBook, removeBook);
});

clearFindButton.addEventListener("click", () => {
    findInput.value = "";

    renderItemsList(Books, editBook, removeBook);
});


submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    let { brand, description, price } = getInputs();

    if (checkAllInputs()) {
        price = Number(price);

        updateBook(currentItemId, { brand, description, price });

        document.getElementById("window_content").style.display = "block";
        document.getElementById("window_content").style.border = "none";
        document.getElementById("window_content").style.backgroundColor = "rgb(79, 174, 236);";
        document.getElementById("window_text_content").innerText = "Item was edited!";

    } else {
        document.getElementById("window_content").style.display = "block";
        document.getElementById("window_content").style.backgroundColor = "red";
        document.getElementById("window_text_content").innerText = "Input all the values to edit this item!";
    }

});

hideWindowButton.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("window_content").style.display = 'none';
    if (checkAllInputs()) {
        document.getElementById("operations_container").style.display = 'none';
        clearInputs();
        renderBooks(editBook, removeBook);
    }
});

renderBooks(editBook, removeBook);