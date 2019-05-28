# LCDC/PB Questionnaire - March 2019

This repository contains information collected in March 2019 from Lyme NH residents. 
The questions for the survey were created as a joint project of the Lyme Community Development Committe and the Lyme Planning Board.

## How the information was collected

Rich Brown created a Google form at [https://docs.google.com/forms/d/1LKeUaDD-ZmvHBF9CXMqrhe-mKwtgsbTZqikuWHObkTI/edit](https://docs.google.com/forms/d/1LKeUaDD-ZmvHBF9CXMqrhe-mKwtgsbTZqikuWHObkTI/edit) to collect the information. 
David Robbins and Vicki Smith also have admin access to the form.

About 65 people entered the data on the form (online). 
Another ~84 people filled out the form on paper and mailed/returned it to the Town Offices.

Members of LCDC and PB manually entered those paper forms into the online form. 
Each paper form was numbered, and those numbers were entered manually as the first data in the "Other" field so we could track the data.

The data was exported as CSV from Google, then massaged to:

1. Add an "entry number" for each entry
2. Convert the manually-entered number to its own column
3. Add a header row to give each of the columns a name
4. Convert to JSON using [http://www.convertcsv.com/csv-to-json.htm](http://www.convertcsv.com/csv-to-json.htm)
5. Tweak the result to make it a valid Javascript file by assigning the array to `responses` variable
5. This file becomes `LCDC-feedback.js`
6. Create a similar file containing the questions. It becomes `LCDC-questions.js`

There are two web pages: `index.html` and `responses.html` 
These provide different views on the data. 
They read data from the LCDC-feedback.js and LCDC-questions.js files, and format it using a touch of Javascript and CSS.

## Development/Test Procedure

This repository allows easy testing of the Javascript and CSS files. 
Edit any index.js, index.html, and .css files with live reloading in Firefox Developer Browser.
Setup files stolen from Wes Bos' CSS-Grid course at 
[https://github.com/wesbos/css-grid](https://github.com/wesbos/css-grid)

``` sh
yarn install # to get started

yarn start # to start monitoring the files in the folder.
```
