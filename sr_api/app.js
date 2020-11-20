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



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))