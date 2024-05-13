const fs = require('fs');
const process = require('process')
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}: \n ${err}`);
            process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(url) {
    try {
        let response = await axios.get(`${url}`);
        console.log(response.data);
    } catch (err) {
        console.log(`Error fetching ${url}: \n ${err}`);
        process.exit(1);
    }
}

let arg = process.argv[2].slice(0,4);

if (arg == 'http') {
    webCat(process.argv[2]);
} else {
    cat(process.argv[2]);
}


