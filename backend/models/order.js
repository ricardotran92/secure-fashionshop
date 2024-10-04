import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      orderID: {
      type: String, //Quốc: e tạm thời đổi number sang string để tiện tạo orderID bên frontend, nếu bên a bất tiện và cần đổi thì trao đổi vs e nha. Thks
      required: true,  
      unique: true  
      },

      address: {
        type: String,
        required: true,
      },

      phoneNo: {
        type: String,
        required: true,
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        selectedColor: {
          type: String,
        },
        selectedSize: {
          type: String,
        },
        quantity: {
          type: Number,
          min: 1,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          min: 0,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],

    paymentMethod: {
      type: String,
      required: [true, "Vui lòng chọn hình thức thanh toán."],
      enum: {
        values: ["COD", "Card"],
        message: "Vui lòng chọn: COD hoặc Card.",
      },
    },

    paymentInfo: {
      id: String,
      status: String,
    },

    itemsPrice: {
      type: Number,
      min: 0,
      required: true,
    },

    shippingAmount: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      min: 0,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: {
        values: ["Processing", "Shipped", "Delivered"],
        message: "Vui lòng chọn trạng thái giao hàng.",
      },
      default: "Processing",
    },

    deliveredAt: Date,
  },
  
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);