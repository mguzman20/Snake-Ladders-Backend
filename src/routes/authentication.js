const Router = require('koa-router');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const router = new Router();

router.post('/register', async (ctx) => {
  const authInfo = ctx.request.body;
    let user = await ctx.orm.User.findOne({ where: { username: authInfo.username } });
    if (user) {
        ctx.body = 'User already exists';
        ctx.status = 400;
        return;
    }
    try {
        const saltRound = 10;
        const hashPassword = await bcrypt.hash(authInfo.password, saltRound);

        var userCreatedawait = await ctx.orm.User.create({
            username: authInfo.username,
            password: hashPassword,
            mail: authInfo.mail,
        });
    }
    catch (error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }


    const expirationSeconds = 1 * 60 * 60 * 12;
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
    var token = jwt.sign(
        { scope: ['user'] },
        JWT_PRIVATE_KEY,
        { subject: userCreatedawait.id.toString() },
        { expiresIn: expirationSeconds }
    );
    ctx.body = {
        username: userCreatedawait.username,
        email: userCreatedawait.mail,
    "access_token": token,
    "token_type": "Bearer",
    "expires_in": expirationSeconds
    }
    ctx.status = 200;

});

router.post("authentication.login", "/login", async (ctx) => {
    let user;
    const authInfo = ctx.request.body
    try {
        user = await ctx.orm.User.findOne({where:{username:authInfo.username}});
    }
    catch(error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
    if (!user) {
        ctx.body = `The user '${authInfo.username}' was not found`;
        ctx.status = 400;
        return;
    }

    const validPassword = await bcrypt.compare(authInfo.password, user.password);

    if (validPassword) {
        ctx.body = {
            username: user.username,
            email: user.mail,
        };
        ctx.status = 200;
    } else {
        ctx.body = "Incorrect password";
        ctx.status = 400;
        return;
    }

    const expirationSeconds = 1 * 60 * 60 * 12;
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
    var token = jwt.sign(
        { scope: ['user'] },
        JWT_PRIVATE_KEY,
        { subject: user.id.toString() },
        { expiresIn: expirationSeconds }
    );
    ctx.body = {
    "access_token": token,
    "token_type": "Bearer",
    "expires_in": expirationSeconds,
    }
    ctx.status = 200;

})

module.exports = router;