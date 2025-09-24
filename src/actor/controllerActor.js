import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { Actor } from "./actor.js";

const actorCollection = client.db('cine-db').collection('actores');
const peliculaCollection = client.db('cine-db').collection('peliculas');

async function handleInsertActorRequest(req, res) {
    const data = req.body;

    try {
        await peliculaCollection.findOne({ nombre: data.nombrePelicula })
        .then((pelicula) => {
            if (!pelicula) {
                return res.status(404).send({ error: "La película no existe" });
            }

            const actor = {
                ...Actor,
                _id: new ObjectId(),
                nombre: data.nombre,
                edad: data.edad,
                estaRetirado: data.estaRetirado,
                premios: data.premios,
                idPelicula: pelicula._id
            };

            actorCollection.insertOne(actor)
            .then((result) => res.status(201).send(result))
            .catch((e) => res.status(500).send({ error: "Error al insertar actor", detalle: e.message }));
        })
        .catch((e) => res.status(500).send({ error: "Error al buscar película", detalle: e.message }));
    } catch (e) {
        return res.status(500).send({ error: "Error general", detalle: e.message });
    }
}

async function handleGetActoresRequest(req, res) {
    await actorCollection.find({}).toArray()
    .then((data) => res.status(200).send(data))
    .catch((e) => res.status(500).send({ error: "Error al obtener actores", detalle: e.message }));
}

async function handleGetActorByIdRequest(req, res) {
    const id = req.params.id;
    try {
        const oid = new ObjectId(id);

        await actorCollection.findOne({ _id: oid })
        .then((actor) => {
            if (!actor) {
                return res.status(404).send({ error: "Actor no encontrado" });
            }
            return res.status(200).send(actor);
        })
        .catch((e) => res.status(500).send({ error: "Error al buscar actor", detalle: e.message }));
    } catch (e) {
        return res.status(400).send({ error: "Id mal formado" });
    }
}

async function handleGetActoresByPeliculaIdRequest(req, res) {
    const id = req.params.id;

    try {
        const oid = new ObjectId(id);

        await actorCollection.find({ idPelicula: oid }).toArray()
        .then((actores) => res.status(200).send(actores))
        .catch((e) => res.status(500).send({ error: "Error al buscar actores", detalle: e.message }));
    } catch (e) {
        return res.status(400).send({ error: "Id mal formado" });
    }
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
};