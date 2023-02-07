//(9) Typescript and MongoDb Backend_ Controllers [Full Stack Flutter Part 23] - YouTube



import * as mongoose from 'mongoose'

export interface UserModel extends mongoose.Document {
    type: string,
    name: string,
    email: string,
    password?: string



}
export const UserSchema = new mongoose.Schema({

    type: { type: String, require: true },
    name: String,
    email: { type: String, require: true },
    password: String
})