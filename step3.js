const fs = require('fs');
const process = require('process')
const axios = require('axios');
let type = process.argv[2].slice(0,4);
let action = process.argv[2].slice(0,5);

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}: \n ${err}`);
            process.exit(1);
        } else if (action === '--out') {
            fs.writeFile(`${process.argv[3]}`, data, 'utf8', function (err) {
                if (err) {
                    console.log(`Couldn't wrtie ${process.argv[3]}: \n ${err}`);
                }
            });            
        } else {
            console.log(data)
        }

    });
}

async function webCat(url) {
    try {
        let response = await axios.get(`${url}`);
        if (action === '--out') {
            fs.writeFile(`${process.argv[3]}`, response.data, 'utf8', function (err) {
                if (err) {
                    console.log(`Couldn't write ${process.argv[3]}: \n ${err}`);
                }
            });
        } else {
            console.log(response.data)
        }

    } catch (err) {
        console.log(`Error fetching ${url}: \n ${err}`);
        process.exit(1);
    }
}


if (action === '--out') {
    if (process.argv[4].slice(0,4) === 'http') {
        webCat(process.argv[4]);
    } else {
        cat(process.argv[4]);    
    }
} else {
    if (type === 'http') {
        webCat(process.argv[2]);    
    } else {
        cat(process.argv[2]);
    }
}