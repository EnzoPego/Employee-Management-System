import express from 'express'
import cors from 'cors'
import { router as adminRouter  } from './Routes/AdminRoute.js'
import { router as employeeRouter } from './Routes/EmployeeRoute.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT','DELETE'],
    credentials: true
}));


app.use(express.json())
app.use('/auth', adminRouter)
app.use('/employee', employeeRouter)
app.use(express.static('Public')) //image


app.listen('3000',()=>{
    console.log('server is running')
})

