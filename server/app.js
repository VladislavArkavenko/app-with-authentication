const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const errorHandler = require('errorhandler')
const logger = require('morgan')

const port = 8000
mongoose.promise = global.Promise

const app = express()

app.use( cors() )
app.use( logger('dev') )
app.use( bodyParser.urlencoded( { extended: false } ) )
app.use( bodyParser.json() )

app.use( express.static(path.join(__dirname, 'public')) )

app.use(errorHandler());

mongoose
    .connect( 'mongodb://localhost/passport-tutorial', { useNewUrlParser: true } )
    .catch( err => console.log("Failed to connect to Mongo \n", "ERROR:", err.message) )
mongoose.set('debug', true);

require('./models/Users')

app.use(require('./routes'))

app.use((err, req, res, next) => {
    res.status(err.status || 500)

    res.json({
        errors: {
            message: err.message,
            error: err
        }
    });
});

app.listen( port, () => console.log(`Server running on port ${port}`))
