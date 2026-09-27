require('dotenv').config();
const mailSender = require('./utils/mailSender');

async function test() {
    console.log("Testing email sending...");
    try {
        const info = await mailSender("nareshsolanki1095@gmail.com", "Test Subject", "<p>Test Body</p>");
        console.log("Success! Info:", info);
    } catch (e) {
        console.error("Test failed:", e);
    }
}
test();
