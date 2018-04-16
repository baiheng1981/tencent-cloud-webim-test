import lg from './utils/lg';

import * as http from "http";
import * as url from "url";
import * as path from "path";

import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as cors from "koa-cors";

import { restify } from "./http/rest";

import Controller from "./http/Controller";

lg.log("tencent-cloud-webim-test start..." );

const host: string = "127.0.0.1";
const port: number = 3000;

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(cors());
app.use(restify);


/** 计算处理时间 */
app.use(async(ctx, next) => {
    let start = new Date().getTime();
    await next();
    let ms = new Date().getTime() - start;
    lg.ness(`time:${ms}ms`);
});
/** log request URL: url => method */
app.use(async(ctx, next) => {
    lg.request(`log request URL:${ctx.request.url} => ${ctx.request.method}`);
    await next();
});


Controller.i().init(router).addControllers(path.resolve(__dirname, "./http/controllers"));
app.use(router.routes());

app.listen(port);

lg.log(`app started at port ${port}`);





