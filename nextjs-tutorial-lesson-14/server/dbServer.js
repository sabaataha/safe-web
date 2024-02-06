const express = require('express');
const fs = require('fs');
const PORT = 5000;

const newData = { name: 'John', age: 30 };

// Read existing data from JSON file
fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
        // console.error(err);
        return;
    }
    let jsonData;
    try {
        jsonData = JSON.parse(data);
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        return;
    }

    // If jsonData is not an array, initialize it as an empty array
    if (!Array.isArray(jsonData)) {
        jsonData = [];
    }

    // Add new data to existing data
    jsonData.push(newData);

    // Write updated data back to JSON file
    fs.writeFile('db.json', JSON.stringify(jsonData), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data written to file');
    });
});
