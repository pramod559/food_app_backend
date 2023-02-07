import mongoose, { mongo } from "mongoose";

export interface MenuDocument extends mongoose.Document {
    description: string,
    name: string,
    restaurantId: string,
    image_url: string,
    decription: string
}
export interface MenuItemDecument extends mongoose.Document {
    image_urls: string[];
    name: string
    menuId: string
    decription: string
    unit_price: number
}

export interface MenuModel extends mongoose.Model<MenuDocument> {
}
export interface MenuItemModel extends mongoose.Model<MenuItemDecument> { }
const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    menuId: { type: String, required: true },
    description: { type: String, required: true },
    image_urls: { type: [String] },
    unit_price: { type: Number, required: true }
})
const MenuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    restaurantId: { type: String, required: true },
    description: { type: String, required: true },
    image_urls: { type: [String] },
})
export { MenuSchema, MenuItemSchema }

