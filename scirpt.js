const btn = document.querySelectorAll("#container > button");
const img = document.getElementById("switch");
const cartImg = document.getElementById("cart-img");
const cart = document.getElementById("cart");
const div = document.querySelector("#cart > div");
const addCart = document.getElementById("add-cart");
const amount = document.getElementById("amount");
const menu = document.getElementById("menu");
const btnClose = document.getElementById("btn-close");
const list = document.querySelector("nav > ul");
const caseImg = document.getElementById("case-for-img");

// menu(mobile version)
menu.addEventListener("click", () => {
  list.classList.add("menu_list");
  btnClose.style.display = "block";
  btnClose.addEventListener("click", () => {
    list.classList.remove("menu_list");
    btnClose.style.display = "none";
  });
});

let count = 0;

addCart.addEventListener("click", () => {
  if (parseInt(amount.textContent) != 0 && count < 1) {
    document.getElementById("to-remove").style.display = "none";
    count++;
    const element = document.querySelector("template").content.cloneNode(true);
    div.appendChild(element);
    let number = 125 * parseInt(amount.textContent);

    const cartText = document.getElementById("cart-text-content");
    cartText.textContent = `$125.00 x ${amount.textContent} $${number}.00`;
    const trashcan = document.getElementById("trashcan");

    trashcan.addEventListener("click", () => {
      div.removeChild(document.getElementById("template-div"));
      document.getElementById("to-remove").style.display = "grid";
      count = 0;
    });
  }
});
document.getElementById("btn-plus").addEventListener("click", () => {
  const num = parseInt(amount.textContent);
  if (num < 10) {
    amount.textContent = num + 1;
  }
});
document.getElementById("btn-minus").addEventListener("click", () => {
  const num = parseInt(amount.textContent);
  if (num > 0) {
    amount.textContent = num - 1;
  }
});
// when you click on the small image in the desktop version, switch its place with the main image
let current = 1;
function addImg(pic, e, name) {
  document
    .querySelector(`.${name} > div:nth-child(2) > button[value="${current}"]`)
    .classList.remove("dark");
  document
    .querySelector(
      `.${name} > div:nth-child(2) > button[value="${current}"] > img`
    )
    .classList.remove("sub_dark");
  pic.setAttribute("src", `image-product-${e.currentTarget.value}.jpg`);
  e.currentTarget.setAttribute("class", "dark");
  current = e.currentTarget.value;
  e.target.setAttribute("class", "sub_dark");
}
btn.forEach((e) =>
  e.addEventListener("click", (e) => addImg(img, e, "origin"))
);

// moves the image
let subCurrent = 1;
function moveLeft(s) {
  subCurrent--;
  while (subCurrent == 0) {
    subCurrent = 4;
  }
  s.setAttribute("src", `image-product-${subCurrent}.jpg`);
}
function moveRight(s) {
  subCurrent++;
  while (subCurrent == 5) {
    subCurrent = 1;
  }
  s.setAttribute("src", `image-product-${subCurrent}.jpg`);
}
document
  .getElementById("btn-of-switch-left")
  .addEventListener("click", () => moveLeft(img));
document
  .querySelectorAll("#btn-of-switch-right")
  .forEach((e) => e.addEventListener("click", () => moveRight(img)));

let cartCheck = false;
cartImg.addEventListener("click", () => {
  cart.style.display = "grid";
  cartCheck = true;
});
document.addEventListener("click", (e) => {
  if (cartCheck && !cart.contains(e.target) && e.target.id !== "cart-img") {
    cart.style.display = "none";
    cartCheck = false;
  }
});

// Add an image in the middle of the screen
img.addEventListener("click", () => {
  if (innerWidth > 550) {
    const ele = caseImg.cloneNode(true);
    ele.classList.add("center");
    const btn = document.createElement("button");
    const imgBtn = document.createElement("img");
    imgBtn.setAttribute("src", "icon-close.svg");
    btn.appendChild(imgBtn);
    btn.classList.add("btn-close");
    document.querySelector("body").appendChild(ele);
    document
      .querySelectorAll(".center > div:nth-child(1) > .btn-switch")
      .forEach((e) => e.classList.add("block"));
    const imgCopy = document.querySelector(".center > div:nth-child(1) > img");
    document
      .querySelector(".center > div:nth-child(1) > button[value = 'right']")
      .addEventListener("click", () => moveRight(imgCopy));
    document
      .querySelector(".center > div:nth-child(1) > button[value = 'left']")
      .addEventListener("click", () => moveLeft(imgCopy));
    document
      .querySelectorAll(".center > div:nth-child(2) > button")
      .forEach((e) =>
        e.addEventListener("click", (e) => addImg(imgCopy, e, "center"))
      );

    document.querySelector(".center > div:nth-child(1)").appendChild(btn);
    document.querySelector(".btn-close").addEventListener("click", ()=> {
      document.querySelector("body").removeChild(ele);
    })
  }
});
