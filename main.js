// runs on google

// user copies and pastes urls of stuff they want
// pull picture, price, title

// check box once bought

// able to order by priority
// categories??

document.addEventListener("DOMContentLoaded", () => {
    const border = document.getElementById('border')
    border.setAttribute('id', 'border')
    const body = document.body

    const items = []

    body.appendChild(border)

    // grid-like, borders around each rectangle inside outer border
    const shoppingListIcon = document.createElement("img");
    shoppingListIcon.src = "https://static.thenounproject.com/png/166411-200.png";
    shoppingListIcon.setAttribute("id", "shopicon");

    // array of objects,
    // object format: name, price, image, url
    const list = [];
    let tempItemObj = {}

    // for entering new item
    const nameBox = document.createElement("input");
    nameBox.setAttribute('class', 'input');
    nameBox.setAttribute('placeholder', 'Enter Item Name');
    border.appendChild(nameBox);

    border.appendChild(document.createElement("br"))

    const priceBox = document.createElement("input");
    priceBox.setAttribute('class', 'input');
    priceBox.setAttribute('placeholder', 'Enter Item Price');
    border.appendChild(priceBox);

    border.appendChild(document.createElement("br"))

    const urlBox = document.createElement("input");
    urlBox.setAttribute('class', 'input');
    urlBox.setAttribute('placeholder', 'Enter Item URL');
    border.appendChild(urlBox);

    border.appendChild(document.createElement("br"))

    const submit = document.createElement("button")
    submit.setAttribute('id', 'submitButton')
    border.appendChild(submit)
    submit.innerText = "Add to List"

    submit.addEventListener("click", ()=>{
        let tempItemObj = {}
        tempItemObj.name = nameBox.value
        tempItemObj.price = priceBox.value
        tempItemObj.url = urlBox.value

        nameBox.value = ''
        priceBox.value = ''
        urlBox.value = ''
        
        items.push(tempItemObj)
    })

    //setInterval(displayList)

    // args: items array
    // displays list of items
    const displayList = function (arr) {
        const newItem = document.createElement("div");
        newItem.setAttribute("id", `item${list.length}`);
        newItem.setAttribute("class", "item");
        // const itemImage = document.createElement("img");
        // itemImage.setAttribute("id", "itemImage")
        // itemImage.setAttribute("src", item.image);
        const itemName = document.createElement("h2");
        itemName.setAttribute("id", "itemName");
        const itemPrice = document.createElement("h3")
        itemPrice.setAttribute("id", "itemPrice");

        border.appendChild(newItem);
        // newItem.appendChild(itemImage);
        newItem.appendChild(itemName);
        newItem.appendChild(itemPrice);

        itemName.innerHTML = item.name;
        itemPrice.innerHTML = item.price;
    };

    // Style Sheet
    const styles = {
        "body":{
            "background-color": "#242424"
        },
        "#border": {
            "text-align": "center",
            "border": "2px solid white",
            "height": "75%",
            "width": "50%"
        },
        "#submitButton":{
            "margin": "auto",
            "text-align": "center"
        },
        ".input": {
            "margin": "auto",    
            "text-align": "center",
            "width": "95%"
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
    }
});
//<div class="o3j99 qarstb"><style data-iml="1642125379303">.vcVZ7d{text-align:center}</style></div>
