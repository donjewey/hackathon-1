// runs on google

// user copies and pastes urls of stuff they want
// pull picture, price, title

// check box once bought

// able to order by priority
// categories??

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const border = document.createElement('div');
    border.setAttribute('id', 'border');
    body.appendChild(border);

    // array of objects,
    // object format: name, price, url
    const itemArray = [];

    chrome.runtime.connect({ name: "popup" });

    // extract stored list from chrome storage 
    chrome.storage.sync.get(['items'], function (save) {
        if ((save.items !== undefined && save.items) &&
            Array.isArray(save.items)) {
            for (let i = 0; i < save.items.length; i++) {
                itemArray.push(save.items[i]);
            }
            displayStoredObjects(itemArray, listDiv);
        }
    });



    const nameBox = document.createElement("input");
    const priceBox = document.createElement("input");
    const urlBox = document.createElement("input");
    const submit = document.createElement("button");
    // const saveList = document.createElement("button");

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
        submit.innerText = "Add to List";

        // saveList.setAttribute('id', 'saveButton')
        // border.appendChild(saveList);
        // saveList.innerText = "Save List";
    }

    //saves list when button is pressed
    // saveList.addEventListener("click", function () {
    //     // chrome.storage.sync.set({ 'items': itemArray });
    // });

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
        'amazon.com': "img/amazon_logo.jpg",
        'target.com': 'img/target_logo.png',
        'walmart.com': 'img/walmart_logo.jpeg',
        'ebay.com': 'img/ebay_logo.png'
    }

    // redraw list of objects
    const displayStoredObjects = function (listOfObj, listDiv) {
        if (itemArray === []) return
        if (listDiv.hasChildNodes()) listDiv.innerHTML = '';
        for (let j = 0; j < listOfObj.length; j++) {
            const objList = document.createElement('div');
            objList.setAttribute('class', 'objList');
            objList.setAttribute('id', "" + j);
            objList.setAttribute('display', 'flex');
            objList.setAttribute('justify-content', 'center');
            objList.setAttribute('align-items', 'center');

            // obj image -check what website item is on
            let imgURL = '';

            for (let key in imgLogos) {
                if (listOfObj[j].url.includes(key)) imgURL = imgLogos[key];
            }
            // if website not found, use default cart logo
            if (imgURL === '') imgURL = 'img/cart_logo.jpeg';

            const objRef = document.createElement('a')
            objRef.setAttribute('href', listOfObj[j].url);
            const objImg = document.createElement('img');
            objImg.setAttribute('src', imgURL);
            objImg.setAttribute('class', 'objImage');
            objImg.setAttribute('width', '25%');
            objList.appendChild(objRef);
            objRef.appendChild(objImg);

            objImg.onclick = function () {
                window.open(listOfObj[j].url);
            }

            // obj name
            const objNameList = document.createElement('p');
            objNameList.setAttribute('class', 'objName');
            objNameList.setAttribute('id', `objName${j}`)
            objNameList.style.color = 'white';
            objNameList.style.fontSize = 'large';
            objNameList.innerText = listOfObj[j].name;
            // objNameList.setAttribute('list-style-type', 'none');
            objList.appendChild(objNameList);

            // obj price
            const objPriceList = document.createElement('p');
            objPriceList.setAttribute('class', 'objPrice');
            objPriceList.setAttribute('id', `objPrice${j}`)
            objPriceList.style.color = 'white'
            objNameList.style.fontSize = 'large';
            objPriceList.innerText = listOfObj[j].price;
            // objPriceList.setAttribute('list-style-type', 'none');
            objList.appendChild(objPriceList);

            //remove button
            const removeBtn = document.createElement('button');
            removeBtn.setAttribute('class', 'removeBtn');
            removeBtn.innerText = 'Bought It!';
            objList.appendChild(removeBtn);

            removeBtn.appendChild(document.createElement('br'))

            removeBtn.addEventListener("click", () => {
                const nodeToRemove = removeBtn.parentNode;
                const nameToRemove = document.getElementById('objName' + nodeToRemove.id).innerText
                const priceToRemove = document.getElementById('objPrice' + nodeToRemove.id).innerText
                nodeToRemove.parentNode.removeChild(nodeToRemove);
                // nodeToRemove.innerHTML = '';
                for (let i = 0; i < listOfObj.length; i++) {
                    if (listOfObj[i].name === nameToRemove && listOfObj[i].price === priceToRemove) {
                        listOfObj.splice(i, 1)
                        displayStoredObjects(listOfObj, listDiv);
                        chrome.storage.sync.set({ 'items': listOfObj });
                        return
                    }
                }
            });

            listDiv.appendChild(objList);
        }
    };

    buildInputs();
    displayDivForObjects();
    

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
            chrome.storage.sync.set({ 'items': itemArray });
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
            "display": "block",
            "text-align": "center",
            // "border": "2px solid white",
            "height": "15%",
            "width": "95%",
        },
        "#submitButton": {
            'display': 'block',
            "margin": "auto",
            "text-align": "center",
            'padding': '0.3rem',
            "outline": "none",
            "border": "none",
            "background-color": "#FFF",
            "color": "#585858",
            "border-radius": ".3rem",
            'cursor': 'pointer',
            'transition': '0.3s',
            'margin-top' : '5px'
        },
        "#saveButton": {
            'display': 'block',
            "margin": "auto",
            "text-align": "center",
            'padding': '0.3rem',
            "outline": "none",
            "border": "none",
            "background-color": "#FFF",
            "color": "#585858",
            "border-radius": ".3rem",
            'cursor': 'pointer',
            'transition': '0.3s'
        },
        ".removeBtn": {
            "text-align": "center",
            'padding': '0.3rem',
            "outline": "none",
            "border": "none",
            "background-color": "#FFF",
            "color": "#585858",
            "border-radius": ".3rem",
            'cursor': 'pointer',
            'transition': '0.3s'
        },
        ".input": {
            "margin": "auto",
            "text-align": "center",
            "width": "40%",
            "border_radius": ".5rem",
            "outline": "none",
            "padding": "0.3rem",
            "background-color": "#fff",
        },
        ".item": {
            "border": "1px solid white",
            "position": "relative",
            "width": "95%",
            "height": "10%",
        },
        ".list": {
            "background-color": "#0d0d0d"

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
            "padding": "2px 1px"
        },
        ".objPrice": {
            "font-size": "large",
            "text-align": "center"
        },
        "#shoplist": {
            "display": "block",
            "font-size": "25px",
            "color": "white",
            "text-align": "center",
            "padding-top": '10px',
            "transform": "translateX(-11px)",
            "font-family": "Consolas, monaco, monospace"
        },
        ".objList": {
            'display': 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'text-align': 'center',
            'background-color': '#1a1a1a'
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
