import express from "express";
import { db } from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'

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


router.get('/category', async (req, res) => {
  const sql = "SELECT * FROM category";
  try {
    const [result] = await db.query(sql);
    //res.json({ Status: true, Result : result});
    res.json(result)
  } catch (error) {
    res.json({ Status: false, Error: 'Query Error' });
  }
});


router.post('/add_category', async (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";  
  try {
    const result = await db.query(sql, [req.body.category]);  
    return res.json({ Status: true });
  } catch (err) {
    console.error(err);
    return res.json({ Status: false, Error: 'Query Error' });
  }
});

// Image Upload
const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, 'Public/Images')
  },
  filename:(req, file, cb) =>{
    cb(null, file.originalname + "_" + Date.now() + path.extname(file.originalname)) 
  }
})
const upload = multer({
  storage: storage
})


router.post('/add_employee', upload.single('image'), async (req, res) => {
  const sql = "INSERT INTO employee (`name`, `email`, `password`, `address`, `salary`, `image`, `category_id` ) VALUES (?, ?, ?, ?, ?, ?, ?)";

  try {
    const hash = await bcrypt.hash(req.body.password.toString(), 10);

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.file.filename,
      req.body.category_id,
    ];

    const result = await db.query(sql, values);

    return res.json({ Status: true });
  } catch (err) {
    console.error(err);
    return res.json({ Status: false, Error: 'Query error' });
  }
});

router.get('/employee',async (req,res)=>{
  const sql = "SELECT * FROM employee"
  try {
    const [result] = await db.query(sql);
    res.json(result)    
  } catch (error) {
    console.log(error)    
  }
})


