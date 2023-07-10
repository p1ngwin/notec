import mongoose from "mongoose"

export const dateType = (date: string) => new Date(date)

export const idType = (id: string) => new mongoose.Types.ObjectId(id)