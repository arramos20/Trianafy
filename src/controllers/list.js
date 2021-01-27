import {
    List,
    listRepository
} from '../models/lists';

import {
    body,
    validationResult
} from 'express-validator';

const ListController = {

    todasLasCanciones: async (req, res) => {
        const data = await listRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.sendStatus(404);
    },

    cancionPorId: async (req, res) => {

            let list = await listRepository.findById(req.params.id);
            if (list != undefined) {
                res.json(list);
            } else {
                res.sendStatus(404);
            }
    },

    nuevaLista: async (req, res) => {
        let listaCreada = await listRepository.create({
            name: req.body.name,
            songList: [Song]
        })
        res.status(201).json(listaCreada);
    },

    editarLista: async (req, res) => {
        let listaEditada = await listRepository.updateById(req.params.id, {
            name: req.body.name
        });
        if (listaEditada == undefined)
            res.sendStatus(404);
        else
            res.status(200).json(listaEditada);
    },

    eliminarLista: async (req, res) => {
        await listRepository.delete(req.params.id);
        res.sendStatus(204);
    }

};

export {
    ListController
}