const fs = require('fs');
const express = require('express');

const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "management-tutorial.c8f0rxu7zpx1.ap-northeast-2.rds.amazonaws.com",
  user: "user",
  password: "management",
  port: "3306",
  database: "management"
});
connection.connect();

const multer = require('multer');
const upload = multer({dest:'./upload'})


app.get('/api/hello', (req,res) => {
    res.send({message: "Hello Express!"});
});

app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM customer WHERE isDeleted = 0",
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      } 
      res.send(rows);
      console.log(rows);
    }
  );
 });

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req,res) => {
  let sql = 'INSERT INTO customer VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql,params, 
      (err, rows, fields) => {
        if (err) {
          console.log(err);
        } 
        res.send(rows);
        console.log(rows);
      }
    );
});

app.delete('/api/customers/:id', (req,res) => {
  let sql = 'UPDATE customer SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
      (err, rows, fields) => {
        res.send(rows);
      } 
    )
  });

app.listen(port, () => console.log(`Listening on port ${port}`))
