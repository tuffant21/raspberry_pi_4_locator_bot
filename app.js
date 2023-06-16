const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const http = require('http');

const port = 8080;
const url = 'https://www.adafruit.com/product/';
const products = {
    '1GB': '4295',
    '2GB': '4292',
    '4GB': '4296',
    '8GB': '4564'
};
const checkInterval = 300000; // 5 minutes in milliseconds
const emailAddresses = {
    your_name: 'phone_number@provider.com'
};

let logs = [];

function addToLogs(message) {
    if (logs.length >= 10_000) {
        logs.shift();
    }

    logs.push(message);
    console.log(message);
}

async function sendEmail(product, elementId) {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // This assumes you're using Gmail
        auth: {
            user: 'your@email.com', // replace with your email
            pass: 'your_password' // replace with your password
        }
    });

    // loop over email addresses and email each
    for (const [name, emailAddress] of Object.entries(emailAddresses)) {
        const info = await transporter.sendMail({
            from: 'your@email.com', // sender address
            to: emailAddress, // list of receivers
            subject: '', // Subject line
            text: `The ${product} at ${url}${elementId} is now in stock.` // plain text body
        });

        addToLogs(`Message sent: ${info.messageId}`);
    }
}

async function isElementOutOfStock(page, elementId) {
    // Get the innerHTML of the specified element
    const element = await page.$(`#meta2_option_${elementId}`);
    const text = await (await element.getProperty('textContent')).jsonValue();
    return text.includes('Out of stock');
}

async function checkStock() {
    const browser = await puppeteer.launch({args: ['--no-sandbox'], headless: "new"});
    const page = await browser.newPage();

    // Navigate to the product page
    await page.goto('https://www.adafruit.com/product/4296');

    // loop over the products object and the key value pairs
    for (const [product, elementId] of Object.entries(products)) {
        const isOutOfStock = await isElementOutOfStock(page, elementId);

        if (isOutOfStock) {
            addToLogs(`${product} is out of stock (checked at ${new Date().toLocaleString()})`);
        } else {
            addToLogs(`${product} is in stock (checked at ${new Date().toLocaleString()})`);
            await sendEmail(product, elementId);
        }
    }

    await browser.close();
}

// Check stock immediately upon script start
checkStock();

// Set interval to check stock periodically
setInterval(checkStock, checkInterval);

// Create a server running on port 80
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        let output = '';
        output += '-------------------- Last 4 --------------------\n';
        output += logs.slice(-4).join('\n');
        output += '\n-------------------- Filter --------------------\n';
        output += logs.filter(log => !log.includes('is out of stock')).join('\n');
        res.end(output);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(port, () => {
    addToLogs(`Server is running on port ${port}`);
});
