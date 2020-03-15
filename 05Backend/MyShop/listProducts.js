var faker = require('faker');

console.log("===================\nWELCOME TO MY SHOP!\n===================\n");

for(var i = 0; i < 10; i++) {
	var randomName = faker.commerce.productName();
	var randomPrice = faker.commerce.price();
	console.log(randomName + " - $" + randomPrice);
}