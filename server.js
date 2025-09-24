import express, { urlencoded} from 'express'
import cors from 'cors'

import client from './src/common/db.js'
import peliculaRoutes from './src/pelicula/routes.js'
import ActorRoutes from './src/actor/routes.js'
const PORT = process.env.PORT || 3000;
const PORTS = 3000 || 4000
const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true}))
app.use(cors())

app.get('/', (req, res) => { return res.status(200).send('Bienvenido al Cine Iplacex <3')})

app.use('/api', peliculaRoutes, ActorRoutes)

try {
  await client.connect();
  console.log('Conectado al Cluster');

app.listen(PORTS, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORTS}`);
});

} catch (error) {
  console.log('Ha ocurrido un error al conectar al cluster de Atlas:', error.message);
}


