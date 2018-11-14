const express = require('express')
const proxy = require('express-http-proxy')
const path = require('path')
const cors = require('cors')

let port = 3000
let app = express()

app.use( cors() );
app.use(express.static( path.resolve(__dirname, './public') ) )

app.use('/api', proxy('http://localhost:8000'))  // This is our server!
app.get('*', (req, res) => {
    res.status(200).sendFile( path.resolve(__dirname, './public/index.html') )
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});