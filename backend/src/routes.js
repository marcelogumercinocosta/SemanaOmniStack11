const express = require("express");
const { celebrate, Segments, Joi }= require('celebrate');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/incidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();


routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.list);

routes.post('/ongs', celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().min(10).max(11).required(),
            city: Joi.string().required(),
            uf: Joi.string().required().length(2),
        }),
    }), OngController.create);

routes.get('/incidents', celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
        }),
    }), IncidentController.list);

routes.post('/incidents', celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            value: Joi.number().required(),
        }),
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
    }),  IncidentController.create);

routes.delete('/incidents/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    }), IncidentController.delete);

routes.get('/profile', celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
    }), ProfileController.list);

module.exports = routes;