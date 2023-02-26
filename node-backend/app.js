const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/expense-router');
const sequelize = require('./util/database');

const app = express();
app.use(cors());
app.use(bodyParser.json({extended:false}));

app.use(router);

sequelize
    .sync()
    .then(() => {
        app.listen(8888);
    })
    .catch(err => {
        console.log(err)
    });
