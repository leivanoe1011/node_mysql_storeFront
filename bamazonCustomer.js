
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

    
    function getProductQuantity(id, quantity){

        var query = `SELECT PRICE, STOCK_QUANTITY FROM PRODUCTS WHERE ITEM_ID = ${id}`;

        connection.query(query, function(err,data){
            if(err) throw err;


            for(var i = 0; i < data.length; i++){

                var item = 
                {
                    price: data[i].PRICE,
                    quantity: data[i].STOCK_QUANTITY
                };

                console.log(item);

                return item;

            }

        })

        // connection.end();
    }


    function placeOrder(id, quantity, item){

        var currentQuantity = item.quantity - quantity;
        var price = item.price * quantity;

        var query = `UPDATE PRODUCTS SET STOCK_QUANTITY = ${currentQuantity} WHERE ITEM_ID = ${id};`;

        connection.query(query, function(err,data){
            if(err) throw err;

            console.log(`Product Updated to New Quantity ${quantcurrentQuantityity}`);
            console.log(`Price $${price}`);
        });

        connection.end();
    }


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

                userInput();

            })
        
            // connection.end();
        })

    }




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

                var item = getProductQuantity(id,quantity);

                if(item.quantity < quantity) {
                    return console.log("Insufficient quantity!!");
                }

                getProducts(id, quantity, item);
            })
    }



    function main(){
        // Display the products available for purchase
        getProducts()
        
    }


    main();




