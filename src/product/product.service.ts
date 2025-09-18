import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from 'src/auth/schemas/user.schema';

@Injectable()

export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private productModel:mongoose.Model<Product>
    ){}
 
    // pagination and search 
    async findAll(query):Promise<Product[]>{
        const resPerPage=5      // results per page
        const currentPage=Number(query.page)||1
        const skip=resPerPage*(currentPage-1)
        const keyword=query.keyword?{
            productName:{
                $regex:query.keyword,
                $options:"i"
            }
        }:{}
        const products=await this.productModel
        .find({...keyword})
        .limit(resPerPage)
        .skip(skip)
        return products;
    }

    // create product
    async createProduct(
        product:Product,
        user:Auth
    ):Promise<Product>{

        const data=Object.assign(product,{user:user._id})

        // console.log(data)

       const res= await this.productModel.create(data)
       return res
    }

    // get product by id
    async findById(
        id:string
    ):Promise<Product>{

        // validate id is ObjectId
        const isValidate=mongoose.isValidObjectId(id)
        if(!isValidate){
           throw new BadRequestException("Check Id once's")
        }
       const product= await this.productModel.findById(id)
       if(!product){
          throw new NotFoundException("product not found")
       }
       return product
    }

    // update product by id
    async updateById(
        id:string,
        product:Product
    ):Promise<Product>{
        const productUpdate=await this.productModel.findByIdAndUpdate(id,product,{
            new:true,
            runValidators:true
        })
        if(!productUpdate){
            throw new NotFoundException("Not updated")
        }
        return productUpdate
    }


    // delete product by id
    async deleteById(id:string):Promise<string>{
        const productDelete=await this.productModel.findByIdAndDelete(id)
        if(!productDelete){
            throw new NotFoundException("Not deleted")
        }
        return `${productDelete} deleted`
    }
}
