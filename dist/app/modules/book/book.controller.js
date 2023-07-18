"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_service_1 = require("./book.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const book_constsnt_1 = require("./book.constsnt");
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = __importDefault(require("../../../constant/pagination"));
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const BookData = __rest(req.body, []);
    const result = yield book_service_1.BookService.createBook(BookData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book created successfully",
        data: result,
    });
}));
const createWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const BookData = __rest(req.body, []);
    const result = yield book_service_1.BookService.createWishList(BookData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Added in Wishlist",
        data: result,
    });
}));
const createReadingList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const BookData = __rest(req.body, []);
    const result = yield book_service_1.BookService.createReadingList(BookData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Created Reading list",
        data: result,
    });
}));
const postComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const reviews = req.body.reviews;
    const result = yield book_service_1.BookService.postComment(bookId, reviews);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book created successfully",
        data: result,
    });
}));
const getComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const result = yield book_service_1.BookService.getComment(bookId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
    });
}));
const getLatestBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.getLatestBooks();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
    });
}));
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, book_constsnt_1.bookFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = yield book_service_1.BookService.getAllBooks(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_service_1.BookService.getSingleBook(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book retrieved successfully",
        data: result,
    });
}));
const getWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.getWishList();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
    });
}));
const getReadingList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.getReadingList();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield book_service_1.BookService.updateBook(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book updated successfully",
        data: result,
    });
}));
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_service_1.BookService.deleteBook(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book deleted successfully",
        data: result,
    });
}));
const removeFromWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlistId = req.params.id;
    const result = yield book_service_1.BookService.removeFromWishList(wishlistId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book deleted successfully",
        data: result,
    });
}));
const removeFromReadingList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlistId = req.params.id;
    const result = yield book_service_1.BookService.removeFromReadingList(wishlistId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Deleted successfully",
        data: result,
    });
}));
const getWishlistBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.getWishlistBook();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
    });
}));
exports.BookController = {
    createBook,
    getLatestBooks,
    getAllBooks,
    getSingleBook,
    postComment,
    getComment,
    updateBook,
    deleteBook,
    createWishList,
    getWishList,
    removeFromWishList,
    getWishlistBook,
    createReadingList,
    getReadingList,
    removeFromReadingList,
};
