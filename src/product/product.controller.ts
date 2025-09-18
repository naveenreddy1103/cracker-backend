import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';



@Controller('products')
export class ProductController {
    constructor(private productService:ProductService){}

    // getting all products with filter and pagination
    @Get()
    async getAllProducts(
        @Query()
        query
    ):Promise<Product[]>{
        return this.productService.findAll(query)
    }

    @Post()
    @UseGuards(AuthGuard('jwt-auth'))
    async createProduct(
        @Body()
        product:CreateProductDto,
        @Req() req,
    ):Promise<Product>{
      return this.productService.createProduct(product,req.user)
    }

    // getting product by id
    @Get(':id')
    @UseGuards(AuthGuard('jwt-auth'))
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
}
