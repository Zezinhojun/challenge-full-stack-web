import express, { json } from "express"
import cors from 'cors'
import { connectDB } from "./config/db"

// app config
const app = express()
const port = parseInt(process.env.PORT ?? '3000')

// middleware
app.use(json())
app.use(cors())

const startServer = async (): Promise<void> => {
    try {
        // db connection
        await connectDB()
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        })
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
}

startServer().catch(error => {
    console.error("Failed to start the server:", error);
    process.exit(1);
});