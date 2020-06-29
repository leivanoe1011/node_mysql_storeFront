

    var mySql = require("mysql");

    var inquirer = require("inquirer");

    var appFunctions = ["Product By Department", "Create New Department"];

    var connection = mySql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "BAMAZON_DB"
    });

    function viewProductByDepartment(){

        var query = "SELECT " +
                "A.DEPARTMENT_ID " +
                ",A.DEPARTMENT_NAME " +
                ",A.OVERHEAD_COST " +
                ",SUM(COALESCE(B.PRODUCT_SALES,0)) PRODUCT_SALES " +
                ",(SUM(COALESCE(B.PRODUCT_SALES,0)) - OVERHEAD_COST ) TOTAL_PROFIT " +
                "FROM DEPARTMENTS A " +
            "JOIN PRODUCTS B " +
            "ON B.DEPARTMENT_NAME = A.DEPARTMENT_NAME " +
            "GROUP BY A.DEPARTMENT_NAME, A.DEPARTMENT_ID, B.PRODUCT_SALES, A.OVERHEAD_COST;";

        connection.query(query, function(err,data){
            if(err){
                connection.end();
                throw err;
            }

            for(var i = 0; i < data.length; i++){
                
            }
        })
    }


    function createNewDepartment(){

    }


    function main(){

        inquirer
        .prompt([
            {
                type: "list",
                name: "appFunc",
                message: "What function would you like to complete? ",
                choices: appFunctions
            }
        ])
        .then(answer => {

            var appFunc = answer.appFunc;

            switch(appFunc){
                case "Product By Department":
                    viewProductByDepartment();
                    break;
                case "Create New Department":
                    createNewDepartment();
                    break;
            }
        });
    }


