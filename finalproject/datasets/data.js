/*
TODO: Split out the rest of the searches from search() following the format of threeOneOneSearch()
*/

const threeOneOneAPI = 'https://data.calgary.ca/resource/arf6-qysm.json';
const camerasAPI = 'https://data.calgary.ca/resource/dv2f-necx.json';
const crimeAPI = 'https://data.calgary.ca/resource/78gh-n26t.json';
const landAPI = 'https://data.calgary.ca/resource/33vi-ew4s.json';
const dataRequest = new XMLHttpRequest();
const asyncRequest = new XMLHttpRequest();

let data;
let resultTable;
let resultHeading;

// Sets event listeners for index page
function setMainListeners() {
    document.getElementById('crimeButton').addEventListener('click', function() {selectData('crime.html')});
    document.getElementById('311Button').addEventListener('click', function() {selectData('311.html')});
    document.getElementById('cameraButton').addEventListener('click', function() {selectData('cameras.html')});
    document.getElementById('landButton').addEventListener('click', function() {selectData('land.html')});
}

// Requests the [data].html page and the approriate JSON data
function selectData(typePage) {
	asyncRequest.onreadystatechange = loadData;
    asyncRequest.open("GET", typePage, true);
    asyncRequest.send();
    dataRequest.onreadystatechange = function() {
        if (dataRequest.readyState == 4 && dataRequest.status == 200) {
        data = JSON.parse(dataRequest.responseText);
        }
    };
    if (typePage === 'cameras.html') {
        dataRequest.open('GET', camerasAPI, true);
    } else if (typePage === '311.html') {
        dataRequest.open('GET', threeOneOneAPI, true);
    } else if (typePage === 'crime.html') {
        dataRequest.open('GET', crimeAPI, true);
    } else if (typePage === 'land.html') {
        dataRequest.open('GET', landAPI, true);
    }
    dataRequest.send();
}

// Inserts the appropriate page into index
function loadData() {
    if (asyncRequest.readyState == 4 && asyncRequest.status == 200) {
        document.getElementById('results').innerHTML = asyncRequest.responseText;
        setResultListeners();
    }   
}

// Sets the event listeners for the new page
function setResultListeners() {
    document.getElementById('firstCriteriaValue').addEventListener('input', search);
    document.getElementById('secondCriteriaValue').addEventListener('input', search);
    document.getElementById('thirdCriteriaValue').addEventListener('input', search);
    document.getElementById('fourthCriteriaValue').addEventListener('input', search);
    resultTable = document.getElementById('resultTable');
    resultHeading = document.getElementById('resultHeading');
}

// Searches the dataset based on the values entered in the search bars
function search() {
    // Clear the results table of old results every time new results are loaded
    clearSearch();
    let firstCriteria = document.getElementById('firstCriteriaName').textContent;
    // First checks which dataset is being searched and calls the appropriate search function
    if (firstCriteria === 'Request ID') {
        threeOneOneSearch();
    } else if (firstCriteria === 'Sector') {
        crimeSearch();
    } else if (firstCriteria === 'Camera ID') {
        cameraSearch();
    } else if (firstCriteria === 'Permit Number') {
        landSearch();
    }
}

function threeOneOneSearch() {
    let firstSearch = document.getElementById('firstCriteriaValue').value.toLowerCase();
    let secondSearch = document.getElementById('secondCriteriaValue').value.toLowerCase();
    let thirdSearch = document.getElementById('thirdCriteriaValue').value.toLowerCase();
    let fourthSearch = document.getElementById('fourthCriteriaValue').value.toLowerCase();
    // Store a new array of objects containing the filtered JSON data
    let returnedData = data;
    // Filter the data using every search criteria
    // Uses a startsWith() search to be more specific
    if (firstSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['service_request_id']) {
                return element['service_request_id'].toLowerCase().startsWith(firstSearch);
            }
        });
    }
    // Uses an includes() search to act like a wildcard search
    if (secondSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['service_name']) {
                return element['service_name'].toLowerCase().includes(secondSearch);
            }
        });
    }
    if (thirdSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['agency_responsible']) {
                return element['agency_responsible'].toLowerCase().includes(thirdSearch);
            }
        });
    }
    if (fourthSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['comm_name']) {
                return element['comm_name'].toLowerCase().startsWith(fourthSearch);
            }
        });
    }
    print311Results(returnedData);
    // Checks if all search bars are empty, and if so clears the result table
    if (!firstSearch && !secondSearch && !thirdSearch && !fourthSearch) {
        clearSearch();
    }
}

function crimeSearch() {
    let firstSearch = document.getElementById('firstCriteriaValue').value.toLowerCase();
    let secondSearch = document.getElementById('secondCriteriaValue').value.toLowerCase();
    let thirdSearch = document.getElementById('thirdCriteriaValue').value.toLowerCase();
    let fourthSearch = document.getElementById('fourthCriteriaValue').value;
    // Store a new array of objects containing the filtered JSON data
    let returnedData = data;
    // Filter the data using every search criteria
    if (firstSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['sector']) {
                return element['sector'].toLowerCase().startsWith(firstSearch);
            }
        });
    }
    if (secondSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['community_name']) {
                return element['community_name'].toLowerCase().startsWith(secondSearch);
            }
        });
    }
    if (thirdSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['category']) {
                return element['category'].toLowerCase().includes(thirdSearch);
            }
        });
    }
    if (fourthSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['year']) {
                return element['year'].startsWith(fourthSearch);
            }
        });
    }
    printCrimeResults(returnedData);
    // Checks if all search bars are empty, and if so clears the result table
    if (!firstSearch && !secondSearch && !thirdSearch && !fourthSearch) {
        clearSearch();
    }
}

function cameraSearch() {
    let firstSearch = document.getElementById('firstCriteriaValue').value;
    let secondSearch = document.getElementById('secondCriteriaValue').value.toLowerCase();
    let thirdSearch = document.getElementById('thirdCriteriaValue').value.toLowerCase();
    let fourthSearch = document.getElementById('fourthCriteriaValue').value.toLowerCase();
    // Store a new array of objects containing the filtered JSON data
    let returnedData = data;
    // Filter the data using every search criteria
    if (firstSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['id']) {
                return element['id'].startsWith(firstSearch);
            }
        });
    }
    if (secondSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['description']) {
                return element['description'].toLowerCase().includes(secondSearch);
            }
        });
    }
    if (thirdSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['community']) {
                return element['community'].toLowerCase().startsWith(thirdSearch);
            }
        });
    }
    if (fourthSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['quadrant']) {
                return element['quadrant'].toLowerCase().startsWith(fourthSearch);
            }
        });
    }
    printCameraResults(returnedData);
    if (!firstSearch && !secondSearch && !thirdSearch && !fourthSearch) {
        clearSearch();
    }
}

function landSearch() {
    let firstSearch = document.getElementById('firstCriteriaValue').value.toLowerCase();
    let secondSearch = document.getElementById('secondCriteriaValue').value.toLowerCase();
    let thirdSearch = document.getElementById('thirdCriteriaValue').value.toLowerCase();
    let fourthSearch = document.getElementById('fourthCriteriaValue').value.toLowerCase();
    // Store a new array of objects containing the filtered JSON data
    let returnedData = data;
    // Filter the data using every search criteria
    if (firstSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['permitnum']) {
                return element['permitnum'].toLowerCase().startsWith(firstSearch);
            }
        });
    }
    if (secondSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['description']) {
                return element['description'].toLowerCase().includes(secondSearch);
            }
        });
    }
    if (thirdSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['applicant']) {
                return element['applicant'].toLowerCase().startsWith(thirdSearch);
            }
        });
    }
    if (fourthSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['address']) {
                return element['address'].toLowerCase().startsWith(fourthSearch);
            }
        });
    }
    printLandResults(returnedData);
    if (!firstSearch && !secondSearch && !thirdSearch && !fourthSearch) {
        clearSearch();
    }
}

// Clears the result table
function clearSearch() {
    resultTable.innerHTML = '';
    resultHeading.className = 'hidden';
}

// Prints the results for the 311 Requests table
function print311Results(results) {
    let resultString = '';
    results.forEach((element) => {
        resultString += '<tr>';
        resultString += `<td>${element['service_request_id']}</td>`;
        resultString += `<td>${element['requested_date']}</td>`;
        resultString += `<td>${element['status_description']}</td>`;
        resultString += `<td>${element['service_name']}</td>`;
        resultString += `<td>${element['agency_responsible']}</td>`;
        resultString += `<td>${element['comm_name']}</td>`;
        resultString += `<td>${getLocationLink(element)}</td>`;
        resultString += '</tr>';
    });
    resultHeading.className = '';
    resultTable.innerHTML = resultString;
}

// Prints the results for the Crime Statistics table
function printCrimeResults(results) {
    let resultString = '';
    results.forEach((element) => {
        resultString += '<tr>';
        resultString += `<td>${element['sector']}</td>`;
        resultString += `<td>${element['community_name']}</td>`;
        resultString += `<td>${element['category']}</td>`;
        resultString += `<td>${element['crime_count']}</td>`;
        resultString += `<td>${element['date']}</td>`;
        resultString += `<td>${getLocationLink(element)}</td>`;
        resultString += '</tr>';
    });
    resultHeading.className = '';
    resultTable.innerHTML = resultString;
}

// Prints the results for the Camera Locations table
function printCameraResults(results) {
    let resultString = '';
    results.forEach((element) => {
        resultString += '<tr>';
        resultString += `<td>${element['id']}</td>`;
        resultString += `<td>${element['description']}</td>`;
        resultString += `<td>${element['quadrant']}</td>`;
        resultString += `<td>${element['community']}</td>`;
        resultString += `<td>${getLocationLink(element)}</td>`;
        resultString += '</tr>';
    });
    resultHeading.className = '';
    resultTable.innerHTML = resultString;
}

// Prints the results for the Land Applications table
function printLandResults(results) {
    let resultString = '';
    results.forEach((element) => {
        resultString += '<tr>';
        resultString += `<td>${element['permitnum']}</td>`;
        resultString += `<td>${element['description']}</td>`;
        resultString += `<td>${element['statuscurrent']}</td>`;
        resultString += `<td>${element['applieddate']}</td>`;
        resultString += `<td>${element['applicant']}</td>`;
        resultString += `<td>${element['fromlud']}</td>`;
        resultString += `<td>${element['proposedlud']}</td>`;
        resultString += `<td>${element['address']}</td>`;
        resultString += `<td>${getLocationLink(element)}</td>`;
        resultString += '</tr>';
    });
    resultHeading.className = '';
    resultTable.innerHTML = resultString;
}

// Takes the object and returns an anchor tag with a Google Maps link from the object's latitude and longitude properties
function getLocationLink(element) {
    let linkString = `<a href="https://www.google.com/maps/search/?api=1&query=`;
    if (element['lat'] && element['long']) {
        linkString += `${element['lat']},${element['long']}`;
    } else if (element['latitude'] && element['longitude']) {
        linkString += `${element['latitude']},${element['longitude']}`;
    } else {
        return 'Unavailable';
    }
    linkString += `" target="_blank">Location</a>`;
    return linkString;
}

setMainListeners();