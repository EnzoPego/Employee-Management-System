import express from "express";
import { db } from "../utils/db.js";
import jwt from "jsonwebtoken";

export const router = express.Router();


router.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const sql = "SELECT * from admin Where email = ? and password = ?";
    const [rows, columns] = await db.query(sql, [email, password]);
    console.log('Resultado de la consulta:', rows, columns);
    if (rows.length > 0) {
      const email = rows[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token',token);
      console.log('Token:', token); 
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  } catch (err) {
    console.log(err)
    return res.json({ loginStatus: false, Error: "Query error" });
  } 
});

// router.post('add_category',(req,res)=>{
//   const sql = "INSERT INTO category ('name') VALUES (?)"
//   con.query(sql,[req.body.category],(err,result)=>{
//     if(err) return res.json({Status: false, Error:'Query Error'})
//     return res.json({Status:true})
//   })
// })


router.post('/add_category', async (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";  // Usar backticks (`) en lugar de comillas simples
  try {
    const result = await db.query(sql, [req.body.category]);  // Usar db en lugar de con
    return res.json({ Status: true });
  } catch (err) {
    console.error(err);
    return res.json({ Status: false, Error: 'Query Error' });
  }
});


