import { BSONType, ObjectId } from "mongodb";

export const Actor = {
    _id: new ObjectId(),             // Tipo BSON ObjectId
    idPelicula: "",                 // string 
    nombre: "",                     // string
    edad: 0,                        // int
    estaRetirado: false,           // bool
    premios: []                    // array
};
