
// Running this application will first display all of the items available for sale

var mySql = require("mysql");

var inquirer = require("inquirer");

var connection = mySql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "BAMAZON_DB"
})

function getProducts(){

    connection.connect(err => {
        if(err) throw err;
        console.log("Connection Successful!");

        var query = "SELECT * FROM PRODUCTS";

        connection.query(query,function(err,data){

            if(err) throw err;

            for(var i = 0; i < data.length; i++){
                console.log("*---------------------------------*");

                console.log(`Item ID: ${data[i].ITEM_ID}`);
                console.log(`Product Name: ${data[i].PRODUCT_NAME}`);
                console.log(`Department Name: ${data[i].DEPARTMENT_NAME}`);
                console.log(`Price: ${data[i].PRICE}`);
                console.log(`Stock Quantity: ${data[i].STOCK_QUANTITY}`);

                console.log("*---------------------------------*\n");
            }

        })
    
        connection.end();
    })

}


getProducts();




