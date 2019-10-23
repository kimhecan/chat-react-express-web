const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

const router = express.Router();


//프론트에서 요청하는 것에 응답을 보내주는 것을 controller라고 한다.

router.get('/', (req, res) => { // /api/user/
    if (!req.user) {
      return res.status(401).send('로그인이 필요합니다.');
    }
    const user = Object.assign({}, req.user.toJSON());
    delete user.password;
    return res.json(user);
  });

router.post('/', async (req, res, next) => { // POST /api/user 회원가입
    try {
        const exUser = await db.User.findOne({
            where: {
                userId: req.body.userId,
            },
        });
        if (exUser) {
            return res.send('이미 사용중인 아이디입니다.'); //send는 문자열을 보냄(버퍼도됨))
        }
        const hasedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await db.User.create({
            userId: req.body.userId,
            password: hasedPassword,
            userName: req.body.userName,
            userGender: req.body.userGender
        })
        return res.status(200).json(newUser); //json데이터를 보냄
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.post('/login', (req, res, next) => { // POST /api/user/login
    passport.authenticate('local', (err, user, info) => { //done이랑 인자똑같
        if (err) {
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.resason);
        }
        return req.login(user, async (loginErr) => { // req.login을 할 때 serialize가 실행됨
            try {
                if (loginErr) {
                    return next(loginErr);
                }
                const filteredUser = Object.assign({}, user.toJSON());
                delete filteredUser.password;
                return res.json(filteredUser);
            } catch (e) {
                next(e);
            }
        })
    })(req, res, next);
});

router.post('/logout', (req, res) => { // /api/user/logout
    req.logout();
    req.session.destroy();
    res.send('logout 성공')


});



module.exports = router;