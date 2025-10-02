import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from 'src/auth/schemas/vendor.schema';
import { uploadImages } from 'src/utils/aws';
import * as XLSX from 'xlsx';

@Injectable()

export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private productModel:mongoose.Model<Product>
    ){}


async importFromExcel(file: Express.Multer.File, user: Auth): Promise<any> {
  //  Read buffer
  const workbook = XLSX.read(file.buffer, { type: 'buffer' });

  //  Pick first sheet
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  //  Convert sheet to JSON
  const rows: any[] = XLSX.utils.sheet_to_json(worksheet);

  //  Map rows to product DTOs
  const products = rows.map(row => {
    const product: any = {
      productName: String(row.productName || ''),  // required
      brandName: String(row.brandName || ''),      // required
      orignalPrice: Number(row.orignalPrice || 0),
      discountPrice: Number(row.discountPrice || 0),
      category: String(row.category || ''),
      auth: user._id,
      images: [] // handle images separately if needed
    };

    //  Make productId optional
    if (row.productId) {
      product.productId = Number(row.productId);
    }

    return product;
  });

  //  Bulk insert
  return await this.productModel.insertMany(products);
}

 
    // pagination and search 
    async findAll(query):Promise<Product[]>{
        const resPerPage=15      // results per page
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
        if(!products){
            throw new UnauthorizedException("vendor id mismatch")
        }
        return products;
    }

    // create product
    async createProduct(
        product:Product,
        user:Auth,
        files:Array<Express.Multer.File>
    ):Promise<Product>{
        const images=await uploadImages(files)

        const data=Object.assign(product,{
            auth:user._id,
            images:images as object[] // or proper image type
        })


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

    // get vendor products
    async getVendorProducts(
        vendorId:string
    ):Promise<Product[]>{
        const products=await this.productModel.find({auth:vendorId})
        if(!products){
            throw new NotFoundException("No products found for this vendor")
        }
        return products
    }

    
    // upload product images
    async uploadImages(
        id:string,
        files:Array<Express.Multer.File>
    ){
        const book=await this.productModel.findById(id)

        if(!book){
            throw new NotFoundException("product not found")
        }

        const images=await uploadImages(files)

        book.images=images as object[];

        await book.save();
        
        return book;
    }

}
