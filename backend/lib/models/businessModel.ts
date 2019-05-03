import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const BusinessSchema = new Schema({
    id: {
        type: String,
        default: ''
    },
    user_id: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: ''
    },
    currency: {
        type: String,
        default: ''
    },
    fromAmount: {
        type: String,
        default: ''
    },
    toAmount: {
        type: String,
        default: ''
    },
    startDate: {
        type: String,
        default: ''
    },
    endDate: {
        type: String,
        default: ''
    },
    about: {
        type: String,
        default: ''
    },
    productModelNumber: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        default: 'default.jpg'
    },
    extraBlob: {
        type: String,
        default: '1'   // 1: picture from gridfs, 2: picture from general fs
    },
    extraStr: {
        type: String,
        default: ''
    },
});