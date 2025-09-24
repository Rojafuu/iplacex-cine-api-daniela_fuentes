import { MongoClient, ServerApiVersion } from "mongodb";

const uri = 'mongodb+srv://ev3_express:lEr4f7RwCzZVNSxT@cluster-express.kexvsqk.mongodb.net/?retryWrites=true&w=majority&appName=cluster-express'
const client = new MongoClient(uri, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

await client.connect()
            .then(() => { console.log('DB Connected') })
            .catch((e) =>{ console.log(e) })

export default client