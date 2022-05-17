import { Request, Response } from "express";
import { createProduct, findAllProducts, findProduct, findProductAndDelete, findProductAndUpdate} from "../service/product.service";
import log from "../utils/logger";

export async function allProductHandler (req: Request, res: Response){
    try{
        const allProducts = await findAllProducts();

        res.status(200).json({
            message: "All products obtained",
            success: true,
            data: allProducts
        })
    }catch(e: any){
        log.error(e.message || e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false,
        })
    }
};

export async function findProductHandler (req: Request, res: Response){
    try{

        const {productId} = req.params;

        const product = await findProduct({_id: productId});

        if(!product){
           return res.status(400).json({
            message: "The product not exists.",
            success: false
            }) 
        };

         res.status(200).json({
            message: "Product obtained",
            success: true,
            data: product
        })
    }catch(e: any){
        log.error(e.message || e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false,
        })
    }
};

export async function createProductHandler (req: Request, res: Response){
    try{
        const {code} = req.body;
        const isCreated = await findProduct({code});

        if(isCreated){
            return res.status(400).json({
                message: "The code is taken. Please enter a different code.",
                success: false,
            });
        };

        const createdProduct = await createProduct(req.body);

        res.status(200).json({
            message: "Product created successfully",
            success: true,
            data: createdProduct
        })
    }catch(e: any){
        log.error(e.message || e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false,
        })
    }
};

export async function updateProductHandler (req: Request, res: Response){
    try{

        const {productId} = req.params;

        const product = await findProduct({_id: productId});

        if(!product){
           return res.status(400).json({
            message: "The product not exists.",
            success: false
            }) 
        };

        const updatedProduct = await findProductAndUpdate({_id: productId}, req.body);

         res.status(200).json({
            message: "Product updated",
            success: true,
            data: updatedProduct
        })
    }catch(e: any){
        log.error(e.message || e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false,
        })
    }
};

export async function deleteProductHandler (req: Request, res: Response){
    try{

        const {productId} = req.params;

        const product = await findProduct({_id: productId});

        if(!product){
           return res.status(400).json({
            message: "The product not exists.",
            success: false
            }) 
        };

        const deletedProduct = await findProductAndDelete({_id: productId});

         res.status(200).json({
            message: "Product deleted",
            success: true,
            data: deletedProduct
        })
    }catch(e: any){
        log.error(e.message || e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false,
        })
    }
};