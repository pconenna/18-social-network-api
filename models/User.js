const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {type: String, trim: true, required: true, unique: true, dropDups: true}
        
    }
)