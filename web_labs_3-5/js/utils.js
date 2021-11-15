const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("decription-input");
const priceInput = document.getElementById("price-input")
const itemsContainer = document.getElementById("items-container");


const getItemId = (id) => `${id}`;

const itemTemplate = ({ id, brand, description, price }) => `
<li id="${getItemId(id)}" class="card">
    <img src="https://images-na.ssl-images-amazon.com/images/I/51K84pomCRL._SY264_BO1,204,203,200_QL40_ML2_.jpg" class="item-image" alt="book">
    <div">
        <h3 class="card-header">${brand}</h3>
        <p class="card-body">${description}</p>
        <p class="card-footer">${price}</p>
    </div>
    <div class="li-buttons">
        <button id="delete_${id}" type="button" class="btn delete">Delete </button>
        <button id="edit_${id}" type="button" class="btn edit">Edit </button>
    </div>
</li>`;


export const checkAllInputs = () => {
    if (titleInput.value == "" || descriptionInput.value == "" || priceInput.value == "") {
        return false
    } else {
        return true
    }
}

export const addItemToPage = ({ id, brand, description, price }, editBook, removeBook) => {
    itemsContainer.insertAdjacentHTML(
        "afterbegin",
        itemTemplate({ id, brand, description, price })
    );

    const deleteButton = document.getElementById("delete_" + `${id}`);
    const editButton = document.getElementById("edit_" + `${id}`);
    editButton.addEventListener("click", editBook);
    deleteButton.addEventListener("click", removeBook);
};

export const renderItemsList = (items, editBook, removeBook) => {
    itemsContainer.innerHTML = "";
    for (const item of items) {
        addItemToPage(item, editBook, removeBook);
    }
    countTotalPrice(items);
};

export const getInputs = () => {
    return {
        brand: titleInput.value,
        description: descriptionInput.value,
        price: priceInput.value
    };
};

export const countTotalPrice = (items) => {
    let totalPrice = Number(0);
    for (const item of items) {
        totalPrice += Number(item.price);
    }
    document.getElementById("total-price").innerText = totalPrice + '$';
}

export const clearInputs = () => {
    titleInput.value = "";
    priceInput.value = "";
    descriptionInput.value = "";
};