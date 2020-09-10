const fs = require('fs')
let itemsRepository = require('./repositories/items_repository');
class FileService{

    async writeToCSVFile() {
         const filename = 'output.csv';
         const items = await itemsRepository.getItems();
             fs.writeFile(filename, new FileService().extractAsCSV(items), err => {
                 if (err) {
                     console.log('Error writing to csv file', err);
                 } else {
                     console.log(`saved as ${filename}`);
                 }
             });

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