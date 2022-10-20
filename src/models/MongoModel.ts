// aqui definimos a biblioteca mongoose
// o mongoose tem um model que a gente ainda não sabe o que é
// ele aceita qualquer tipo genérico

import { isValidObjectId, Model } from 'mongoose';
import IModel from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj:T):Promise<T> { // CRIA UM NOVO DOCUMENTO
    return this._model.create({ ...obj }); 
  }

  public async readOne(_id:string):Promise<T | null> { // LEITURA DE UM - VERIFICA SE O OBJETO VÁLIDO
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId'); // VERIFICA A VALIDADE DO ID
    return this._model.findOne({ _id }); // E AQUI EU PROCURO PELO ID
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    const updated = await this
      ._model.findByIdAndUpdate(_id, obj, { new: true });

    return updated;
  }

  public async read(): Promise<T[] | null> {
    return this._model.find();
  }

  public async destroy(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');

    const deleted = await this._model.findByIdAndDelete({ _id });

    return deleted;
  }
}

export default MongoModel;
