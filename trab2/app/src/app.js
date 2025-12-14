import express from 'express';
import formidable from 'formidable';
import { usersRouter } from './routes/users-routes.js';
import { homeRouter } from './routes/home-routes.js';
import session from 'express-session'
import  { PrismaClient } from '@prisma/client';
import logger from './Middleware/logger.js';

export const prisma = new PrismaClient()
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(logger)

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.static('public'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

app.use((req, res, next) => {
    req.session.routes = req.session.routes || [];
    req.session.routes.push(req.url);
    next();
})

app.use((req, res, next) => {
    const allowedPaths = [
        '/users/userAuth',
        '/users/userLogin',
        '/users/teste',
        '/users/userData'
    ];

    if (req.session.auth) {
        next();
    } else {
        if (allowedPaths.includes(req.path)) {
            next();
        } else {
            res.redirect('/users/userLogin');
        }
    }
});

app.get('/', (req, res) => {
    res.redirect('home/page')
})

app.use('/users', usersRouter);
app.use('/home', homeRouter)

// qualquer outra requisicao
app.use((req, res) => {
    res.status(404).send("NOT FOUND");
})

app.listen(PORT, () => {
    console.log("ESCUTANDO NA PORTA 3000");
});