const dataRequest = new XMLHttpRequest();
let clientData;
let listNode;
let firstNameNode;
let lastNameNode;
let addressNode;
let stateNode;
let emailNode;
let phoneNode;
let compactNode;
let midNode;
let luxuryNode;
let truckNode;
let rackNode;
let gpsNode;
let seatNode;
let daysNode;

// Set the date
document.getElementById('dateTime').textContent = new Date();

// Set the event listener for the rent button
const rentButton = document.getElementById('rentButton');
if (rentButton) {
    rentButton.addEventListener('click', function() {
        window.location.href='rental.html';
        loadRental();
    });
}

// Get the node and set the event listener for clientSearch
const searchNode = document.getElementById('clientSearch');
if (searchNode) {
    searchNode.addEventListener('input', search);
    // Load the data
    dataRequest.onreadystatechange = function() {
        if (dataRequest.readyState == 4 && dataRequest.status == 200) {
        clientData = JSON.parse(dataRequest.responseText);
        }
    };
    dataRequest.open('GET', 'rentalclients.json', true);
    dataRequest.send();
}

// Searches the JSON data for matching last names
function search() {
    clearSearch();
    let search = searchNode.value.toLowerCase();
    let results = '';
    if (search) {
        results = clientData.filter((element) => {
            if (element['last_name']) {
                return element['last_name'].toLowerCase().startsWith(search);
            }
        });
    }
    if (results) {
        printClients(results);
    }
    
    // Clears the list if the search bar is empty
    if (!search) {
        clearSearch();
    }
}

// Clears the search results
function clearSearch() {
    listNode = document.getElementById('clientList');
    listNode.innerHTML = '';
}

// Prints the list of matching clients
function printClients(results) {
    let resultList = '';
    results.forEach((element) => {
        resultList += `<tr>`;
        resultList += `<td class="clients">`;
        resultList += `${element['first_name']} ${element['last_name']}`;
        resultList += `</td></tr>`;
    });
    listNode.innerHTML += resultList;
    let selectableResults = document.getElementsByClassName('clients');
    for (let client of selectableResults) {
        client.addEventListener('click', function() {
            // Remove 'clicked' class from every element first so only one element shows as selected at a time
            for (let element of selectableResults) {
                element.className = 'clients';
            }
            this.className += ' clicked';
            loadForm(this.textContent);
        });
    }
}

// Loads the form
function loadForm(clientName) {
    document.getElementById('form').hidden = false;
    let clientFirstName = clientName.split(' ')[0];
    let clientLastName = clientName.split(' ')[1];
    client = clientData.find((element) => {
        return element['last_name'] === clientLastName && element['first_name'] === clientFirstName;
    });
    fillForm(client);
    setOrderListeners();
}

// Fills the form with the client's data
function fillForm(client) {
    firstNameNode = document.getElementById('firstName');
    lastNameNode = document.getElementById('lastName');
    addressNode = document.getElementById('address');
    stateNode = document.getElementById('state');
    emailNode = document.getElementById('email');
    phoneNode = document.getElementById('phone');
    clearFormData();
    firstNameNode.value = client['first_name'];
    lastNameNode.value = client['last_name'];
    addressNode.value = client['address'];
    stateNode.value = client['state_prov'];
    emailNode.value = client['email'];
    phoneNode.value = client['phone'];
}

// Clears the client's data from the form
function clearFormData() {
    firstNameNode.value = '';
    lastNameNode.value = '';
    addressNode.value = '';
    stateNode.value = '';
    emailNode.value = '';
    phoneNode.value = '';
}

// Sets event listeners for the order form
function setOrderListeners() {
    compactNode = document.getElementById('compact');
    midNode = document.getElementById('midsize');
    luxuryNode = document.getElementById('luxury');
    truckNode = document.getElementById('truck');
    rackNode = document.getElementById('rack');
    gpsNode = document.getElementById('gps');
    seatNode = document.getElementById('child');
    daysNode = document.getElementById('days');
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
        printOrder();
    });
    compactNode.addEventListener('change', printTotal);
    midNode.addEventListener('change', printTotal);
    luxuryNode.addEventListener('change', printTotal);
    truckNode.addEventListener('change', printTotal);
    rackNode.addEventListener('change', printTotal);
    gpsNode.addEventListener('change', printTotal);
    daysNode.addEventListener('change', printTotal);
}

// Prints the total at the bottom of the page
function printTotal() {
    let totalNode = document.getElementById('total');
    totalNode.textContent = `Total: $${getTotal().toFixed(2)}`;
}

// Prints the order confirmation
function printOrder() {
    let orderConfirmation = `<h3>Order Confirmation</h3>`;
    orderConfirmation += `<div>Thank you for your order! Your order details are:</div><br>`;
    orderConfirmation += `<div>${firstNameNode.value} ${lastNameNode.value}</div>`;
    orderConfirmation += `<div>${addressNode.value}</div>`;
    orderConfirmation += `<div>${stateNode.value}</div>`;
    orderConfirmation += `<div>${emailNode.value}</div>`;
    orderConfirmation += `<div>${phoneNode.value}</div>`;
    if (compactNode.checked) {
        orderConfirmation += '<div>Compact Car</div>';
    } else if (midNode.checked) {
        orderConfirmation += '<div>Mid-Size Car</div>';
    } else if (luxuryNode.checked) {
        orderConfirmation += '<div>Luxury Car</div>';
    } else if (truckNode.checked) {
        orderConfirmation += '<div>Truck or Van</div>';
    }
    if (rackNode.checked) {
        orderConfirmation += '<div>Roof or Bicycle Rack</div>';
    }
    if (gpsNode.checked) {
        orderConfirmation += '<div>GPS</div>';
    }
    if (seatNode.checked) {
        orderConfirmation += '<div>Child Seat</div>';
    }
    orderConfirmation += `<div>${daysNode.value} ${daysNode.value === 1 ? 'Day': 'Days'}</div>`;
    orderConfirmation += `<div>Total: $${getTotal().toFixed(2)}</div>`;
    document.getElementById('confirmation').innerHTML = orderConfirmation;
}

// Calculates the total cost
function getTotal() {
    let total = 0;
    let days = daysNode.value;
    if (compactNode.checked) {
        total = 15 * days;
    } else if (midNode.checked) {
        total = 20 * days;
    } else if (luxuryNode.checked) {
        total = 35 * days;
    } else if (truckNode.checked) {
        total = 40 * days;
    }
    if (rackNode.checked) {
        total += 5 * days;
    }
    if (gpsNode.checked) {
        total += 10;
    }
    return total;
}