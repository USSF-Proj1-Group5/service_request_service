const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 3001

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'admin',
    host: 'database',
    database: 'service_requests',
    password: 'admin',
    port: 5432,
})

app.use(bodyParser.json())

// const emails = JSON.parse(fs.readFileSync("emails.JSON"))

app.get('/service_requests', (req, res) => {
    pool.query('SELECT * FROM service_requests', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
})
app.post('/add_service_request', (req, res) => {
    let result
    if(req.body.sr_name && req.body.sr_task && req.body.sr_contractor){
        pool.query('INSERT INTO service_requests (sr_name, sr_contractor, sr_task) VALUES ($1, $2, $3)', [req.body.sr_name, req.body.sr_contractor, req.body.sr_task], (error, results) => {
            if(error) {
                throw error
            }
        })
        result = {
            "status": "success",
            "message": "The service request was successfully added"
        }
        res.status(200).send(result)

    } else {
        result = {
            "status": "failed",
            "message": "The service request was not added"
        }
        res.status(400).send(result);
    }
    
})
app.delete('/delete_service_request', (req, res) => {
    let result
    if(req.body.id){
        pool.query('DELETE FROM service_requests WHERE id IN ($1)', [req.body.id], (error,results) => {
            if(error){
                throw error
            }
        })
        result = {
            "status": "success",
            "message": "The service request was successfully deleted"
        }
        res.status(200).send(result);
        
    } else {
        res.status(400).send(` not deleted`)
    }
    
})

// app.post('/import', (req, res) => {
//     for (let i = 0; i < emails.length; i++) {
//         pool.query('INSERT INTO emails (sender, recipient, subject, message, date) VALUES ($1, $2, $3, $4, $5)', [emails[i].sender, emails[i].recipient, emails[i].subject, emails[i].message, emails[i].date], (error, results) => {
//             if (error) {
//                 throw error;
//             }
//         })
//     }
//     res.status(200).json("finished");
// })


// app.get('/emails/:id', (req, res) => {
//     pool.query('SELECT * FROM emails WHERE id = $1', [req.params.id], (error, results) => {
//         if (error) {
//             throw error;
//         }
//         res.status(200).json(results.rows)
//     })
// })

// app.get('/search', (req, res) => {
//     let str = '%' + decodeURIComponent(req.query.query) + '%';
//     pool.query("SELECT * FROM emails WHERE lower(subject) LIKE lower($1)", [str], (error, results) => {
//         if (error) {
//             throw error
//         }
//         res.status(200).json(results.rows)
//     })
// });

// app.post('/send', function (req, res) {
//     let result;
//     const emailSender = req.body;
//     if (emailSender.sender && emailSender.recipient && emailSender.subject && emailSender.message) {
//         pool.query('INSERT INTO emails (sender, recipient, subject, message, date) VALUES ($1, $2, $3, $4, $5)', [emailSender.sender, emailSender.recipient, emailSender.subject, emailSender.message, new Date().toISOString()], (error, results) => {
//             if (error) {
//                 throw error;
//             }
//         })
//         result = {
//             "status": "success",
//             "message": "The message was successfully sent"
//         }
//     } else {
//         result = {
//             "status": "failed",
//             "message": "The message was not sent"
//         }
//         res.status(400);
//     }
//     res.json(result);
// });


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))