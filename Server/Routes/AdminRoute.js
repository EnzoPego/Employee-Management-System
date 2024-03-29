import express from "express";
import { db } from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'

export const router = express.Router();


router.post("/admin_login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const sql = "SELECT * from admin Where email = ? and password = ?";
    const [rows, columns] = await db.query(sql, [email, password]);
    console.log('Resultado de la consulta:', rows, columns);
    if (rows.length > 0) {
      const email = rows[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: rows[0].id },
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
    console.log(result) 
    return res.json({ Status: true });
  } catch (err) {
    console.error(err);
    return res.json({ Status: false, Error: 'Query Error' });
  }
});

//Image Upload
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
    const { name, email, address, salary, category_id } = req.body;
    const filename = req.file.filename

    const result = await db.query(sql, [name, email, hash, address, salary, filename, category_id]);
    

    return res.json({ Status: true });
  } catch (err) {
    console.error(err);
    return res.json({ Status: false, Error: 'Error en la consulta' });
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

router.get(`/employee/:id`, async (req,res)=>{
  const id = req.params.id
  const sql = "SELECT * FROM employee WHERE id = ?"

  try {
    const [result] = await db.query(sql, [id])
    res.json(result)    
  } catch (error) {
    console.log(error)    
  }
})


router.put(`/edit_employee/:id`, async (req, res) => {
  const { name, email, salary, address, category_id } = req.body;
  const id = req.params.id;

  const sql =
    "UPDATE employee SET name = ?, email = ?, salary = ?, address = ?" +
    (category_id !== undefined && category_id !== ""
      ? ", category_id = ?"
      : "") +
    " WHERE id = ?";

  const values = [name, email, salary, address];

  if (category_id !== undefined && category_id !== '') {
    values.push(category_id);
  }

  values.push(id);

  try {
    const [result] = await db.query(sql, values);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete('/delete_employee/:id', async (req,res)=>{
  const id = req.params.id 
  const sql = "DELETE from employee where id = ?"
  try {
    const [result] = await db.query(sql,[id])
    res.json(result)
    console.log(result)
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
})

router.get('/admin_count', async (req, res) => {
  const sql = 'SELECT count(id) as admin from admin';
  try {
    const [result] = await db.query(sql);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/employee_count', async (req , res) => {
  const sql = 'SELECT count(id) as employee from employee';

  try {
    const [result] = await db.query(sql)
    res.json(result) 
  } catch (error) {
    
  }
})

router.get('/salary_count', async (req , res) => {
  const sql = 'SELECT sum(salary) as salary from employee';

  try {
    const [result] = await db.query(sql)
    res.json(result) 
  } catch (error) {
    
  }
})

router.get('/admin_records', async (req , res) => {
  const sql = 'SELECT * from admin';

  try {
    const [result] = await db.query(sql)
    res.json(result) 
  } catch (error) {
    console.log(error)
  }
})

router.get('/logout', async (req , res) => {
  try {
   res.clearCookie('token')
   res.json({Status: true})
   console.log(res)
  } catch (error) {
    console.log(error)
    res.status(500).json({Status:false, message: "An error occurred"})
  }
})