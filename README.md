# Table and Form Editing
1. [Download](https://gitlab.com/tripetto/examples/angular/repository/master/archive.zip) or clone the [repository](https://gitlab.com/tripetto/examples/angular) to your local machine:
```bash
$ git clone https://github.com/besireren/table_and_form_edit.git
```

2. Run `npm install` inside the downloaded/cloned folder:
```bash
$ npm install
```

3. Start the api server by running the command below. 
```bash
$ npm run api
```

4. Start the server by running the command below. 
```bash
$ npm start
```

# Challanges
- Data should be fetched from a mocked API.
- Some of the data can be corrupted and deal with this.
- When the user clicks on edit inside of the table, then the view should change and there should
be a form available where some data of the table could be edited, but it should show all data.
- Data types and conditions
```bash
ID not editable
CAR not editable
INSTOCK Checkbox
HORSE POWER Number Input in the range of: 100 – 550 hp
PRICE Number Input with currency in mind
COLOR Radio Button with the name and the color example, get all colors out of the mock data
```
- Actions
```bash
Cancel Just switch back to the table
Save Only active if changes are made and should link back to the table were the data should also be changed
```
# Notes
- When you edit the corrupted data, you can re corrupted  the data with 'Corrupt The Data' button top-right
- Tests were not requested can be added if desired.
- Used latest Angular( 16.2.0 ) and Angular Material (16.2.7)


