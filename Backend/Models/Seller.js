import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
      },
    totalSales: { type: Number, default: 0 }, // Total sales amount
    totalOrders: { type: Number, default: 0 }, // Total number of orders
    productsSold: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'dealerProduct' },
            quantity: Number,
            revenue: Number,
        },
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProduct' },
            quantity: Number,
            revenue: Number,
        }
    ],
});

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;

