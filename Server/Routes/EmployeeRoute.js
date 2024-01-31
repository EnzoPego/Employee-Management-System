
import express from "express";
import { db } from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const router = express.Router();

router.post("/employee_login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [result] = await db.query("SELECT * from employee Where email = ?", [email]);

    if (result.length > 0) {
      const user = result[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.json({ loginStatus: false, Error: "Wrong Password" });
        }

        const token = jwt.sign(
          { role: "employee", email: user.email },
          "employee_secret_key",
          { expiresIn: "1d" }
        );

        res.cookie("token", token);
        return res.json({ loginStatus: true, id: user.id });
      });
    } else {
      res.json({ loginStatus: false, Error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get(`/detail/:id`, async (req,res)=>{
    const id = req.params.id
    const sql = "SELECT * FROM employee where id = ?"
    try {
        const [result] = await db.query(sql,[id])
        res.json(result)
        console.log(result)
    } catch (error) {
        console.log(error)
    }

})

