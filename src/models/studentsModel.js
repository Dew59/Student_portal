import {Schema, model} from 'mongoose'
import bcrypt from 'bcrypt'

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    registrationNumber: {
        type: String,
        required: true,
    }
},{ timestamps: true, })

studentSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);
})

const Student = model("Student", studentSchema);

export default Student;