const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Debe ser un correo válido" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                error: "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, un número y un símbolo"
            });
        }

        let user = await userModel.findOne({ email });

        if (user) {
            return res.status(400).json({ error: "Este usuario ya existe con este Email" });
        }

        user = new userModel({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = createToken(user._id);

        res.status(200).json({ _id: user._id, name, email, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });

        if (!user) return res.status(400).json("Correo o contraseña invalida")

        const IsValidPassword = await bcrypt.compare(password, user.password)

        if (!IsValidPassword) return res.status(400).json("Correo o contraseña invalida")

        const token = createToken(user._id);

        res.status(200).json({ _id: user._id, name: user.name, email, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }

};

const findUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userModel.findById(userId)

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
module.exports = { registerUser, loginUser, findUser };
