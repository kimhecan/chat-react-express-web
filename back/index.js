const express = require('express'); //서버를 구성해주는 프레임워크
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user');

const webSocket = require('./socket');

const sessionMiddleware = expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, //js에서 접근못함
        secure: false, //https를 쓸 때 true로
    },
    name: 'taxi',
})

const app = express(); //실행해주면 app이라는 객체가 생김
db.sequelize.sync();
passportConfig();

dotenv.config();
app.use(morgan('dev'));
app.use(express.json()); //json형식의 본문처리
app.use(express.urlencoded( {extended: true })); //form으로 넘어온 데이터본문 처리
app.use(cors({
    origin: true,
    credentials: true,
})) //다른서버에서 요청이 와도 됨
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userAPIRouter);



const server = app.listen(3065, () => {
    console.log('server is running on localhost: 3065')
});

webSocket(server);