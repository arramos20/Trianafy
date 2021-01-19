import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    email: String
});

const User = mongoose.model('User', userSchema);

const emailExists = async (email) => {
    const result = await User.countDocuments({ email: email }).exec();
    return result > 0;

}

const userRepository = {

    // Devuelve todos los usuarios del repositorio
    async findAll() {
        //return users;
        const result =  await User.find({}).exec();
        return result;
    },
    // Devuelve un usuario por su Id
    async findById(id) {
       // const posicion = indexOfPorId(id);
       // return posicion == -1 ? undefined : users[posicion];
       const result = await User.findById(id).exec();
       return result != null ? result : undefined;
    },
    // Inserta un nuevo usuario y devuelve el usuario insertado
    async create(newUser) {
        // const lastId = users.length == 0 ? 0 : users[users.length-1].id;
        // const newId = lastId + 1;
        // const result = new User(newUser.username, newUser.email, newId);
        // users.push(result);
        // return result;
        const theUser = new User({
            username : newUser.username,
            email: newUser.email
        });
        const result = await theUser.save();
        return result; // Posiblemente aquí nos interese implementar un DTO

    },
    // Actualiza un usuario identificado por su ID
    async updateById(id, modifiedUser) {

        // const posicionEncontrado = indexOfPorId(id)
        // if (posicionEncontrado != -1) {
        //    users[posicionEncontrado].username = modifiedUser.username;
        // }
        // return posicionEncontrado != -1 ? users[posicionEncontrado] : undefined;
        const userSaved = await User.findById(id);

        if (userSaved != null) {
            return await Object.assign(userSaved, modifiedUser).save();
        } else
            return undefined;


    },
    // Versión del anterior, en la que el ID va dentro del objeto usuario
    update(modifiedUser) {
        return this.update(modifiedUser.id, modifiedUser);
    }, 
    async delete(id) {
        // const posicionEncontrado = indexOfPorId(id);
        // if (posicionEncontrado != -1)
        //     users.splice(posicionEncontrado, 1);
        await User.findByIdAndRemove(id).exec();
    }

}


export  {
    User,
    userRepository,
    emailExists
}