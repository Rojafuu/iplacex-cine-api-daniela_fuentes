import express from 'express'
import controllerActor from './controllerActor.js'

const ActorRoutes = express.Router()

 ActorRoutes.post('/actor', controllerActor.handleInsertActorRequest)

 ActorRoutes.get('/actores', controllerActor.handleGetActoresRequest)
 ActorRoutes.get('/actor/:id', controllerActor.handleGetActorByIdRequest)
 ActorRoutes.get('/actor/pelicula/:id', controllerActor.handleGetActoresByPeliculaIdRequest)

export default ActorRoutes;