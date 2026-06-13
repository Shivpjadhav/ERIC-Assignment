const express =
    require("express");

const router =
    express.Router();

const auth =
    require(
        "../middleware/authMiddleware"
    );

const productController =
    require(
        "../controllers/productController"
    );

router.get(
    "/",
    productController.getProducts
);

router.post(
    "/",
    auth,
    productController.addProduct
);

router.put(
    "/:id",
    auth,
    productController.updateProduct
);

router.post(
    "/like/:id",
    auth,
    productController.likeProduct
);

router.get(
    "/liked",
    auth,
    productController.getLikedProducts
);
router.get(
    "/:id",
    productController.getSingleProduct
);

module.exports =
    router;