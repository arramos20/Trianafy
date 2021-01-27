import {
    Song,
    songRepository
} from '../models/songs';

import {
    body,
    validationResult
} from 'express-validator';

const SongController = {

    todasLasCanciones: async (req, res) => {
        const data = await songRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.sendStatus(404);
    },

    cancionPorId: async (req, res) => {

            let song = await songRepository.findById(req.params.id);
            if (song != undefined) {
                res.json(song);
            } else {
                res.sendStatus(404);
            }

    },

    nuevoCancion: async (req, res) => {
        let cancionCreada = await songRepository.create({
            name: req.body.name,
            lenght: req.body.length
        })
        res.status(201).json(cancionCreada);
    },

    editarCancion: async (req, res) => {
        let CancionEditada = await songRepository.updateById(req.params.id, {
            name: req.body.name
        });
        if (cancionEditada == undefined)
            res.sendStatus(404);
        else
            res.status(200).json(cancionEditada);
    },

    eliminarCancion: async (req, res) => {
        await songRepository.delete(req.params.id);
        res.sendStatus(204);
    }

};

export {
    SongController
}