import 'dotenv/config' 
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import routes from './router.mjs';

const PORT = process.env.PORT;
const app = new Koa();

app.use(bodyParser({
  enableTypes: ['json', 'text'],
}));

// Error handler
app.on('error', err => {
  console.error('server error', err)
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const status = err.statusCode || err.status || 500;
    ctx.status = status;
    ctx.body = {
      code: status,
      message: err.message,
      stack: err.stack,
    };
  }
});

app
  .use(routes.routes())
  .use(routes.allowedMethods());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));