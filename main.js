// runs on google

// user copies and pastes urls of stuff they want
// pull picture, price, title

// check box once bought

// able to order by priority
// categories??

document.addEventListener("DOMContentLoaded", () => {
    // grid-like, borders around each rectangle inside outer border
    //const puppeteer = require("puppeteer");

    const title = document.createElement("h1");
    const border = document.createElement("div");

    // amazon ID [always 10 chars, caps or nums]
    let url = "";

    title.setAttribute("id", "title");
    border.setAttribute("id", "border");

    title.innerText = "SHOPLIST";

    const shoppingListIcon = document.createElement("img");
    shoppingListIcon.src = "https://static.thenounproject.com/png/166411-200.png";
    shoppingListIcon.setAttribute("id", "shopicon");

    // appending elements
    document.body.appendChild(title);
    document.body.appendChild(border);

    // array of objects,
    // object format: name, price, image, url
    const list = [];
    let tempItemObj = {}


    // dom layout to manually add item
    




    // for pasting url of new item
    const inputBox = document.createElement("input");
    inputBox.setAttribute('placeholder', 'Enter Item URL');
    border.appendChild(inputBox);

    // args: item object (see list comments on format)
    // adds new item to end of list
    const appendList = function (item) {
        const newItem = document.createElement("div");
        newItem.setAttribute("id", `item${list.length}`);
        newItem.setAttribute("class", "item");
        const itemImage = document.createElement("img");
        itemImage.setAttribute("id", "itemImage")
        itemImage.setAttribute("src", item.image);
        const itemName = document.createElement("h2");
        itemName.setAttribute("id", "itemName");
        const itemPrice = document.createElement("h3")
        itemPrice.setAttribute("id", "itemPrice");

        border.appendChild(newItem);
        newItem.appendChild(itemImage);
        newItem.appendChild(itemName);
        newItem.appendChild(itemPrice);

        itemName.innerHTML = item.name;
        itemPrice.innerHTML = item.price;
    };

    const getItem = function (url) {
        if (url) {
            fetch(
                `http://api-prd.axesso.de/amz/amazon-lookup-product?url=${url}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": "axesso-api-key=12345",
                        "Content-Type":
                            "(application/json)",
                    },
                }
            )
                .then((response) => {
                    tempItemObj.name = response.productTitle;
                    tempItemObj.price = response.price;
                    tempItemObj.image = response.imageUrlList[0];
                })
                .catch((err) => {
                    console.error(err);
                });
        };
        // event listener to take user to item's url on click
        inputBox.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                console.log('enter key pressed');
                getItem(inputBox.value);
                appendList(tempItemObj)
                inputBox.innerText = ''
            }
        })

        // Style Sheet
        const styles = {
            body: {},
            "#border": {
                "border": "2px solid white",
            },
            ".item": {
                "border": "1px solid white",
                "position": "relative",
                "width": "95%",
                "height": "10%",
            },
            ".qarstb": {
                "display": "flex",
                "align-items": "center",
                "justify-content": "center",
            },
            "#shopicon": {
                "height": "200px",
                "border": "1px solid black",
            },
        };

        for (const [node, style] of Object.entries(styles)) {
            const nodesToBeStyled = document.querySelectorAll(node);
            nodesToBeStyled.forEach((currentNode) => {
                Object.assign(currentNode.style, style);
            });
        }
    }
});
//<div class="o3j99 qarstb"><style data-iml="1642125379303">.vcVZ7d{text-align:center}</style></div>
