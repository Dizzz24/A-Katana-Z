import { ObjectId } from "mongodb";

export interface UserModel {
    _id: ObjectId;
    name?: string;
    username: string;
    email: string;
    password: string
}

export interface ProductModel {
    _id: ObjectId;
    name: string;
    slug: string;
    description?: string;
    excerpt?: string;
    price?: string;
    tags?: string[];
    thumbnail?: string;
    images?: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface WishlistModel {
    _id: ObjectId;
    userId: ObjectId;
    productId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface DetailWishlist {
    _id: ObjectId;
    userId: ObjectId;
    productId: ObjectId;
    Product: ProductModel
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginInput {
    email: string;
    password: string
}

export interface RegisterInput {
    name: string;
    username: string;
    email: string;
    password: string
}

export interface ProductList {
    currentPage: number;
    totalPage: number;
    totalProducts: number;
    data: ProductModel[];
}

export interface Query {
    search: string;
    page: number;
    pageSize: number
}

export type CreateUserModel = Omit<UserModel, "_id">
export type CreateProductModel = Omit<ProductModel, "_id">
export type CreateWishlistModel = Omit<WishlistModel, "_id">