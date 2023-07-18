"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
"../../../interface/pagination";
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
exports.BookService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const mongoose_1 = require("mongoose");
const wishlist_model_1 = __importDefault(require("./wishlist.model"));
const book_model_1 = __importDefault(require("./book.model"));
const read_model_1 = __importDefault(require("./read.model"));
const book_constsnt_1 = require("./book.constsnt");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createBook = (BookData) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield book_model_1.default.create(BookData);
    return newBook;
});
const createWishList = (BookData) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author } = BookData;
    const existingWishlist = yield wishlist_model_1.default.findOne({ title, author });
    if (existingWishlist) {
        throw new ApiError_1.default(409, "Already exist in wishlist");
    }
    const newWishlist = yield wishlist_model_1.default.create(BookData);
    return newWishlist;
});
const createReadingList = (BookData) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author } = BookData;
    const existingWishlist = yield read_model_1.default.findOne({ title, author });
    if (existingWishlist) {
        throw new ApiError_1.default(409, "Already exist in Reading List");
    }
    const newWishlist = yield read_model_1.default.create(BookData);
    return newWishlist;
});
const postComment = (id, reviews) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.updateOne({ _id: new mongoose_1.Types.ObjectId(id) }, { $push: { reviews: reviews } });
    if (result.modifiedCount !== 1) {
        console.error("Product not found or comment not added");
    }
    return result;
});
const getComment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.findOne({ _id: new mongoose_1.Types.ObjectId(id) });
    return result;
});
const getLatestBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.default.find().sort({ publicationDate: -1 }).limit(10);
    return books;
});
const getWishList = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.default.find();
    return books;
});
const getReadingList = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield read_model_1.default.find();
    return books;
});
const getAllBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_constsnt_1.andConditionSearchFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.default.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield book_model_1.default.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.findById(id);
    return result;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.default.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(404, "Book not found !");
    }
    const BookData = __rest(payload, []);
    const updatedBookData = Object.assign({}, BookData);
    const result = yield book_model_1.default.findOneAndUpdate({ _id: id }, updatedBookData, {
        new: true,
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.findByIdAndDelete(id);
    return result;
});
const removeFromWishList = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_model_1.default.findByIdAndDelete(id);
    return result;
});
const removeFromReadingList = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield read_model_1.default.findByIdAndDelete(id);
    return result;
});
const getWishlistBook = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield wishlist_model_1.default.find();
    return books;
});
exports.BookService = {
    getLatestBooks,
    getAllBooks,
    createBook,
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
