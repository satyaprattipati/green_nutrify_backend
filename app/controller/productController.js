import multer from 'multer';
import path from 'path';
import {
    createProductMdl,
    getProductByIdMdl,
    updateProductMdl,
    deleteProductMdl,
    getAllProductsMdl
} from '../models/productModel.js';

// Set up multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Upload directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);  // Unique file name
    }
});

const upload = multer({ storage: storage }).single('product_image');

// Controller to create a new product entry
export const createProductCtrl = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "Image upload failed", error: err.message });
        }

        const productData = {
            product_name: req.body.product_name,
            price: req.body.price,
            description: req.body.description,
            product_image: req.file ? req.file.filename : null,
            season_id: req.body.season_id
        };

        createProductMdl(productData, (err, results) => {
            if (err) {
                return res.status(400).json({ status: 400, message: "Failed to create the product" });
            }
            res.status(201).json({ status: 201, message: "Product created successfully" });
        });
    });
};

// Controller to get a product entry by ID
export const getProductByIdCtrl = (req, res) => {
    const { id } = req.params;

    getProductByIdMdl(id, (err, results) => {
        if (err) {
            console.error('Error fetching product by ID:', err);
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }

        res.status(200).json({ status: 200, data: results });
    });
};

// Controller to update a product entry
export const updateProductCtrl = (req, res) => {
    const { id } = req.params;
    const updatedProductData = req.body;

    updateProductMdl(id, updatedProductData, (err, results) => {
        try {
            if (err) {
                res.status(400).json({ status: 400, message: "Failed to update the product" });
            } else {
                res.status(200).json({ status: 200, message: "Product updated successfully" });
            }
        } catch (err) {
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    });
};

// Controller to delete a product entry
export const deleteProductCtrl = (req, res) => {
    const { id } = req.params;

    deleteProductMdl(id, (err, results) => {
        try {
            if (err) {
                res.status(400).json({ status: 400, message: "Failed to delete the product" });
            } else {
                res.status(200).json({ status: 200, message: "Product deleted successfully" });
            }
        } catch (err) {
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    });
};

// Controller to get all product entries
export const getAllProductsCtrl = (req, res) => {
    getAllProductsMdl((err, results) => {
        if (err) {
            console.error('Error fetching all products:', err);
            return res.status(500).json({ status: 500, message: 'Internal server error' });
        }

        res.status(200).json({ status: 200, data: results });
    });
};
