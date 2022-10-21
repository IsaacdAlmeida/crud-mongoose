interface IService<T> {
  create(obj:unknown):Promise<T>, // UTILIZAMOS O UNKNOW, POIS NÃO SABEMOS O QUE VEM NA REQUISIÇÃO
  readOne(_id:string):Promise<T>,
  update(_id:string, obj:unknown):Promise<T>
  read():Promise<T[]>,
  destroy(_id:string):Promise<T>
}

export default IService;
