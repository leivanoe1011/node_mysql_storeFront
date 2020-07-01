
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


    // This function will update the inventory
    function placeOrder(id, quantity, item){

        var currentQuantity = item.quantity - quantity;
        var price = item.price * quantity;

        var query = `UPDATE PRODUCTS `+ 
            `SET STOCK_QUANTITY = ${currentQuantity}, ` + 
            `PRODUCT_SALES = ${price} + COALESCE(PRODUCT_SALES,0), ` +
            `PRODUCT_SOLD = ${quantity} + COALESCE(PRODUCT_SOLD,0) ` +
            `WHERE ITEM_ID = ${id};`;

        connection.query(query, function(err,data){
            if(err) {
                connection.end();
                throw err
            };

            console.log(`Product Updated to New Quantity ${currentQuantity}`);
            console.log(`Price $${price}`);
        });

        connection.end();
    }

    
    // Once we capture the item ID and Quantity of the purchase the customer 
    // will like to make, then we update the inventory
    function getProductQuantity(id, quantity){

        var query = `SELECT PRICE, STOCK_QUANTITY FROM PRODUCTS WHERE ITEM_ID = ${id}`;

        connection.query(query, function(err,data){
            if(err) {
                connection.end();
                throw err
            };


            for(var i = 0; i < data.length; i++){

                var item = 
                {
                    price: data[i].PRICE,
                    quantity: data[i].STOCK_QUANTITY
                };

                console.log("In for loop");
                console.log(item);

            
                if(item.quantity < quantity) {
                    return console.log("Insufficient quantity!!");
                }

                placeOrder(id, quantity, item);

            }

        })

        // connection.end();
    }


    // We first display the products to the customer
    function getProducts(){

        connection.connect(err => {
            if(err) {
                connection.end();
                throw err
            };

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

                // We ask the customer what product they will like to purchase
                userInput();

            })
        
            // connection.end();
        })

    }


    // Here we capture the user input
    function userInput(){

        inquirer
            .prompt([
                {
                    type: "input",
                    name: "itemId",
                    message: "Type the ID of the item you would like to purchase"
                },
                {
                    type: "input",
                    name: "itemQuantity",
                    message: "How many?"
                }
            ])
            .then(answer => {
                
                var id = answer.itemId;
                var quantity = answer.itemQuantity;

                getProductQuantity(id,quantity);

            })
    }


    // The app will begin here
    function main(){
        // Display the products available for purchase
        getProducts()
        
    }


    // We call main to kick off our app
    main();




