// @ts-ignore
import  express from 'express';
// @ts-ignore
import dotenv from 'dotenv';
// @ts-ignore
import cors from 'cors'
// @ts-ignore
import debateRoute from "./src/routes/debate.route.ts";
// @ts-ignore
import authRouter from "./src/routes/auth.route.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/debates',debateRoute);
app.use('/api/auth',authRouter)

app.get('/health', (req, res) => {
    res.json({status: 'ok'})
})

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})