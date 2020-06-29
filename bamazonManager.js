
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

}

function viewLowInventory(){

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

