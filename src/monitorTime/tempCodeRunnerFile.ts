import Router from 'koa-router';
import { exec } from 'child_process';
import util from 'util';

// Function to zero-pad numbers less than 10

const execPromise = util.promisify(exec);

const monitorTime = new Router({
    prefix: '/monitorTime'
});

const WindowTitle = /"WindowTitle":\s*([^,]*)/;
const ProcessName = /"ProcessName":\s*([^\r]*)/;

function getTimezoneDate(date: Date, timezoneOffset: number): Date {
    // 获取当前时间的 UTC 时间
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);

    // 根据时区偏移量计算目标时间
    const targetDate = new Date(utc + (timezoneOffset * 3600000));

    return targetDate;
}

let date = new Date()
let timezoneOffset = 8; // +8 时区
let dateInTargetTimezone;

interface Time {
    date: string,
    title: string,
    process: string
}

let times: object[] = [];
let time: Time;

// setInterval(async () => {

//     try {
//         // Set code page to 65001 (UTF-8) and then run the PowerShell script
//         const { stdout, stderr } = await execPromise('powershell.exe -Command "& {chcp 65001; .\\src\\monitorTime\\monitor.ps1}"', { encoding: 'utf8' });

//         const Title = stdout.match(WindowTitle);
//         const Process = stdout.match(ProcessName);

//         //去除匹配结果中的前后引号和多余的空格
//         const TitleResult = Title![1].trim().replace(/^"(.*)"$/, '$1');
//         const ProcessResult = Process![1].trim().replace(/^"(.*)"$/, '$1');
//         date = new Date()
//         dateInTargetTimezone = getTimezoneDate(date, timezoneOffset);
//         time = {
//             date: (dateInTargetTimezone.getHours() > 9 ? dateInTargetTimezone.getHours() : '0' + dateInTargetTimezone.getHours())
//                 + ':' +
//                 (dateInTargetTimezone.getMinutes() > 9 ? dateInTargetTimezone.getMinutes() : '0' + dateInTargetTimezone.getMinutes())
//                 + ':' +
//                 (dateInTargetTimezone.getSeconds() > 9 ? dateInTargetTimezone.getSeconds() : '0' + dateInTargetTimezone.getSeconds()),
//             title: TitleResult,
//             process: ProcessResult
//         };
//         times.push(time);
//         //console.log(times);

//         if (stderr) {
//             throw new Error(stderr);
//         }
//     } catch (error: any) {
//         console.log(error);
//     }
// }, 3000)

monitorTime.get('/', async (ctx) => {
    ctx.body = times;
});

export default monitorTime;
