import express from "express";
import { db } from "../utils/db.js";
import jwt from "jsonwebtoken";

export const router = express.Router();

router.post("/adminlogin", (req, res) => {
    
    const { email, password } = req.body;
  
    const sql = "SELECT * from admin Where email = ? and password = ?";
    db.query(sql, [email, password], (err, result) => {
      if (err) {
        console.error(err); 
        return res.json({ loginStatus: false, Error: "Query error" });
      }
      if (result.length > 0) {
        const email = result[0].email;
        const token = jwt.sign(
          { role: "admin", email: email },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        res.cookie('token',token)
        return res.json({ loginStatus: true});
      } else {
        return res.json({ loginStatus: false, Error: "Wrong email or password" });
      }
    });
    
});
  