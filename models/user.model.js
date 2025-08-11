const mongoose = require(`mongoose`);
const bcrypt = require ('bcrypt')
const validator = require(`validator`);

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, `please tell us your first name`]
    },
    lastName: {
        type: String,
        required: [true, `Please tell us your last name`]
    },
    email: {
        type: String,
        required: [true, `please provide a valid mail`],
        unique: true,
        validate: [validator.isEmail, 'please provide a valid mail']

    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    }

}, {timestamps: true});

//virtual field for password confirmatyion.
userSchema.virtual('passwordConfirm').get(function() {
return this._passwordConfirm;
});


//validate password confirmation 
userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();

    if (this.password !== this.passwordConfirm) {
        return next(new Error("Password are not the same!"));
    }  
    
    next();
});

// hash the password before saving it to the database
userSchema.pre('save', async function(next)  {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model('User', userSchema);

// this is going to allow us import into anothe file.
module.exports = User;