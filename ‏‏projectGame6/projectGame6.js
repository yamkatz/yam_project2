window.onload = () => {
  let groceryList = JSON.parse(localStorage.getItem("groceryList")) || {};

  const form = document.querySelector(".form");
  const input = form.querySelector(".formInput");
  const ul = document.querySelector(".groceryList");

  const updateLocalStorage = () => {
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let itemId = String(Date.now());
    let GroceryItem = input.value;
    addItemToDOM(itemId, GroceryItem);
    addItemToStorage(itemId, GroceryItem);
    input.value = "";

    updateLocalStorage();
  });

  ul.addEventListener("click", (e) => {
    let id = e.target.getAttribute("data-id");
    if (!id) return; // user clicked in something else
    //pass id through to functions
    removeItemFromDOM(id);
    removeItemFromStorage(id);
    updateLocalStorage();
  });

  const addItemToDOM = (itemId, GroceryItem) => {
    // create an li
    const li = document.createElement("li");
    li.setAttribute("data-id", itemId);
    // add GroceryItem text to li//
    li.innerText = GroceryItem;
    // add li to the DOM//
    ul.appendChild(li);
  };

  const addItemToStorage = (itemId, GroceryItem) => {
    // add item to the groceryList object with the item's id as the key and the item's text as the value
    groceryList[itemId] = GroceryItem;
  };

  const removeItemFromDOM = (id) => {
    let li = document.querySelector('[data-id="' + id + '"]');
    // remove list item
    ul.removeChild(li);
  };

  const removeItemFromStorage = (id) => {
    // remove item from the groceryList object by its id
    delete groceryList[id];
  };
};
