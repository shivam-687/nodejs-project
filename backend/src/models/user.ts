import { Document, Schema, Model, model, Error } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

export interface IUser {
    name: string,
    email: string
    password: string
}

export interface IUserDocument extends IUser, Document{
    comparePassword: (candidatePassword: string, callback: any) => void
}

export const userSchema: Schema<IUserDocument> = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, { timestamps: true })

// userSchema.pre<IUser>('save', function save(next) {
//     const user = this

//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) {
//             return next(err)
//         }
//         bcrypt.hash(this.password, salt, null, (err: Error, hash) => {
//             if (err) {
//                 return next(err)
//             }
//             user.password = hash
//             next()
//         })
//     })
// })


userSchema.methods.comparePassword = function (candidatePassword: string, callback: any) {
    bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
        console.log({isMatch, candidatePassword, pass: this.password})
        callback(err, isMatch)
    })
}

export const User: Model<IUserDocument> = model<IUserDocument>('User', userSchema)