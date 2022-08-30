import { json } from "body-parser";
import express, { Request, Response, NextFunction } from "express";
import todoRoutes from "./routes/todos";
import cors from 'cors'
import path from 'path'

const app = express();

app.use(cors())

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials", 'true');
//     next();
// });

app.use(json())
app.use("/api/todos", todoRoutes);

// for production
app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..frontend/build'))
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(5000, ()=> console.log('server up runing'));
