const bookService = require("../service/bookService");
const path = require('path');
const fs = require('fs');
function generateRandomBookData() {

    const imagePath = path.join(__dirname, '../static', 'capybara.jpeg');

    const imageBuffer = fs.readFileSync(imagePath);


    const randomTitle = 'Book ' + Math.floor(Math.random() * 1000);
    const randomPrice = (Math.random() * 100).toFixed(2);
    const randomDescription = 'Random description for ' + randomTitle;
    const randomPhone = '+3467546734';
    const randomEmail = 'email' + Math.floor(Math.random() * 1000) + '@gmail.com';
    const randomUserId = 1;

    return {
        title: randomTitle,
        price: randomPrice,
        description: randomDescription,
        contact_phone: randomPhone,
        contact_email: randomEmail,
        image: imageBuffer,
        userId: randomUserId,
    };
}

module.exports = {
    generateRandomBookData,
};