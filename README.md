To start project:

First terminal:
    mongod  --port 27017  --dbpath "\data"

Second terminal:
    cd server -> npm start
    This will open server on 8000 port.

Third terminal:
    cd client -> npm run build -> npm start
    This will open client on 3000 port.