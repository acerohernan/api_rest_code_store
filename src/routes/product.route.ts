import { Router } from "express";
import { allProductHandler, createProductHandler, deleteProductHandler, findProductHandler, updateProductHandler } from "../controllers/product.controller";
import { requireAuth } from "../middleware/requireAuth";
import validate from "../middleware/validateResource";
import { createProductSchema, deleteProductSchema, findProductSchema, updateProductSchema } from "../schema/product.schema";

const router = Router();

///////////////////////////////////////////////// ROUTES ///////////////////////////////////////////////////////

// @route   GET api/product
// @desc    Get all products
// @access  Public
router.get('', allProductHandler);

// @route   POST api/product
// @desc    Create a product
// @access  Private
router.post('', requireAuth, validate(createProductSchema) ,createProductHandler);

// @route   GET api/product/:productId
// @desc    Find product
// @access  Private
router.get('/:productId', validate(findProductSchema), findProductHandler);

// @route   PUT api/product/:productId
// @desc    Update product
// @access  Private
router.put('/:productId', requireAuth, validate(updateProductSchema), updateProductHandler);

// @route   DELETE api/product/:productId
// @desc    Delete product
// @access  Private
router.delete('/:productId', requireAuth, validate(deleteProductSchema), deleteProductHandler);

export default router;