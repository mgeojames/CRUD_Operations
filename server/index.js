const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'studentDetails',
});

app.listen(3001, ()=>{
    console.log("server is up on 3001");
});

app.post('/create', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const course = req.body.course;
    const no = req.body.no;

    db.query(
        "INSERT INTO students (no, firstName, lastName, course) VALUES (?,?,?,?)", 
        [no, firstName, lastName, course], 
        (err, result) => {
            if(err) {
                console.log(err);
            }
            else {
                res.send("Values inserted");
            }
        }
    );
});

app.get('/fullList', (req, res) => {
    db.query (
        "SELECT * FROM students", 
        (err, result) => {
            if(err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
});

app.put('/update', (req, res) => {
    const no = req.body.no;
    const firstName = req.body.firstName;

    db.query (
        "UPDATE students SET firstName = ? WHERE no = ?",
        [firstName, no],
        (err, result) => {
            if(err) {
                console.log(err);
            }
            else {
                res.send("Values updated");
            }
        }
    );
});

app.delete('/delete/:no', (req, res) => {
    const no =req.params.no;

    db.query (
        "DELETE FROM students WHERE no = ?", no,
        (err, result) => {
            if(err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
    );
});