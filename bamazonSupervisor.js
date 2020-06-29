

    var mySql = require("mysql");

    var inquirer = require("inquirer");

    var appFunctions = ["Product By Department", "Create New Department"];


    function viewProductByDepartment(){

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


