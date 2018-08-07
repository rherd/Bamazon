// Create a MySQL Database called bamazon.
// Then create a Table inside of that database called products.
// The products table should have each of the following columns:

//DONE.

// item_id (unique id for each product)
// product_name (Name of product)
// department_name
// price (cost to customer)
// stock_quantity (how much of the product is available in stores)

//DONE.

// Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

//DONE.

// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
// The app should then prompt users with two messages.

var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

var connection = mysql.createConnection({
  host: "Localhost",
  port: 3306,

  user: "root",
  password: "root",
  database: "bamazon"
});
connection.connect(function(err) {
  if (err) throw err;
  displayData();
});

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
function displayData() {
  connection.query(
    "select * from products",
    function(err, res) {
      if (err) throw err;

      console.table(res);

      startUp();
    }
  );
}

function startUp() {
  inquirer
    .prompt({
      name: "id",
      type: "input",
      message: "What'll ya have?"
    })
    .then(function(answer) {
      //console.log(parseFloat(answer.id));
      if (parseFloat(answer.id)) {
        howMany(answer.id);
      } else {
        console.log("\nPlease enter a valid value!\n");
        console.log("\n-----------------------------------------\n");
        startUp();
      }
    });
}

function howMany(id) {
  inquirer
    .prompt({
      name: "quantity",
      type: "input",
      message: "How many of product " + id + " do you want?"
    })
    .then(function(answer) {
      //console.log("test");

      if (parseFloat(answer.quantity)) {
        var query = connection.query(
          "select count(*) count from products where ? and stock_quantity >= ?",
          [
            {
              item_id: id
            },
            answer.quantity
          ],
          function(err, res) {
            if (err) throw err;

            //console.log(res);

            if (res[0].count > 0) {
              console.log(
                "Your purchase of " +
                  answer.quantity +
                  " of product " +
                  id +
                  " is currently processing..."
              );
              console.log("\n-----------------------------------------\n");
              updateDB(id, answer.quantity);
            } else {
              console.log("You ordered too many!");

              console.log("\n-----------------------------------------\n");
              startUp();
            }

            //call next function here.
          }
        );
      } else {
        console.log("\nPlease enter a valid value!\n");
        console.log("\n-----------------------------------------\n");
        howMany(id);
      }

      //console.log(query.sql);
    });
}

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

function updateDB(id, quantity) {
  // However, if your store does have enough of the product, you should fulfill the customer's order.

  connection.query(
    "update products set stock_quantity = stock_quantity - ? where item_id = ?",
    [quantity, id],
    function(err, res) {
      if (err) throw err;

      //console.log(res);
      console.log("Purchase successful!");

      console.log("\n-----------------------------------------\n");
      //call next function here.
    }
  );

  connection.query(
    "select price * ? total_price from products where item_id = ?",
    [quantity, id],
    function(err2, res2) {
      if (err2) throw err2;
      console.log("Your total price is $" + res2[0].total_price);
    }
  );
}
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.
