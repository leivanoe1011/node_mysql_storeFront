
    var mySql = require("mysql");

    var inquirer = require("inquirer");

    var connection = mySql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "BAMAZON_DB"
    })


    var appFunctions = ["View Product", "View Low Inventory", "Add to Inventory", "Add New Product"];


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


    function addingInventory(product){

        inquirer
        .prompt([
            {
                type: "input",
                name: "quantity",
                message: "How much inventory would you like to add? "
            }
        ]) // end prompt
        .then(answer => {
            
            // Below we are adding to the existing Stock Quantity
            var query = `UPDATE PRODUCTS SET ` + 
                `STOCK_QUANTITY = ${answer.quantity} + STOCK_QUANTITY ` + 
                `WHERE PRODUCT_NAME = "${product}"`;
            connection.query(query, function(err,data){
                if(err){
                    connection.end();
                    throw err;
                }

                console.log("Stock Updated!");
            })

            connection.end();
        })
    }


    function addToInventory(){

        var query = "SELECT PRODUCT_NAME, DEPARTMENT_NAME, PRICE, STOCK_QUANTITY FROM PRODUCTS;";
        connection.query(query,function(err,data){

            if(err){
                connection.end();
                throw err;
            }

            var products = [];

            for(var i = 0; i < data.length; i++){

                console.log("*----------------------*");
                
                console.log(`Product Name: ${data[i].PRODUCT_NAME}`);
                console.log(`Department Name: ${data[i].DEPARTMENT_NAME}`);
                console.log(`Price: ${data[i].PRICE}`);
                console.log(`Stock Quantity: ${data[i].STOCK_QUANTITY}`);

                console.log("*----------------------*\n");

                products.push(data[i].PRODUCT_NAME);

            }
            
            inquirer
            .prompt([
                {
                    type: "list",
                    name: "product",
                    message: "What product you want to add inventory to? ",
                    choices: products
                }
            ]) // end prompt
            .then(answer => {
                var product = answer.product;

                addingInventory(product);

            });
            
        })

        // connection.end();
    }


    function addNewProduction(){

        inquirer
        .prompt([
            {
                type: "input",
                name: "product",
                message: "What is the product name you are adding?"
            },
            {
                type: "input",
                name: "department",
                message: "What department would you like to assign to the product? "
            },
            {
                type: "input",
                name: "price",
                message: "Assign price to the new product"
            },
            {
                type: "input",
                name: "quantity",
                message: "How much inventory for the new product? "
            }
        ])
        .then(answer => {

            var product = answer.product;
            var department = answer.department;
            var price = answer.price;
            var quantity = answer.quantity;

            var query = `INSERT INTO PRODUCTS(PRODUCT_NAME, DEPARTMENT_NAME,PRICE, STOCK_QUANTITY) ` +
                `VALUES("${product}", "${department}", ${price}, ${quantity});`;

            connection.query(query, function(err,data){
                if(err){
                    connection.end();
                    throw err;
                }

                console.log("New item added to Product List");
            })

            connection.end();
        })
    }


    function main(){

        inquirer
        .prompt([
            {
                type: "list",
                name: "managerOptions",
                message: "Select Function",
                choices: appFunctions
            }
        ]) // end prompt
        .then(answer => {
            var appFunc = answer.managerOptions;

            switch(appFunc){
                case "View Product":
                    viewProduct();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addToInventory();
                    break;
                case "Add New Product":
                    addNewProduction();
                    break;
            }
        
        });
    }


    main();



    //  if(appFunc === "View Product"){
    //     viewProduct();
    // }
    // else if(appFunc === "View Low Inventory"){
    //     viewLowInventory();
    // }
    // else if(appFunc === "Add to Inventory"){
    //     addToInventory();
    // }
    // else if(appFunc === "Add New Product"){
    //     addNewProduction();
    // }