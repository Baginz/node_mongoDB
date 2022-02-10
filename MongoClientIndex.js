const {MongoClient} = require('mongodb')

const db_user = process.env.NODE_ENV_DB_USER;
const db_pass = process.env.NODE_ENV_DB_PASS;
const db_name = process.env.NODE_ENV_DB_NAME;

const client = new MongoClient(`mongodb+srv://${db_user}:${db_pass}@cluster0.6mpef.mongodb.net/${db_name}?retryWrites=true&w=majority`)

const start = async () => {
    try {
        await client.connect()
        console.log('Connected mongo')
        await client.db().createCollection('users')
        const users = client.db().collection('users')
        await users.insertOne({name: 'lalka', age: 28})
        const user = await users.findOne({age: 28})
        console.log(user)
    } catch (e) {
        console.log(e)
    }
}

start()