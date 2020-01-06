const IP = 4000;
const Koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
const app = new Koa();
var router = new Router();

app.use(bodyParser());

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

router.get('/', (ctx, next) => {
   ctx.body = 'Toto Toma';
});

router.post('/', (ctx, next) => {
  console.log(ctx.request.body);
   ctx.body = 'toto Postea';
});

router.put('/', (ctx, next) => {
  console.log(ctx.request.body);
   ctx.body = 'toto pone';
});

router.delete('/', (ctx, next) => {
  console.log(ctx.request.body);
  ctx.throw(400, 'asd');
  // ctx.body = 'toto Elimina';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(IP);
