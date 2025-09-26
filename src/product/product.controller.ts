import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, Put, Query, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import multer from 'multer';



@Controller('products')
export class ProductController {
    constructor(private productService:ProductService){}

    // getting all products with filter and pagination
    @Get()
    async getAllProducts(
        @Query()
        query,
        @Req() req,
    ):Promise<Product[]>{
        console.log(req)
        return this.productService.findAll(query)
    }

    // creating product
    @Post()
    @UseGuards(AuthGuard('jwt-auth'))
    @UseInterceptors(FilesInterceptor('files'))
    async createProduct(
        @Body()
        body:any,
        @Req() req,
        @UploadedFiles(
            // validation for images by using pipes
            new ParseFilePipeBuilder()
            .addFileTypeValidator({
              fileType:/(jpg|jpeg)$/,
            })
            .addMaxSizeValidator({
                maxSize:1000*1000,
                message:"Max size image 1mb"
            })
            .build({
                errorHttpStatusCode:HttpStatus.UNPROCESSABLE_ENTITY
            })

        ) files:Array<Express.Multer.File>
    ):Promise<Product>{
        // ✅ Manually transform body to CreateProductDto
    const productDto: CreateProductDto = {
      ...body,
      productId: Number(body.productId),
      orignalPrice: Number(body.orignalPrice),
      discountPrice: Number(body.discountPrice),
    };
      return this.productService.createProduct(productDto,req.user,files)
    }

    

// upload bulk data
    @Post('upload-excel')
  @UseGuards(AuthGuard('jwt-auth'))
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async uploadExcel(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return this.productService.importFromExcel(file, req.user);
  }

    // getting product by id
    @Get(':id')
    // @UseGuards(AuthGuard('jwt-auth'))
    async getProductById(
        @Param('id')
        id:string
    ):Promise<Product>{
        return this.productService.findById(id)
    }

    // updating product by id
    @Patch(':id')
    @UseGuards(AuthGuard('jwt-auth'))
    async getIdByUpdate(
        @Param('id')
        id:string,
        @Body()
        product:UpdateProductDto
    ):Promise<Product>{
        return this.productService.updateById(id,product)
    }

    // deleting product by id
    @Delete(':id')
    @UseGuards(AuthGuard('jwt-auth'))
    async getByIdDelete(
        @Param('id')
        id:string
    ):Promise<string>{
        return this.productService.deleteById(id)
    }


    // getting products by vendor id
    @Get()
    @UseGuards(AuthGuard('jwt-auth'))
    async getVendorProducts(
        @Req() req
    ):Promise<Product[]>{
        return this.productService.getVendorProducts(req.user._id)
    }

    
     // image upload
    @UseGuards(AuthGuard('jwt-auth'))
    @UseInterceptors(FilesInterceptor('files'))
    @Patch('upload/:id')
    async uploadImages(
        @Param('id') id:string,
        @UploadedFiles(
            // validation for images by using pipes
            new ParseFilePipeBuilder()
            .addFileTypeValidator({
              fileType:/(jpg|jpeg)$/,
            })
            .addMaxSizeValidator({
                maxSize:1000*1000,
                message:"Max size image 1mb"
            })
            .build({
                errorHttpStatusCode:HttpStatus.UNPROCESSABLE_ENTITY
            })

        ) files:Array<Express.Multer.File>
    ){
    
        return this.productService.uploadImages(id,files)
    }
}
