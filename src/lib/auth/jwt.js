var jwr = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


function getJWTScope(token) {
    const secret = process.env.JWT_SECRET;
    var decoded = jwr.verify(token, secret);
    return decoded.scope;
}

async function isUser(ctx, next){
    await next();
    const token = ctx.request.header.authorization.split(' ')[1];
    const scope = getJWTScope(token);
    ctx.assert(scope.includes('user'), 403, 'Unauthorized user');
}

async function isAdmin(ctx, next){
    await next();
    const token = ctx.request.header.authorization.split(' ')[1];
    const scope = getJWTScope(token);
    ctx.assert(scope.includes('admin'), 403, 'Unauthorized admin');
}

module.exports = {
    isUser,
    isAdmin,
};