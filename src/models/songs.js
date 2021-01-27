import mongoose from 'mongoose';
const { Schema } = mongoose;

const songSchema = new Schema({
    name: String,
    length: Number
});

const Song = mongoose.model('Song', songSchema);

const nameExists = async (name) => {
    const result = await Song.countDocuments({ name: name }).exec();
    return result > 0;
}

const songRepository = {

    // Devuelve todos las canciones del repositorio
    async findAll() {
        const result =  await Song.find({}).exec();
        return result;
    },
    // Devuelve una canción por su Id
    async findById(id) {
       const result = await Song.findById(id).exec();
       return result != null ? result : undefined;
    },
    // Inserta una nueva canción y devuelve la canción insertada
    async create(newSong) {
        const theSong = new Song({
            name : newSong.name,
            length: newSong.lenght
        });
        const result = await theSong.save();
        return result; // Posiblemente aquí nos interese implementar un DTO

    },
    // Actualiza una canción identificada por su ID
    async updateById(id, modifiedSong) {

        const songSaved = await Song.findById(id);

        if (songSaved != null) {
            return await Object.assign(songSaved, modifiedSong).save();
        } else
            return undefined;
    },

    // Versión del anterior, en la que el ID va dentro del objeto canción
    update(modifiedSong) { //async-await
        return this.update(modifiedSong.id, modifiedSong);//meter el byid
    },
    //Borra la canción cuyo id se le de como parámetro
    async delete(id) {
        await Song.findByIdAndRemove(id).exec();
    }
}

export  {
    Song,
    songRepository,
    nameExists
}