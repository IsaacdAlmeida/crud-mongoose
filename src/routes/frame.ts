import { Router } from 'express';
import FrameController from '../controllers/Frame.controller';
import FrameModel from '../models/Frame.model';
import FrameService from '../services/Frame.service';

const route = Router();

const FRAME_ID_ROUTE = '/frame/:id';

const frame = new FrameModel();
const frameService = new FrameService(frame);
const frameController = new FrameController(frameService);

route.post('/frame', (req, res) => frameController.create(req, res));
route.get(FRAME_ID_ROUTE, (req, res) => frameController.readOne(req, res));
route.put(FRAME_ID_ROUTE, (req, res) => frameController.update(req, res));
route.get('/frame', (req, res) => frameController.read(req, res));
route.delete(FRAME_ID_ROUTE, (req, res) => frameController.destroy(req, res));

export default route;