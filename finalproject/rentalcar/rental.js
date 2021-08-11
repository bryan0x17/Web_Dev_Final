const dataRequest = new XMLHttpRequest();
let clientData;
let listNode;

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
    client = clientData.filter((element) => {
        return element['']
    });
}