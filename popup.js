// runs on google

// user copies and pastes urls of stuff they want
// pull picture, price, title

// check box once bought

// able to order by priority
// categories??

document.addEventListener("DOMContentLoaded", () => {
    const border = document.getElementById('border');
    const body = document.body;

    // array of objects,
    // object format: name, price, url
    const itemArray = [];

    // extract stored list from chrome storage 
    chrome.storage.sync.get('items', function (save) {
        if ((save.items !== undefined || save.items) &&
            Array.isArray(save.items)) {
            for (let item of save.items) {
                itemArray.push(item);
            }
        }
    });

    // // upon closing window or tab, save data into storage
    // window.addEventListener("beforeunload", function (e) {
    //     chrome.storage.sync.set({ objStorage: itemArray }, function () {
    //         console.log('saved object list into chrome storage');
    //     });
    // });

    window.addEventListener("unload", function () {
        chrome.storage.sync.set({ 'items': itemArray });
    });


    const nameBox = document.createElement("input");
    const priceBox = document.createElement("input");
    const urlBox = document.createElement("input");
    const submit = document.createElement("button");

    // builds HTML of user input
    const buildInputs = function () {
        nameBox.setAttribute('class', 'input');
        nameBox.setAttribute('placeholder', 'Enter Item Name');
        border.appendChild(nameBox);

        border.appendChild(document.createElement("br"))

        priceBox.setAttribute('class', 'input');
        priceBox.setAttribute('placeholder', 'Enter Item Price');
        border.appendChild(priceBox);

        border.appendChild(document.createElement("br"))

        urlBox.setAttribute('class', 'input');
        urlBox.setAttribute('placeholder', 'Enter Item URL');
        border.appendChild(urlBox);

        border.appendChild(document.createElement("br"))

        submit.setAttribute('id', 'submitButton')
        border.appendChild(submit)
        submit.innerText = "Add to List"

    }

    // items header
    const listDiv = document.createElement("div");
    listDiv.classList.add('list');
    const listTitle = document.createElement("h2");
    listTitle.setAttribute('id', 'shoplist')
    listTitle.innerHTML = 'ShopList';
    listDiv.appendChild(listTitle);

    // enclosure for item list
    const displayDivForObjects = function () {
        body.appendChild(listTitle);
        body.appendChild(listDiv);
    }

    const imgLogos = {
        'amazon.com': "img/amazon_logo.png",
        'target.com': 'img/target_logo.png',
        'walmart.com': 'img/walmart_logo.jpeg',
    }

    // redraw list of objects
    const displayStoredObjects = function (listOfObj, listDiv) {
        if (itemArray === []) return
        if (listDiv.hasChildNodes()) listDiv.innerHTML = '';
        for (let j = 0; j < listOfObj.length; j++) {
            const objList = document.createElement('ul');
            objList.setAttribute('class', 'objList')
            objList.setAttribute('id', "" + j)

            // obj image -check what website item is on
            let imgURL = '';

            for (let key in imgLogos) {
                if (listOfObj[j].url.includes(key)) imgURL = imgLogos[key];
            }
            // if website not found, use default cart logo
            if (imgURL === '') imgURL = 'img/cart_logo.jpeg';

            const objImg = document.createElement('img');
            objImg.setAttribute('src', imgURL);
            objImg.setAttribute('class', 'objImage');
            objList.appendChild(objImg);

            // obj name
            const objNameList = document.createElement('li');
            objNameList.setAttribute('class', 'objName');
            objNameList.setAttribute('id', `objName${j}`)
            objNameList.style.color = 'white'
            objNameList.innerText = listOfObj[j].name;
            objList.appendChild(objNameList);

            // obj price
            const objPriceList = document.createElement('li');
            objPriceList.setAttribute('class', 'objPrice');
            objPriceList.style.color = 'white'
            objPriceList.innerText = listOfObj[j].price;
            objList.appendChild(objPriceList);

            //remove button
            const removeBtn = document.createElement('button');
            removeBtn.setAttribute('class', 'removeBtn');
            removeBtn.innerText = 'Bought It!';
            objList.appendChild(removeBtn);

            removeBtn.addEventListener("click", () => {
                const nodeToRemove = removeBtn.parentNode;
                const nameToRemove = document.getElementById('objName' + nodeToRemove.id).innerText
                nodeToRemove.parentNode.removeChild(nodeToRemove);
                // nodeToRemove.innerHTML = '';
                for (let i = 0; i < listOfObj.length; i++) {
                    if (listOfObj[i].name === nameToRemove) {
                        listOfObj.splice(i, 1)
                        displayStoredObjects(listOfObj, listDiv);
                        return;
                    }
                }
            });

            listDiv.appendChild(objList);
        }
    };

    buildInputs()
    displayDivForObjects()
    displayStoredObjects(itemArray, listDiv);




    submit.addEventListener("click", () => {
        let tempItemObj = {}
        tempItemObj.name = nameBox.value
        tempItemObj.price = priceBox.value
        tempItemObj.url = urlBox.value

        if (nameBox.value === '' || priceBox.value === '' || urlBox.value === '') { }

        else {
            nameBox.value = ''
            priceBox.value = ''
            urlBox.value = ''

            itemArray.push(tempItemObj)

            displayStoredObjects(itemArray, listDiv);
        }
    })

    // Style Sheet
    const styles = {
        "body": {
            "background-color": "#242424",
            "height": "600px",
            "width": "400px"
        },
        "HTML": {
            "height": "600px",
            "width": "400px"
        },
        "#addItem": {
            "color": "white"
        },
        "#border": {
            "text-align": "center",
            // "border": "2px solid white",
            "height": "15%",
            "width": "95%",
            "position": "relative"
        },
        "#submitButton": {
            'display': 'block',
            "margin": "auto",
            "text-align": "center",
            'padding': '0.5rem',
            "outline": "none",
            "border": "none",
            "background-color": "#FFB6C1",
            "color": "#585858",
            "border-radius": ".5rem",
            'cursor': 'pointer',
            'transition': '0.3s'
        },
        ".removeBtn": {
            'display': 'block',
            "margin": "auto",
            "text-align": "center",
            'padding': '0.5rem',
            "outline": "none",
            "border": "none",
            "background-color": "#FFB6C1",
            "color": "#585858",
            "border-radius": ".5rem",
            'cursor': 'pointer',
            'transition': '0.3s'
        },
        ".input": {
            "margin": "auto",
            "text-align": "center",
            "width": "95%",
            "border_radius": ".5rem",
            "outline": "none",
            "padding": "1rem",
            "background-color": "#fff",
        },
        ".item": {
            "border": "1px solid white",
            "position": "relative",
            "width": "95%",
            "height": "10%",
        },
        ".list": {
            "background-color": "#383838",
            "justify-content": "center"

        },
        'ul': {
            'list-style-type': 'none',
            'list-style': 'none'
        },
        ".objImage": {
            "width": "200px",
            "height": "auto"
        },
        ".objName": {
            "font-size": "large",
            "text-align": "center",
            "padding": "5px 1px"
        },
        ".objPrice": {
            "font-size": "large",
            "text-align": "center"
        },
        "#shoplist": {
            "font-size": "large",
            "color": "white",
            "left-postition": "50%"
        },
        ".objList li": {
            'list-style-type': 'none',
            'list-style': 'none'
        }
    };

    for (const [node, style] of Object.entries(styles)) {
        const nodesToBeStyled = document.querySelectorAll(node);
        nodesToBeStyled.forEach((currentNode) => {
            Object.assign(currentNode.style, style);
        });
    }
});
//<div class="o3j99 qarstb"><style data-iml="1642125379303">.vcVZ7d{text-align:center}</style></div>
