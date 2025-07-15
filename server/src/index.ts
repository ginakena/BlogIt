import express, { Express } from 'express';
import authRoutes from './routes/auth.routes';
import dotenv from "dotenv";
import blogRoutes from "./routes/blog.routes";
import cors from 'cors';

dotenv.config();

const app: Express = express(); 

app.use(express.json()); 
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
  methods: ["POST", "GET", "PATCH", "DELETE", "PUT"]
}));



app.get("/", (_req, res) => {
    res.send('<h1>Welcome to BlogIt</h1>');
});


app.use(
  "/api/auth",  
  authRoutes
);

app.use("/api/blogs", blogRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`App is live on port ${port}`));
