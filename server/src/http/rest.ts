let restify = async (ctx, next) => {
    ctx.rest = (_data, _status?:number) => {
        let status = _status || 200;

        ctx.response.status = status;
        ctx.response.type = 'application/json';
        ctx.response.body = _data;
    }
    await next();
}

export { restify };