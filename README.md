# Bamazon

In this app, the user will have the ability to see a list of products and order them in multiple quantities, one product at at time. When the user runs node bamazonCustomer, the list of available products will display, along with their id, description, quantity in stock, and price. Bamazon will prompt the user to choose an id, and then will ask the user to specify the quantity he/she wishes to order. There are validations in place to ensure that the user chooses a valid number for both the item id and the quantity.

If the user tries to order more quantity than Bamazon has in stock, the user will receive a warning and will go back to the first prompt. If the purchase is successful, the database is updated, the user will be prompted to make another purchase. The total price of the purchase is also displayed at the end of each individual purchase. 

A video walkthrough of the Bamazon app as well as validations can be found at:
https://drive.google.com/file/d/1oHo_6l9_MQtNMtnWrVXF23Af2ZSvaAhZ/view