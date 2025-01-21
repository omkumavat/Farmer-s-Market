import FarmerProduct from "../Models/farmerProducts.js";
import { User } from "../Models/User.js";
import Seller from "../Models/Seller.js";
import cloudinary from "cloudinary";
import { upload, uploadToCloudinary } from "../Database/Cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const {
      productName,
      category,
      subCategory,
      quantity,
      pricePerUnit,
      description,
      qualityGrade,
      unit,
      farmAddress,
      pincode,
      districtState,
      availableFrom,
      availableUntil,
      userId,
      images,
    } = req.body;

    const imageUrls = [];

    for (let image of images) {
      let base64Image; // Change `const` to `let` to allow reassignment

      if (typeof image === "string" && image.startsWith("data:image")) {
        // Split the base64 string to extract the image data (after 'data:image/png;base64,')
        base64Image = image.split(",")[1]; // Extract the base64 string from the image
      } else {
        // Handle the case where the image is not a base64 string, assuming it's a file path or URL
        base64Image = image; // If not a base64, you need to upload directly (this is a placeholder for your actual file handling logic)
      }

      try {
        // Upload the image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(
          `data:image/png;base64,${base64Image}`,
          {
            folder: "FarmerProduct_images", // Optional: Cloudinary folder name
            use_filename: true, // Optional: Use original file name
            unique_filename: true, // Optional: Ensure a unique file name
          }
        );

        // Save the image URL for reference
        imageUrls.push(uploadResponse.secure_url);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        // Handle any errors you encounter during the upload
      }
    }

    // Create new product document
    const newProduct = new FarmerProduct({
      productName,
      category,
      subCategory,
      quantity,
      pricePerUnit,
      description,
      images: imageUrls,
      qualityGrade,
      unit,
      farmAddress,
      pincode,
      districtState,
      availableFrom,
      availableUntil,
      userId,
    });

    const savedProduct = await newProduct.save();
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Dealer not found" });
    }

    user.farmerProducts.push(savedProduct._id);
    await user.save();
    res.status(201).json({ success: true, product: savedProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// export const getAllProducts = async (req, res) => {
//   try {
//     // Aggregation pipeline
//     const products = await Seller.aggregate([
//       // Unwind the productsSold array to process each product
//       { $unwind: "$productsSold" },

//       // Group by productId and calculate the total quantity sold
//       {
//         $group: {
//           _id: "$productsSold.productId", // Group by productId
//           totalQuantitySold: { $sum: "$productsSold.quantity" }, // Sum the quantity sold
//         },
//       },

//       // Perform a lookup to join with the dealerProduct collection to get product details
//       {
//         $lookup: {
//           from: "farmerproducts", // The name of the products collection
//           localField: "_id", // Match the productId in Seller to _id in dealerProduct
//           foreignField: "_id", // The field in the dealerProduct collection
//           as: "productDetails", // Alias for the joined data
//         },
//       },

//       // Unwind the productDetails array to flatten the data
//       { $unwind: "$productDetails" },

//       // Project the necessary fields to include in the final result
//       {
//         $project: {
//           _id: 0, // Exclude the default _id field
//           productId: "$_id", // Include productId
//           title: "$productDetails.title", // Product title
//           price: "$productDetails.price", // Product price
//           totalQuantitySold: 1, // Total quantity sold
//           category: "$productDetails.category", // Product category
//           serviceType: "$productDetails.serviceType", // Service type
//           images: "$productDetails.images", // Product images
//           largerSizes: "$productDetails.largerSizes", // Larger sizes
//           smallerSizes: "$productDetails.smallerSizes", // Smaller sizes
//           size: "$productDetails.size", // Size
//           sizeUnit: "$productDetails.sizeUnit", // Size unit
//         },
//       },

//       // Sort by totalQuantitySold in descending order (highest sales first)
//       { $sort: { totalQuantitySold: -1 } },

//       // Limit to the top 5 products
//       { $limit: 5 },
//     ]);

//     console.log(products);

//     return res.status(200).json({
//       success: true,
//       message: "Top popular products fetched successfully",
//       data: products,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Error fetching popular products",
//       error: error.message,
//     });
//   }
// };
export const getAllProducts = async (req, res) => {
  try {
    const products = await Seller.aggregate([
      // Unwind the productsSold array to process each product
      { $unwind: "$productsSold" },

      // Group by productId and calculate the total quantity sold
      {
        $group: {
          _id: "$productsSold.productId", // Group by productId
          totalQuantitySold: { $sum: "$productsSold.quantity" }, // Sum the quantity sold
        },
      },

      // Perform a lookup to join with the farmerProducts collection to get product details
      {
        $lookup: {
          from: "farmerproducts", // The name of the FarmerProduct collection
          localField: "_id", // Match the productId in Seller to _id in FarmerProduct
          foreignField: "_id", // The field in the FarmerProduct collection
          as: "productDetails", // Alias for the joined data
        },
      },

      // Unwind the productDetails array to flatten the data
      { $unwind: "$productDetails" },

      // Project the necessary fields to include in the final result
      {
        $project: {
          _id: "$productDetails._id", // Exclude the default _id field
          // Include productId
          productName: "$productDetails.productName", // Product name
          pricePerUnit: "$productDetails.pricePerUnit", // Price per unit
          totalQuantitySold: 1, // Total quantity sold
          category: "$productDetails.category", // Product category
          subCategory: "$productDetails.subCategory", // Subcategory
          qualityGrade: "$productDetails.qualityGrade", // Quality grade
          images: "$productDetails.images", // Product images
          unit: "$productDetails.unit", // Product unit
          farmAddress: "$productDetails.farmAddress", // Farm address
          availableFrom: "$productDetails.availableFrom", // Available from
          availableUntil: "$productDetails.availableUntil", // Available until
        },
      },

      // Sort by totalQuantitySold in descending order (highest sales first)
      { $sort: { totalQuantitySold: -1 } },

      // Limit the number of results (default to top 5)
      { $limit: 5 },
    ]);

    console.log(products);

    return res.status(200).json({
      success: true,
      message: "Top popular farmer products fetched successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching farmer products",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await FarmerProduct.findById(id).populate("userId");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch product. Please try again." });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    console.log(category);
    const products = await FarmerProduct.find({ category });
    console.log(products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch products by category",
      });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await FarmerProduct.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id; // Get product ID from request params
    const {
      productName,
      pricePerUnit,
      size,
      unit,
      quantity,
      category,
      subCategory,
      images,
      description,
      farmAddress,
      availableFrom,
      qualityGrade,
      availableUntil,
      pincode,
      districtState,
    } = req.body;
    console.log(req.body);
    const imageUrls = [];

    for (let image of images) {
      let base64Image;

      if (image.startsWith("data:image")) {
        const base64Image = image.split(";base64,").pop();
        try {
          // Upload the image to Cloudinary
          const uploadResponse = await cloudinary.uploader.upload(
            `data:image/png;base64,${base64Image}`,
            {
              folder: "DealerProduct_images", // Optional: Cloudinary folder name
              use_filename: true, // Optional: Use original file name
              unique_filename: true, // Optional: Ensure a unique file name
            }
          );

          imageUrls.push(uploadResponse.secure_url);
        } catch (error) {
          console.error("Error uploading image to Cloudinary:", error);
          // Handle any errors you encounter during the upload
        }
      } else {
        imageUrls.push(image);
      }
    }

    // Find the product by ID and update it with new values
    const updatedProduct = await FarmerProduct.findByIdAndUpdate(
      productId,
      {
        productName,
        pricePerUnit,
        size,
        unit,
        quantity,
        category,
        subCategory,
        images: imageUrls,
        description,
        farmAddress,
        availableFrom,
        qualityGrade,
        availableUntil,
        pincode,
        districtState,
        userId: productId,
      },
      { new: true, runValidators: true } // Return the updated document and validate data
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(updatedProduct);
    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSimilarProducts = async (req, res) => {
  try {
    // Get the limit from the query parameter (default to 6 if not provided)
    const limit = parseInt(req.query.limit) || 1000;
    console.log(limit);

    const products = await FarmerProduct.find().limit(limit);

    return res.status(201).json({
      success: true,
      message: "Product fetched successfully",
      data: products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

export const getFarmerSearch = async (req, res) => {
  try {
    const query = req.query.q; 
    console.log("Search query:", query);

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "No search term provided",
      });
    }

    // Define the search conditions for MongoDB
    const searchRegex = new RegExp(query, "i"); // Case-insensitive regex for partial matches
    const conditions = {
      $or: [
        { productName: searchRegex },
        { subCategory: searchRegex },
        { category: searchRegex },
        { description: searchRegex },
      ],
    };

    console.log("Search conditions:", conditions);

    // Query the database for matching products
    const products = await FarmerProduct.find(conditions);
    console.log("Found products:", products);

    // Return the results
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error searching for products:", error);
    return res.status(500).json({
      success: false,
      message: "Error searching for products",
      error: error.message,
    });
  }
};

export const postComment = async (req, res) => {
  try {
    const productId = req.params.id;
    const { comment, userId, rating,date } = req.body;

    // Validate input
    if (!comment || !userId || !rating) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Validate rating range
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be a number between 1 and 5." });
    }

    const product = await FarmerProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Add the comment
    const newComment = { rating, userId, comment,date };
    product.comments.push(newComment);

    // Save the updated product
    await product.save();

    res.status(201).json({ message: "Comment added successfully.", comment: newComment });
  } catch (error) {
    console.error("Error posting comment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


export const getComments = async (req, res) => {
  try {
    const productId = req.params.id; // Get the product ID from params

    // Step 1: Fetch the product with comments
    const product = await FarmerProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found or no comments available." });
    }

    // Step 2: Fetch the user details for each comment
    const commentsWithUserDetails = await Promise.all(
      product.comments.map(async (comment) => {
        // Fetch the user details based on userId in each comment
        const user = await User.findById(comment.userId);
        return {
          rating: comment.rating,
          comment: comment.comment,
          date: comment.date,
          name: user ? user.name : "Anonymous", // Fallback if no user found
        };
      })
    );

   console.log("/////////////////",commentsWithUserDetails)
    res.status(200).json({ comments: commentsWithUserDetails });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
