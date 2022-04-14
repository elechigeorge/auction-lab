import mongoose from "mongoose";
import timestamp from "mongoose-timestamp";

const UserSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

UserSchema.plugin(timestamp);

const User = mongoose.model("User", UserSchema);

export default User;