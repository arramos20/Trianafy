import mongoose from 'mongoose';
import Song from './songs';

const { Schema } = mongoose;

const listSchema = new Schema({
    name: String,
    songList: [Song]
});

const List = mongoose.model('List', listSchema);

const nameExists = async (name) => {
    const result = await List.countDocuments({ name: name }).exec();
    return result > 0;
}

const listRepository = {

    // Devuelve todas las listas del repositorio (EDITAR PARA QUE SÓLO VEA LAS QUE HA CREADO ESE USUARIO)
    async findAll() {
        const result =  await List.find({}).exec();
        return result;
    },
    // Devuelve una lista por su id
    async findById(id) {
       const result = await List.findById(id).exec();
       return result != null ? result : undefined;
    },
    // Inserta una lista nueva y devuelve la lista insertada
    async create(newList) {

        const theList = new List({
            name : newList.name,
            songList: newList.songList
        });
        const result = await theList.save();
        return result; // Posiblemente aquí nos interese implementar un DTO

    },
    // Actualiza una lista identificada por su ID
    async updateById(id, modifiedList) {

        const listSaved = await List.findById(id);

        if (listSaved != null) {
            return await Object.assign(listSaved, modifiedList).save();
        } else
            return undefined;


    },
    // Versión del anterior, en la que el ID va dentro del objeto list
    update(modifiedList) {
        return this.update(modifiedList.id, modifiedList);
    }, 
    async delete(id) {
        await List.findByIdAndRemove(id).exec();
    }

}


export  {
    List,
    listRepository,
    nameExists
}