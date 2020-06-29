

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

    function appendChar(str, charCnt, character){

        var tempString = "";

        for(var i = 0; i < charCnt; i++){
            tempString += character;
        }

        // We can create an if statement if we want to append the temp 
        // string to the front or back
        str += tempString;

        return str = str.substring(0, charCnt);

    }

    function appendLineBreak(fields){
         
        var columnNames = "";

        // Creating the underscore between columns and data
          for(var i = 0; i < fields.length; i++){
            var colName = fields[i].name;

            columnNames += "| ";

            for(var j = 0; j < colName.length; j++){
                columnNames += "-";
            }

            columnNames += " ";
        }
   
        return columnNames += "|";
    }


    function viewProductByDepartment(){

        var query = "SELECT " +
                "LPAD(A.DEPARTMENT_ID,2,0) DEPARTMENT_ID " +
                ",A.DEPARTMENT_NAME " +
                ",A.OVERHEAD_COST " +
                ",SUM(COALESCE(B.PRODUCT_SALES,0)) PRODUCT_SALES " +
                ",(SUM(COALESCE(B.PRODUCT_SALES,0)) - OVERHEAD_COST ) TOTAL_PROFIT " +
                "FROM DEPARTMENTS A " +
            "JOIN PRODUCTS B " +
            "ON B.DEPARTMENT_NAME = A.DEPARTMENT_NAME " +
            "GROUP BY A.DEPARTMENT_NAME, A.DEPARTMENT_ID, B.PRODUCT_SALES, A.OVERHEAD_COST;";

        connection.query(query, function(err,data,fields){

            var columnNames = "";

            if(err){
                connection.end();
                throw err;
            }

            // console.log(fields);
            // console.log(data);

            console.log("\n");

            for(var i = 0; i < fields.length; i++){
                columnNames += `| ${fields[i].name} `;
            }

            columnNames += "|";

            console.log(columnNames);

            columnNames = "";

            columnNames = appendLineBreak(fields);

            console.log(columnNames);
            

            for(var i = 0; i < data.length; i++){

                columnNames = "";

                var colCnt =  0;

                columnNames += `| ${appendChar(data[i].DEPARTMENT_ID, fields[colCnt].name.length, " ")} `;

                colCnt++;

                columnNames += `| ${appendChar(data[i].DEPARTMENT_NAME, fields[colCnt].name.length, " ")} `;

                colCnt++;

                columnNames += `| ${appendChar(data[i].OVERHEAD_COST, fields[colCnt].name.length, " ")} `;

                colCnt++;

                columnNames += `| ${appendChar(data[i].PRODUCT_SALES, fields[colCnt].name.length, " ")} `;

                colCnt++;

                columnNames += `| ${appendChar(data[i].TOTAL_PROFIT, fields[colCnt].name.length, " ")} |`;

                console.log(columnNames);

            }

            columnNames = appendLineBreak(fields);

            console.log(columnNames);

            console.log("\n");
            
        })

        connection.end();
    }


    function createNewDepartment(){

        inquirer
        .prompt([
            {
                type: "input",
                name: "departmentName",
                message: "What is the new Department Name? "
            },
            {
                type: "input",
                name: "overHeadCost",
                message: "What is the department overhead cost? "
            }
        ]) // end of Prompt
        .then(answer => {
            var query = `INSERT INTO DEPARTMENTS (DEPARTMENT_NAME,OVERHEAD_COST) ` +
                `VALUES("${answer.departmentName}", ${answer.overHeadCost})`;

            connection.query(query, function(err,data){
                if(err){
                    connection.end();
                    throw err;
                }

                console.log(`New Department ${answer.departmentName} Added!`);
            })

            connection.end();
        })

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


    main();


    function viewProductByDepartment1(){

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

        connection.query(query, function(err,data,fields){

            var columnNames = "";

            if(err){
                connection.end();
                throw err;
            }

            // console.log(fields);
            console.log(data);

            console.log("\n");

            for(var i = 0; i < fields.length; i++){
                columnNames += `| ${fields[i].name} `;
            }

            columnNames += "|";

            console.log(columnNames);

            columnNames = "";

            for(var i = 0; i < fields.length; i++){
                var colName = fields[i].name;

                columnNames += "| ";

                for(var j = 0; j < colName.length; j++){
                    columnNames += "-";
                }

                columnNames += " ";
            }
       
            columnNames += "|";

            console.log(columnNames);

            

            for(var i = 0; i < data.length; i++){

                columnNames = "";

                columnNames += `|${data[i].DEPARTMENT_ID}|`;
                columnNames += `|${data[i].DEPARTMENT_NAME}|`;
                columnNames += `|${data[i].OVERHEAD_COST}|`;
                columnNames += `|${data[i].PRODUCT_SALES}|`;
                columnNames += `|${data[i].TOTAL_PROFIT}|`;

                console.log(columnNames);

            }
        })

        connection.end();
    }


