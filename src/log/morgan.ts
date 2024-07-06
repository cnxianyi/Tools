import morgan from 'koa-morgan';
import fs from 'fs';

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(__dirname + '/access.log',
    { flags: 'a' })

let morganNet = morgan('combined', { stream: accessLogStream })

export default morganNet
