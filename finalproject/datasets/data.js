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
    } else if (firstCriteria === 'Cuisine') {
        if (firstSearch) {
            returnedData = returnedData.filter((element) => {
                if (element['cuisine_description']) {
                    return element['cuisine_description'].toLowerCase().includes(firstSearch);
                }
            });
        }
        printRestoResults(returnedData);
    } else if (firstCriteria === 'School Name') {
        if (firstSearch) {
            returnedData = returnedData.filter((element) => {
                if (element['schoolname']) {
                    return element['schoolname'].toLowerCase().includes(firstSearch);
                }
            });
        }
        printSchoolResults(returnedData);
    }
    // Checks if both search bars are empty, and if so clears the result table
    if (!firstSearch && !secondSearch) {
        clearSearch();
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
                return element['service_name'].toLowerCase().includes(firstSearch);
            }
        });
    }
    if (thirdSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['agency_responsible']) {
                return element['agency_responsible'].toLowerCase().includes(firstSearch);
            }
        });
    }
    if (fourthSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['comm_name']) {
                return element['comm_name'].toLowerCase().startsWith(firstSearch);
            }
        });
    }
    print311Results(returnedData);
}

// Clears the result table
function clearSearch() {
    resultTable.innerHTML = '';
    resultHeading.className = 'hidden';
}

// Prints the results for the rat inspection table
function print311Results(results) {
    let resultString = '';
    results.forEach((element) => {
        resultString += '<tr>';
        resultString += `<td>${element['street_name']}</td>`;
        resultString += `<td>${element['house_number']}</td>`;
        resultString += `<td>${element['borough']}</td>`;
        resultString += `<td>${element['inspection_date']}</td>`;
        resultString += `<td>${element['result']}</td>`;
        resultString += '</tr>';
    });
    resultHeading.className = '';
    resultTable.innerHTML = resultString;
}

// Prints the results for the restaurant inspection table
function printRestoResults(results) {
    let resultString = '';
    results.forEach((element) => {
        resultString += '<tr>';
        resultString += `<td>${element['dba']}</td>`;
        resultString += `<td>${element['boro']}</td>`;
        resultString += `<td>${element['street']}</td>`;
        resultString += `<td>${element['zipcode']}</td>`;
        resultString += `<td>${element['cuisine_description']}</td>`;
        resultString += `<td>${element['inspection_date']}</td>`;
        resultString += `<td>${element['violation_description']}</td>`;
        resultString += `<td>${element['critical_flag']}</td>`;
        resultString += '</tr>';
    });
    resultHeading.className = '';
    resultTable.innerHTML = resultString;
}

// Prints the results for the cafeteria inspection table
function printSchoolResults(results) {
    let resultString = '';
    results.forEach((element) => {
        resultString += '<tr>';
        resultString += `<td>${element['schoolname']}</td>`;
        resultString += `<td>${element['borough']}</td>`;
        resultString += `<td>${element['street']}</td>`;
        resultString += `<td>${element['zipcode']}</td>`;
        resultString += `<td>${element['inspectiondate']}</td>`;
        resultString += `<td>${element['violationdescription']}</td>`;
        resultString += '</tr>';
    });
    resultHeading.classNameName = '';
    resultTable.innerHTML = resultString;
}

setMainListeners();