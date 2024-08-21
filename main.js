const express = require("express")
const app = express()
const port = 3200
const bodyParser = require("body-parser")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const dotenv = require("dotenv")
const dbCall = require("./src/database/db_init")


dotenv.config()

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 200,
    message: "Too many request from this IP, please try again after 10 minutes"
    
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(limiter)

app.get("/holiday-dates", function (req, res) {
    dbCall.query("SELECT * FROM holiday", function (err, result) {
        if (err) {
            res.status(400).send("Failed to fetch data")
        } else {
            res.status(200).send(result)
        }
    })
})

app.get("/holiday-dates/month/:month", function (req, res) {
    dbCall.query(`SELECT * FROM holiday WHERE month = ${req.params.month}`, function (err, result) {
        if (err) {
            res.status(400).send("Failed to fetch data")
        } else {
            res.status(200).send(result)
        }
    })
})

app.get("/holiday-dates/years/:year", function (req, res) {
    dbCall.query(`SELECT * FROM holiday WHERE year = ${req.params.year}`, function (err, result) {
        if (err) {
            res.status(400).send("Failed to fetch data")
        } else {
            res.status(200).send(result)
        }
    })
})

app.get("/holiday-dates/years-month/:year/:month", function (req, res) {
    dbCall.query(`SELECT * FROM holiday WHERE year = ${req.params.year} AND month = ${req.params.month}`, function (err, result) {
        if (err) {
            res.status(400).send("Failed to fetch data")
        } else {
            res.status(200).send(result)
        }
    })
})

// app.post("/add-holiday", function (req, res) {
//     let body = req.body
//     console.log(req.body)
//     let arrayDataInsert = []

//     for (let i = 0; i < body.length; i++) {
//         let date = body[i].date
//         let year = body[i].year
//         let month = body[i].month
//         let description = body[i].description

//         arrayDataInsert.push([date, year, month, description])
//     }

//     dbCall.query("INSERT INTO holiday (date, year, month, description) VALUES ?", [arrayDataInsert], function (err, result) {
//         if (err) {
//             res.status(400).send("Failed to add data")
//         } else {
//             res.status(200).send("Data added successfully")
//         }
//     })

// })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})