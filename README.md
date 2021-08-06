PART A:

Create a directory titled ‘datasets’ under cprg256/finalproject.

The City of Calgary publishes data about city operations and can be found here: https://data.calgary.ca . On the site, you can click on ‘Datasets’ and on some of the links, you will see a small link to API docs.

 

Clicking on API Docs will bring you to the next page:

 

The highlighted area is the link to the json file for this dataset. You use this hyperlink in you ‘AJAX’ call to retrieve the data. You can view the json file by selecting the </>json drop down menu and choosing json. Note: It may take a few minutes to generate the data; some of the datasets are quite large.

Here are some datasets:

Traffic Incidents: https://data.calgary.ca/resource/35ra-9556.json 
Traffic Cameras: https://data.calgary.ca/resource/k7p9-kppz.json
Crime Stats: 	 https://data.calgary.ca/resource/848s-4m4z.json
Building Permits: https://data.calgary.ca/resource/c2es-76ed.json

Here is a sample of the json file for the Building Permit datasets:
{
        "permitnum": "BP2021-04324",
        "statuscurrent": "In Review",
        "applieddate": "2021-03-22T00:00:00.000",
        "permittype": "Single Construction Permit",
        "permittypemapped": "Building",
        "permitclass": "1106 - Single Family House",
        "permitclassgroup": "Single Family",
        "permitclassmapped": "Residential",
        "workclass": "New",
        "workclassgroup": "New",
        "workclassmapped": "New",
        "description": "SFD,GARAGE,PORCH,",
        "contractorname": "JAYMAN MASTERBUILT / WENDI INTERIORS",
        "housingunits": "1",
        "estprojectcost": "295360.54",
        "totalsqft": "1807",
        "originaladdress": "330 RED SKY TC NE",
        "communitycode": "RSN",
        "communityname": "REDSTONE",
        "latitude": "51.17361948379003",
        "longitude": "-113.94850406578414",
        "location": {
            "latitude": "51.17361948379003",
            "longitude": "-113.94850406578414",
            "human_address": "{\"address\": \"\", \"city\": \"\", \"state\": \"\", \"zip\": \"\"}"
        },
        "locationcount": "1",
        "locationtypes": "Titled Parcel",
        "locationaddresses": "330 RED SKY TC NE",
        "locationswkt": "POINT (-113.94850406578414 51.17361948379003)",
        "locationsgeojson": "{\"type\":\"Point\",\"coordinates\":[-113.94850406578414,51.17361948379003]}",
        ":@computed_region_4b54_tmc4": "11",
        ":@computed_region_4a3i_ccfj": "4",
        ":@computed_region_kxmf_bzkv": "3",
        ":@computed_region_p8tp_5dkv": "1"
    }

Other datasets will have their own structure. 
Please note, there is no consistent format between datasets.

 
Requirements

For this assignment, you have the choice of using any of the above dataset or finding other datasets from https://data.calgary.ca . 

VITAL: Your dataset must include a location that includes latitude and longitude.

This assignment will require the use of HTML, CSS, JavaScript and AJAX. 

Create the file index.html. This will be the first page of the assignment. You are to create a web page with a creative a pleasing interface that lists and describes the four datasets that can be searched.

When a dataset is selected an AJAX call will load the html page containing a form that will allow the dataset to be searched. 
	
The form will require no less than 4 and no more than 5 entries that can be searched. DO NOT SEARCH ON LATITUDE AND LONGITUDE.

Search Criteria

You have some options on how to search for data.

Search fields may be connected to a unique Event Listener that is set to call a function when the ‘keyup’ or ‘onkeyup’ event occurs. As data is typed into the search field, the search function will display all records that start with that search string.

-	Example: If you are searching by ‘id’ and you enter ‘2’ all the records with ‘id’ starting with ‘2’ will be displayed. If you enter ‘25’ all the records with ‘id’ starting with ‘25’ will be displayed.

A search field can also provide a range for data:

	-Example: You want to list all building permits with an estimated project cost greater than $100 000

You do not need to display all of the data from the dataset record as they can be quite large. Choose the most relevant data from the dataset records.

Display location using Google Maps

The user will have the option of selecting a search result and view the location on google maps. When a records is selected, a new window tab will open and display a Google Map with the ‘pin’ at the latitude and longitude of the search result. 

Example

NOTE: This is only a partial example of the required functionality. This generates a list of possible records and a corresponding link to display the location on a google map.
 

 

Clicking on one of the links displays the following:

 

 
PART B:

Create a subdirectory titled ‘quiz’ under cprg256/finalproject.


You are to create a web page that will display a quiz and create the necessary JavaScript to complete the following:

-	Process the ‘finalquiz.xml’ file to display the multiple choice questions within the index.html page. Each question has 4 possible answers. 

-	Create a function that will grade the quiz and display the grade out of 5. Within ‘finalquiz.xml’ is an element ‘rightanswers’ that has a comma delimited string with the correct answers. Use CSS to create an appropriate interface.

Here is an example of what the page could look like:

Question 1:

In a switch statement, the ________ case clause is used to process exceptional conditions and is usually listed last.

o	A) break
o	B) default
o	C) else
o	D) then

At the end of the quiz, create a button ‘Grade Quiz’ that will display the number of correct answers out of five. E.g. ‘Grade 3/5’


Part C:

Create a subdirectory titled ‘rentalcar’ under cprg256/finalproject. 

Your application will require ‘rentalclients.json’.

Your task is to create the Web Application for ‘Dodgy Brakes Car Rental’.  The index.html page will have a ‘header’ and ‘footer’ that will display a company logo and the current date and time. Include a suitable background photo for the page and a link to ‘rental.html’.

The ‘rental.html’ page, has the following functionality:

Your page will include a ‘search’ field and a ‘car rental’ form. The ‘car rental’ form will be un-editable until a client is found and selected. 
The ‘search’ field will search ‘rentalclient.json’ by last name. As you enter letters, the search function will find and display all the clients whose last names start with those letters. 

Example: If you enter ‘B’, all the clients with a last name’ that starts with ‘B’ will be displayed. When you type ‘Br’ all the clients with a last name’ that starts with ‘Br’ are displayed.

NOTE: Only display the Last and First Names of the clients.

You can then select a client from the list. This ‘event’ will make the ‘car rental’ form editable.

After a client is selected, the client information will be displayed in the ‘car rental’ form. E.g. last name, first name, address, state/prov, email and phone.

The client can then choose to rent a vehicle. The rental choices are: 

Compact	$15/day
Mid-size	$20/day 
Luxury		$35/day
Van/Truck	$40/day

Note: Include a picture of a vehicle next to each of the rental choices.

Options: Roof Rack or Bicycle Rack extra $5/day 
	   GPS extra $10 
	   Child Seat free

The client can rent from 1 to 30 days. 

After this information is selected, the total of the rental is calculated and the complete client and rental information will be displayed on the page.