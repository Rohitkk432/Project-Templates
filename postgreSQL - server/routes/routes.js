var express = require('express');
var router = express.Router();
const pool = require('../pool');

//examples
//@notice pass params to sql query in similar way
//and not directly add it to SQL string or it can be used to inject sql code, and cause security issues.

//getting full users table
router.get('/users',async (req,res)=>{
    try {
        const info = await pool.query("SELECT * FROM users;");
        res.json(info.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//find existing user with email 
router.get('/users/:email',async (req,res)=>{
    try {
        const {email}=req.params;
        const user = await pool.query("SELECT * FROM users WHERE email = $1;" ,[email] );
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//adding new user
router.post('/users',async (req,res)=>{
    try {
        const {email,name,address}=req.body;
        const newUser = await pool.query("INSERT INTO users (name,email,address) VALUES ($1,$2,$3) RETURNING *;",[name,email,address]);
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//deleting user
router.delete('/users',async (req,res)=>{
    try {
        const {id}=req.body;
        const newUser = await pool.query("DELETE FROM users WHERE (id = $1) RETURNING *;",[id]);
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});




module.exports = router;