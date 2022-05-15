import express from 'express'
import cors from 'cors'
import compression from 'compression'
import { uploadRouter } from '../upload/upload.controller';

const api = express();

api.set('trust proxy', 1);

api.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))
api.use(express.json());
api.use(express.urlencoded({ extended : true }));
api.use('/files', express.static('files'))
api.use(compression());

api.use('/upload', uploadRouter)

export { api };