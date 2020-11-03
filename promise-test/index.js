const fs = require('fs')
const path = require('path')

const fullFileName = path.resolve(__dirname, 'files', 'a.json');
fs.readFile(fullFileName, (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(data.toString())
})

