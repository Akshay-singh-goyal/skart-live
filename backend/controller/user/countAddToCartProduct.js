const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res) => {
    try {
        const userId = req.userId;

        const count = await addToCartModel.countDocuments({ userId });

        res.json({
            success: true,
            error: false,
            message: "ok",
            data: { count }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal Server Error."
        });
    }
};

module.exports = countAddToCartProduct;
