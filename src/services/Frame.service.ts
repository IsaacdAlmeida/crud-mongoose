import IService from '../interfaces/IService';
import IFrame, { FrameZodSchema } from '../interfaces/Frame';
import IModel from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class FrameService implements IService<IFrame> {
  private _frame:IModel<IFrame>;

  constructor(model:IModel<IFrame>) {
    this._frame = model;
  }

  public async create(obj:unknown):Promise<IFrame> {
    const parsed = FrameZodSchema.safeParse(obj); // safeParse do zod e retorna o parsed que é um boolean
    if (!parsed.success) { // se os dados não foram validaos o parse passa a ter um erro
      throw parsed.error; // erro do tipo do zod error
    }
    return this._frame.create(parsed.data); // caso tenha sucesso ele retorna o tipo certo
  }

  public async readOne(_id:string):Promise<IFrame> {
    const frame = await this._frame.readOne(_id);
    if (!frame) throw new Error(ErrorTypes.EntityNotFound);
    return frame;
  }

  public async update(_id: string, obj: unknown): Promise<IFrame> {
    const parsed = FrameZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const updated = await this._frame.update(_id, parsed.data);

    if (!updated) {
      throw new Error(ErrorTypes.EntityNotFound);
    }

    return updated;
  }

  public async read(): Promise<IFrame[]> {
    const frames = await this._frame.read();

    if (!frames) {
      throw new Error(ErrorTypes.EntityNotFound);
    }

    return frames;
  }

  public async destroy(_id: string): Promise<IFrame> {
    const frame = await this._frame.destroy(_id);
    if (!frame) throw new Error(ErrorTypes.EntityNotFound);
    return frame;
  }
}

export default FrameService;