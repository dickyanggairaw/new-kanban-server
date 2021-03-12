if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routes')
const errHandler = require('./middlewares/errorHelper')

app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(router)
app.use(errHandler)

app.listen(PORT, ()=>{
    console.log(`listening app in port ${PORT}`)
})