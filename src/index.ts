import Koa from 'koa';
import cors from '@koa/cors'; // 跨域
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import morgan from './log/morgan';

const app = new Koa();
const router = new Router();

app.use(cors({ // 跨域设置
    origin: '*', // 允许所有来源的请求
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 中间件
app.use(morgan);
app.use(bodyParser());

// 路由
router.get('/', async (ctx) => {
    ctx.body = 'Hello, Koa with TypeScript!';
});

app.use(router.routes()).use(router.allowedMethods());

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
