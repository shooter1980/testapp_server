const fs = require('fs')

class FileService{

     writeToCSVFile(items) {
        const filename = 'output.csv';
        fs.writeFile(filename, extractAsCSV(items), err => {
            if (err) {
                console.log('Error writing to csv file', err);
            } else {
                console.log(`saved as ${filename}`);
            }
        });
    }

     extractAsCSV(items) {
        const header = ["Purchase, Price, Count, Sum"];
        const rows = items.map(item =>
            `${item.purchase}, ${item.price}, ${item.count} , ${item.sum}`
        );
        return header.concat(rows).join("\n");
    }
}

module.exports = FileService