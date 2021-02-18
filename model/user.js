const mongoose = require('mongoose'); // MongoDB
const bcrypt = require('bcrypt'); // Encrypt password

// What the user schema consist
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    }, // Must confirm with an email
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    postalCode: String,
    image: String //Foreign key to image
});

// Pre-hook to encrypt password so non-human readable in DB
UserSchema.pre(
    'save',
    async function (next) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
);

// Compare a password and tell if it match
UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;