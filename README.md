# node_mysql_storeFront

Node JS app will represent a store front such as amazon. 
This app will take orders from the customer. Once the order 
has been completed, the inventory will be updated in the 
database. 

The app will also provide a unique view only for the supervisor
as well.  This view will give them an outlook of the department performance and access to update the department overhead cost. 

Finally, the app will provide a manager view that will give 
access to the store database.  Allowing the user to create a new 
department and view the department profits.

Overall the app, makes use of the command line to view the different
app functions provided by node js.  Then Node JS will transalate the 
functions and either read or write against the mysql database. 

<!-- Commands to run the app -->
node bamazonCustomer

node bamazonManager 

node bamazonSupervisor














