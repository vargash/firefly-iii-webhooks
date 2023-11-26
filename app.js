const express = require('express');
const app = express();
const port = 3000;
const fireflyHost = process.env.FIREFLY_HOST || '';
const fireflyBearerToken = process.env.FIREFLY_BEARER_TOKEN || '';

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.post('/transaction', (req, res) => {
    const { id, transactions } = req.body.content;
    try {
        processTransactions(id, transactions);
        res.sendStatus(200); // Return success response
    } catch (error) {
        console.error("Error calling processTransactions");
        console.error(error); // Log the error to the console
        res.sendStatus(500); // Return error response
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function processTransactions(id, transactions) {
    let updatedTransactions = [];

    for (let transaction of transactions) {
        if (transaction.tags.includes("DataCorretta")) {
            continue;
        }

        let date = transaction.date;
        let payment_date = transaction.payment_date;  

        transaction.tags.push("DataCorretta");

        let updatedTransaction = {
            book_date: date,
            date: payment_date,
            tags: transaction.tags
        };

        updatedTransactions.push(updatedTransaction);
    }

    // HTTP PUT call
    console.debug(JSON.stringify({
        apply_rules: true,
        fire_webhooks: true,
        transactions: updatedTransactions
    }));
    fetch(`${fireflyHost}/api/v1/transactions/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${fireflyBearerToken}`
        },
        body: JSON.stringify({
            apply_rules: true,
            fire_webhooks: true,
            transactions: updatedTransactions // Send the updated transactions array
        })
    })
    .then(response => response.json()) // Parse the response as JSON
    .then(result => {
        console.debug("Request completed successfully");
        console.debug(result); // Print the result
    })
    .catch(error => {
        console.error("Error calling firefly");
        console.error(error); // Log the error to the console
        throw error; // Rethrow the error
    });
}