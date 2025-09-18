import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import session from 'express-session';

import sequelize from "./config/connection.js";
import Routes from "./routes/routes.js";
import requestLogging from "./middleware/request.logging.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET || 'your secret is mine ;)',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(requestLogging);

app.use("/api", Routes)

sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
})
