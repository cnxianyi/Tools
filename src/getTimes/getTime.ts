const Router = require('koa-router');
const fs = require('fs');
const path = require('path');


function zeroPad(num: number) {
    return num < 10 ? `0${num}` : num;
}

const getTimes = new Router({
    prefix: '/getTimes'
});

let mon = new Date();
let year = mon.getFullYear();
let month = zeroPad(mon.getMonth() + 1); // getMonth() returns a zero-based value
let day = zeroPad(mon.getDate());

let formattedDate = `${year}-${month}-${day}`;
let fileName = `${formattedDate}.json`;

let filePath = path.join(__dirname, fileName);

// Check if the file exists and create it if it doesn't
fs.access(filePath, fs.constants.F_OK, (err: any) => {
    if (err) {
        // File does not exist, create it
        fs.writeFile(filePath, '', (err: any) => {
            if (err) throw err;
            console.log(`${fileName} has been created`);
        });
        fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
    } else {
        console.log(`${fileName} already exists`);
    }
});

getTimes.post('/', async (ctx: any) => {
    const data = ctx.request.body;
    //console.log(data);
    
    // Path to the JSON file
    const filePath = path.join(__dirname, fileName);

    try {        
        let fileData = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            fileData = JSON.parse(fileContent);            
        }        
        // console.log(fileData);
        // console.log(data);
        
        // // Append the new data
        fileData.push(data)
        console.log(JSON.stringify(fileData, null, 2));
        
        // // Write updated data back to the JSON file
        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');

        ctx.status = 201;
        ctx.body = 'Data saved successfully';
    } catch (error: any) {
        console.log(2);
        
        ctx.status = 500;
        ctx.body = {
            error: 'Failed to save data',
            details: error.message
        };
    }
});

export default getTimes;
