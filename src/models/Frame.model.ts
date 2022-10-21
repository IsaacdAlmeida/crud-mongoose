import { model as mongooseCreateModel, Schema } from 'mongoose';
import IFrame from '../interfaces/Frame';
import MongoModel from './MongoModel';

// ambos extendem (herdam) o mongomodel e passa o tipo concreto

const frameMongooseSchema = new Schema<IFrame>({
  material: String,
  color: String,
});

class Frame extends MongoModel<IFrame> {
  constructor(model = mongooseCreateModel('Frame', frameMongooseSchema)) {
    super(model);
  }
}

export default Frame;