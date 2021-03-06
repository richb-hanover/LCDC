# About the LCDC/PB Questionnaire - March 2019

This is information collected in March 2019 from Lyme NH residents. 
The questions for the survey were created as a joint project of the 
Lyme Community Development Committee and the Lyme Planning Board.

The main web page has three tabs showing a summary view of the responses, 
the data from the individual responses, 
and this description of the project.

## How the information was collected

Rich Brown created a Google form at [https://docs.google.com/forms/d/1LKeUaDD-ZmvHBF9CXMqrhe-mKwtgsbTZqikuWHObkTI/edit](https://docs.google.com/forms/d/1LKeUaDD-ZmvHBF9CXMqrhe-mKwtgsbTZqikuWHObkTI/edit) to collect the information. 
David Robbins and Vicki Smith also have admin access to the form.

About 65 people entered the data on the form (online). 
Another ~84 people filled out the form on paper and mailed/returned it to the Town Offices.

Members of LCDC and PB manually entered those paper forms into the online form. 
Each paper form was numbered, and those numbers were entered manually as the first data in the "Other" field so we could track the data.

The data was exported as CSV from Google, then massaged to:

1. Add an "entry number" for each entry by converting the manually-entered number to its own column
3. Add a header row to give each of the columns a name
4. Convert the CSV to JSON using [http://www.convertcsv.com/csv-to-json.htm](http://www.convertcsv.com/csv-to-json.htm)
5. Tweak the result to make it a valid Javascript file by assigning the array to `responses` variable
5. This file becomes `LCDC-feedback.js`
6. Create a similar file containing the questions. It becomes `LCDC-questions.js`

The page reads data from the
LCDC-feedback.js and LCDC-questions.js files, and formats the data using
a touch of Javascript and CSS.

## Development/Test Procedure

The repository for these files is at: https://github.com/richb-hanover/LCDC 
It contains the original data, as well test procedures for the Javascript and CSS files. 

Run the `yarn` command below, then edit any `*.js`, `*.html`, and `*.css` file and the page will automatically reload in Firefox Developer Browser.
Setup files copied from Wes Bos' CSS-Grid course at 
[https://github.com/wesbos/css-grid](https://github.com/wesbos/css-grid)

``` sh
yarn install # to get started

yarn start # to start monitoring the files in the folder.
```
