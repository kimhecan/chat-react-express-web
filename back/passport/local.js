const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');


// saga에서 post할때 data넣어서 보내주는데 req.body에 실려서오는데 그걸 아이디와 비번을 삼겠다.
module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'password',
    }, async (userId, password, done) => {
        try {
            const user = await db.User.findOne({ where: { userId } }); //순수한 객체가 아니라 잡객체(순수한 json이 아님 toJSON()붙여주면 됨)
            if(!user) {
                return done(null, false, { reason: '존재하지 않는 아이디입니다.'}); // done(서버쪽에러, 성공했을때, 로직상에러)
            }
            const result = await bcrypt.compare(password, user.password); //일치하면 true
            if(result) {
                return done(null, user);
            }
            return done(null, false, { reason: '비밀번호가 틀립니다.'});
        } catch (e) {
            console.error(e);
            return done(e);
        }
    }));
}