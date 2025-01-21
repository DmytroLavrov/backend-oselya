import { v2 as cloudinary } from 'cloudinary';
import ProductModel from '../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.path : ''; // If you're using multer for image upload

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image);
    const newProduct = new ProductModel({
      name,
      description,
      price,
      category,
      image: result.secure_url, // URL of the image on Cloudinary
      date: Date.now(),
    });

    const product = await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: 'Product created!', product });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Error creating product.' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products.' });
  }
};

export const getProduct = async (req, res) => {
  try {
    // const product = await ProductModel.findById(req.params.id);

    const { productId } = req.body; // ID передається в тілі запиту
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching product.' });
  }
};

// export const updateProduct = async (req, res) => {
//   try {
//     const { name, description, price, category } = req.body;
//     const product = await ProductModel.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found.' });
//     }

//     product.name = name || product.name;
//     product.description = description || product.description;
//     product.price = price || product.price;
//     product.category = category || product.category;

//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path);
//       product.image = result.secure_url;
//     }

//     const updatedProduct = await product.save();
//     res.json(updatedProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating product.' });
//   }
// };

export const deleteProduct = async (req, res) => {
  try {
    // const product = await ProductModel.findById(req.params.id);
    // if (!product) {
    //   return res.status(404).json({ message: 'Product not found.' });
    // }

    await ProductModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: 'Product deleted.' });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: 'Error deleting product.' });
  }
};
