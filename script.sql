
DROP DATABASE IF EXISTS BAMAZON_DB;

CREATE DATABASE BAMAZON_DB;

USE BAMAZON_DB;

CREATE TABLE PRODUCTS
(

    ITEM_ID INT NOT NULL AUTO_INCREMENT,
    	PRIMARY KEY(ITEM_ID),

    PRODUCT_NAME VARCHAR(500) NOT NULL,
    DEPARTMENT_NAME VARCHAR(500) NOT NULL,
    PRICE FLOAT NOT NULL,
    STOCK_QUANTITY INT NOT NULL -- how much product available
);

-- Populate 10 products

INSERT INTO PRODUCTS (PRODUCT_NAME, DEPARTMENT_NAME,PRICE, STOCK_QUANTITY)
VALUES("cup","home",2.5,25)
,("beer","liquor",4.5,15)
,("laptop","electronic",200.99,18)
,("banana","produce",0.5,12)
,("cough drops","pharmacy",3.5,22)
,("beer","liquor",2.5,25)
,("jordan shoes","shoes",100.25,9)
,("sofa","furniture",25.5,14)
,("spoon","kitchen",1.5,30)
,("uno","toys",3.5,19);

-- SELECT * FROM PRODUCTS

