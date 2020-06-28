
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

    
    function validateProductQuantity(id, quantity){

        var query = `SELECT STOCK_QUANTITY FROM PRODUCTS WHERE ITEM_ID = ${id}`;

        connection.query(query, function(err,data){
            if(err) throw err;


            for(var i = 0; i < data.length; i++){

                var dbQuantity = data[i].STOCK_QUANTITY;
                console.log(dbQuantity);

                if(dbQuantity < quantity){
                    return false
                }

            }

            return true;
        })

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

                var validation = validateProductQuantity(id,quantity);

                if(!validation) {
                    return console.log("Not Enough!");
                }
            })
    }



    function main(){
        // Display the products available for purchase
        getProducts()
        
    }


    main();




