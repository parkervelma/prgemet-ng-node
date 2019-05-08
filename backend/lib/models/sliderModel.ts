import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SliderSchema = new Schema({
    id: {

    },
    user_id: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        default: 'default.jpg'
    },
})