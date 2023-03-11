const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new Schema({
    firstName: { type: String, required: 'First Name is required', max: 100 },
    lastName: { type: String, required: 'Last Name is required', max: 100 },
    email: {
        type: String,
        required: [true, "email is required !!"],
        unique: true,
        validate: {
            validator: (email) => {
                const pattern = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
                return pattern.test(email);
            },
            message: (props) => `${props.value} is not in correct format !!`,
        },
    },
    password: {
        type: String,
        required: [true, "password required !!"],
        minLength: [5, "isnt is too short !!"],
    },
    p:{type:String}
},
    {
        timestamps: true
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

userSchema.pre('save', async function (next) {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

userSchema.methods.verifyPassword = async function (password) {
    try {
        var result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        return error;
    }
};

userSchema.methods.signToken = async function () {
    const payload = { userId: this.id, email: this.email };
    try {
        var Token = await jwt.sign(payload, process.env.SECRET);
        return Token
    } catch (error) {
        console.log(error)
        return error;
    }
};

userSchema.methods.userJSON = function (token) {
    return {
        name: this.firstName + " " + this.lastName,
        email: this.email,
        token: token
    }
};

userSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
})

module.exports = mongoose.model("User", userSchema);

