const itemArray = [
    {
        name: "Maggi",
        price: 12
    },
    {
        name: "Lays",
        price: 5
    },
    {
        name: "Kurkure",
        price: 10
    },
    {
        name: "Cocacola",
        price: 95
    },
    {
        name: "ParleBiscuit",
        price: 40
    },
    {
        name: "Boat Earphone",
        price: 1195
    },
    {
        name: "Peanut Butter",
        price: 395
    },
    {
        name: "Safola Masala Oats",
        price: 195
    },
    {
        name: "Amul Cheese",
        price: 73
    },
    {
        name: "Garlic Pickle",
        price: 104
    }

];

let array = [];
let totalPrice = 0;
let object;
let quant = 0;
let duplicate = false;
const tableRef = document.querySelector("tbody");

function checkDuplicateItem(objects) {
    if (array.includes(objects.name)) {
        duplicate = true;
    }
    else {
        array.push(objects.name)
        duplicate = false;
    }
}


function getQuantity(quantity) {
    quant = quantity;
}

function getItem(name) {
    for (let i of itemArray) {
        if (i.name == name) {
            object = i;
            priceDisplay(i.price)
            return
        }
        priceDisplay("")
    }
}

function priceDisplay(unitPrice) {

    const refPriceDisplay = document.getElementById("unitPrice")
    refPriceDisplay.removeAttribute("disabled", "disabled");
    refPriceDisplay.value = unitPrice;
    refPriceDisplay.setAttribute("disabled", "disbaled")

}

function addToTable() {
    if (object.name == "" || quant == "") {
        return
    }
    checkDuplicateItem(object);
    if (!duplicate) {
        tableRef.innerHTML += `<tr class='data'>
            <td class='col-4'>${object.name}</td>
            <td class='col-2'>${quant}</td>
            <td class='col-2'>${object.price}</td>
            <td class='col-3'>${object.price * quant}</td>
            <td class='col'><img src='trash-alt.jpg' width='25%' onclick='remove(this)'></td>
          </tr>`
    }
    else {
        let record = search(object)
        let previous = record.getElementsByTagName("td")
        let v1 = parseInt(previous[1].innerHTML)
        let v2 = parseInt(previous[3].innerHTML)
        const q = parseInt(v1) + parseInt(quant)
        previous[1].innerHTML = q
        previous[3].innerHTML = quant * object.price + v2

    }
    displayTotal();
}

function search(obj) {
    let rows = document.getElementsByClassName("data");
    for (let i = 0; i < rows.length; i++) {
        let field = rows[i].getElementsByTagName("td");
        if (obj.name == field[0].innerHTML) {
            return rows[i];
        }
    }

}

function updateTotal() {
    let rows = document.getElementsByClassName("data");
    totalPrice = 0;
    for (let i = 0; i < rows.length; i++) {
        let field = rows[i].getElementsByTagName("td");
        totalPrice += parseInt(field[3].innerHTML)
    }

}

function remove(recordRemove) {
    var p = recordRemove.parentNode.parentNode;
    delete array[array.indexOf((p.getElementsByTagName("td"))[0].innerHTML)]
    p.parentNode.removeChild(p);
    displayTotal();

}

function displayTotal() {
    updateTotal();
    document.getElementById("totalprice").innerHTML = `<b>Total Price : ${totalPrice} INR <b>`;
}

