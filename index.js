const express = require('express')
const app = express()
const mongoose = require('mongoose')
const database = require('./config/database')
const bodyParser = require('body-parser')

//Import Controllers
const UserController = require('./src/controllers/UserController')
const SessionController = require('./src/controllers/SessionController')
const PostController = require('./src/controllers/PostController')
const LikeController = require('./src/controllers/LikeController')
const CommentController = require('./src/controllers/CommentController')

//Import Middlewares
const authMiddleware = require('./src/middleware/auth')

mongoose.connect(database.url, {
    useCreateIndex: true,
    useNewUrlParser: true
})

mongoose.connection.on('open', () => {
    console.log('Conectado')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


//Rotas SignIn SignUp
app.post('/users/signup', UserController.store)
app.post('/users/signin', SessionController.store)

//Rota de Logout em breve

// -------------------------------------------- //
//Middleware de autenticação
app.use(authMiddleware)

//ESSA ROTA NÃO IRÁ EXISTIR
app.get('/users', UserController.index)

//Rotas Posts
app.get('/posts', PostController.index)
app.post('/posts', PostController.store)
app.delete('/posts/:id', PostController.destroy)
app.put('/posts/:id', PostController.put)

//Rota Like
app.post('/posts/like/:id', LikeController.store)

//Rotas Comment
app.get('/posts/comment/:id', CommentController.show)
app.post('/posts/comment/:id', CommentController.store)
app.delete('/posts/comment/:id', CommentController.destroy)


app.listen(3000, () => {
    console.log("Server 3000")
})