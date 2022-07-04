const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();

const staticFolder = path.resolve(__dirname, './www/');
if (!fs.existsSync(staticFolder)) {
    console.log("The static folder is required");
    process.exit(1);
}
app.use(express.static(staticFolder));

app.get('/*', (req, res) => {
    try {
        const indexHTML = path.resolve(staticFolder, 'index.html');

        if (!fs.existsSync(indexHTML)) {
            console.log("Without an index html");
            process.exit(1);
        }

        res.sendFile(indexHTML);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error");
    }
});

const port = process.env.PORT || 3001;
app.listen(port, error =>
    error ?
        console.log(error) :
        console.log("Server on")
);