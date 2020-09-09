const fs = require('fs')
const models = require('./models');

class FileService{

     writeToCSVFile() {
         const filename = 'output.csv';
         models.Item.find({}).exec().then((items)=>{
             fs.writeFile(filename, new FileService().extractAsCSV(items), err => {
                 if (err) {
                     console.log('Error writing to csv file', err);
                 } else {
                     console.log(`saved as ${filename}`);
                 }
             });
         }).catch({});
    }
    extractAsCSV (items) {
        const header = ["Purchase\tPrice\tCount\tSum"];
        const rows = items.map(item =>
            `${item.purchase}\t${item.price}\t${item.count}\t${item.sum}`
        );
        return header.concat(rows).join("\n");
    }

}

module.exports = FileService