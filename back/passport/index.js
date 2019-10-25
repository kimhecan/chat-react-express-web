const passport = require('passport');
const db = require('../models');
const local = require('./local');

// 사용자가 로그인을 하면 그 정보를 세션에다가 저장해야함 그런데 실제로 하다보면 
// 실제정보가 너무 많아서 서버쪽 메모리에 다 저장하면 메모리가 터짐 그래서 사용자의 많은 정보중 mysql에서 자동으로주는 id와 cookie만 배열로 저장 [{id:3, cookie:'asgd'}]
// cookie는 프론트로 보내줌 ....프론트가 서버에 쿠키를 보내면 그걸로 확인

module.exports = () => {
    passport.serializeUser((user, done) => { //서버쪽에 [{id:3, cookie: 'asdfg'}] 이런식으로 저장
        return done(null, user.id);
    });

    passport.deserializeUser( async (id, done) => {
        try {
            const user = await db.User.findOne({
                where: { id },
            });
            return done(null, user); //req.user에 저장됨
        } catch (e) {
            console.error(e);
            return done(e);
        }
    });
    local();
};

// 프론트에서 서버로는 cookie만 보냄
// 서버가 쿠키파서, 익스프레스 세션으로 쿠키 검사후 id:3 발견
// id:3이 deserialzie에 들어감
// req.user로 사용자 정보가 들어감

//요청을 받을때마다 deserialze가 실행됨
//실무에서는 deserialize 결과를 캐싱