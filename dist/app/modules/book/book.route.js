"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post("/", book_controller_1.BookController.createBook);
router.post("/wishlist", book_controller_1.BookController.createWishList);
router.post("/reading-list", book_controller_1.BookController.createReadingList);
router.get("/latest-book", book_controller_1.BookController.getLatestBooks);
router.get("/wishlist", book_controller_1.BookController.getWishlistBook);
router.get("/", book_controller_1.BookController.getAllBooks);
router.get("/wishlist", book_controller_1.BookController.getWishList);
router.get("/reading-list", book_controller_1.BookController.getReadingList);
router.get("/:id", book_controller_1.BookController.getSingleBook);
router.post("/comment/:id", book_controller_1.BookController.postComment);
router.get("/comment/:id", book_controller_1.BookController.getComment);
router.delete("/:id", book_controller_1.BookController.deleteBook);
router.delete("/wishlist/:id", book_controller_1.BookController.removeFromWishList);
router.delete("/reading-list/:id", book_controller_1.BookController.removeFromReadingList);
router.patch("/:id", book_controller_1.BookController.updateBook);
exports.BookRoutes = router;
