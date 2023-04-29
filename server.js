const express=require('express');
const app=express();
const path=require('path');
require("dotenv").config();

const cors=require('cors')
const PORT=process.env.PORT || 3500;
const cookieParser=require("cookie-parser");
const corsOptions=require('./config/corsOptions')
const credentials=require('./middleware/credentials');


const db = require('./config/mssmConnection');


app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(cookieParser());






app.use('/register',require('./routes/register'));
app.use('/login',require('./routes/login'));
app.use('/logOut',require('./routes/logOut'));

app.use('/refresh',require('./routes/refresh'));


db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(PORT,()=>{console.log(`server listening on port ${PORT}`)});
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });




