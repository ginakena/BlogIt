import express, { Express} from 'express';
import authRoutes from './routes/auth.routes';
import dotenv from "dotenv";

import verifyUserInformation from "./middleware/verifyUserInformation";
import verifyPasswordStrength from "./middleware/verifyPasswordStrength";

dotenv.config();

const app: Express = express ();

app.use(express.json());

app.get("/", (_req, res) => {
    res.send('<h1>Welcome to BlogIt </h1>')
})

app.use("/api/auth",
     verifyUserInformation,
     verifyPasswordStrength,

    authRoutes);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`App is live on port ${port}`));
