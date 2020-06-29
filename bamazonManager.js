
var mySql = require("mysql");

var inquirer = require("inquirer");

var connection = mySql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "BAMAZON_DB"
})


function viewProduct(){
    
    var query = "SELECT PRODUCT_NAME, DEPARTMENT_NAME, PRICE, STOCK_QUANTITY FROM PRODUCTS;";
    connection.query(query,function(err,data){

        if(err){
            connection.end();
            throw err;
        }

        for(var i = 0; i < data.length; i++){

            console.log("*----------------------*");
              
            console.log(`Product Name: ${data[i].PRODUCT_NAME}`);
            console.log(`Department Name: ${data[i].DEPARTMENT_NAME}`);
            console.log(`Price: ${data[i].PRICE}`);
            console.log(`Stock Quantity: ${data[i].STOCK_QUANTITY}`);

            console.log("*----------------------*\n");

        }
        
    })

    connection.end();
 
}


function viewLowInventory(){

    var query = "SELECT " + 
        "PRODUCT_NAME, DEPARTMENT_NAME, PRICE, STOCK_QUANTITY " + 
        "FROM PRODUCTS ORDER BY STOCK_QUANTITY ASC;";

    connection.query(query, function(err,data){
        if(err){
            connection.end();
            throw err;
        }

        for(var i = 0; i < data.length; i++){
            console.log("*----------------------*");
              
            console.log(`Product Name: ${data[i].PRODUCT_NAME}`);
            console.log(`Department Name: ${data[i].DEPARTMENT_NAME}`);
            console.log(`Price: ${data[i].PRICE}`);
            console.log(`Stock Quantity: ${data[i].STOCK_QUANTITY}`);

            console.log("*----------------------*\n");
        }
    })

    connection.end();

}

function addToInventory(){

}

function addNewProduction(){

}


function main(){
    inquirer
    .prompt([
        {
            type: "list",
            name: "managerOptions",
            message: "Select Function",
            choices: ["View Product", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]) // end prompt
    .then(answer => {
        var appFunc = answer.managerOptions;
        if(appFunc === "View Product"){
            viewProduct();
        }
        else if(appFunc === "View Low Inventory"){
            viewLowInventory();
        }
        else if(appFunc === "Add to Inventory"){
            addToInventory();
        }
        else if(appFunc === "Add New Product"){
            addNewProduction();
        }
    })
}


main();



function viewSpecificProduct(){
    
    var query = "SELECT PRODUCT_NAME, DEPARTMENT_NAME FROM PRODUCTS;";
    connection.query(query,function(err,data){

        if(err){
            connection.end();
            throw err;
        }

        var products = [];

        for(var i = 0; i < data.length; i++){
            console.log("*----------------------*");

            console.log(`Product Name: ${data[i].PRODUCT_NAME}`);
            console.log(`Product Name: ${data[i].DEPARTMENT_NAME}`);

            console.log("*----------------------*\n");

            products.push(data[i].PRODUCT_NAME);
        }


        inquirer
        .prompt([
            {
                type: "list",
                name: "product",
                message: "What product you would like to view? ",
                choices: products
            }
        ])
        .then(answer => {
            var product = answer.product;
            query = `SELECT PRODUCT_NAME, DEPARTMENT_NAME FROM PRODUCTS WHERE PRODUCT_NAME = ${product};`

            connection.query(query, function(err,data){
                if(err){
                    connection.end();
                    throw err;
                }

                for(var i = 0; i < data.length; i++){
                    
                    console.log("*----------------------*");
              
                    console.log(`Product Name: ${data[i].PRODUCT_NAME}`);
                    console.log(`Product Name: ${data[i].DEPARTMENT_NAME}`);
                    console.log(`Product Name: ${data[i].PRICE}`);
                    console.log(`Product Name: ${data[i].STOCK_QUANTITY}`);
        
                    console.log("*----------------------*\n");
                }

                connection.end();
                
            })
        })
        
    })
 
}
