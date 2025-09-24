import { FilterQuery, Model } from "mongoose";


export class MongooseRepository<T>{
    constructor(private readonly model:Model<T>){}

    async findone(filter:FilterQuery<T>):Promise<T | null>{
        return this.model.findOne(filter).exec()
    }

    async findById(id:string):Promise<T | null>{
        return this.model.findById(id).exec()
    }
}