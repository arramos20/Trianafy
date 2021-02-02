import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    fullname: String,
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

const nameExist = async (name) => {
    const result = await User.countDocuments({ name: name }).exec();
    return result > 0;
}

const userRepository = {

    // Devuelve todas las users del repositorio (EDITAR PARA QUE SÓLO VEA LAS QUE HA CREADO ESE USUARIO)
    async findAll() {
        const result =  await User.find({}).exec();
        return result;
    },
    // Devuelve una user por su id
    async findById(id) {
       const result = await User.findById(id).exec();
       return result != null ? result : undefined;
    },
    // Inserta una usera nueva y devuelve la user insertada
    async create(newUser) {

        const theUser = new User({
            name : newUser.name,
            songUser: newUser.songUser
        });
        const result = await theUser.save();
        return result; // Posiblemente aquí nos interese implementar un DTO

    },
    // Actualiza una user identificada por su ID
    async updateById(id, modifiedUser) {

        const userSaved = await User.findById(id);

        if (userSaved != null) {
            return await Object.assign(userSaved, modifiedUser).save();
        } else
            return undefined;


    },
    // Versión del anterior, en la que el ID va dentro del objeto user
    update(modifiedUser) {
        return this.update(modifiedUser.id, modifiedUser);
    }, 
    async delete(id) {
        await User.findByIdAndRemove(id).exec();
    }

}

export  {
    User,
    userRepository,
    nameExist
}