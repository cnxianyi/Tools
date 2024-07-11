import Koa, { Context } from 'koa';
import cors from '@koa/cors'; // 跨域
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import morgan from './log/morgan';
// import monitorTime from './monitorTime/monitorTime';
import getTimes from './getTimes/getTime';

const app = new Koa();
const router = new Router();

// 中间件
app.use(morgan);
app.use(bodyParser());
app.use(cors({ // 跨域设置
    origin: '*', // 允许所有来源的请求
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// router
// app.use(monitorTime.routes());
// app.use(monitorTime.allowedMethods());
app.use(getTimes.routes());
app.use(getTimes.allowedMethods());

// app.use(async (ctx: Context, next: () => Promise<any>) => {
//     try {
//         await next();
//     } catch (error: any) {
//         console.error('Error caught in error middleware:', error);
//         ctx.status = error.status || 500;
//         ctx.body = {
//             error: error.message || 'Internal Server Error'
//         };
//     }
// });

// 路由
router.get('/', async (ctx) => {
    ctx.body = 'Hello, Koa with TypeScript!';
});

app.use(router.routes()).use(router.allowedMethods());

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
