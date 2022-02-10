import express from 'express'
import mongoose from 'mongoose'
import router from "./router.js";
import fileUpload from 'express-fileupload';

const db_user = process.env.NODE_ENV_DB_USER;
const db_pass = process.env.NODE_ENV_DB_PASS;
const db_name = process.env.NODE_ENV_DB_NAME;
const PORT = 5000;

const DB_URL = `mongodb+srv://${db_user}:${db_pass}@cluster0.6mpef.mongodb.net/${db_name}?retryWrites=true&w=majority`

const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()
