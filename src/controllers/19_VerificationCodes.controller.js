import VerificactionsCodes from '../models/19_VerificationCode.model.js';
import bcrypt from 'bcrypt'

export const getVerificationCodes = async(req, res) => {
    const codes = await VerificactionsCodes.findAll();
    try {
        res.status(200).json({
            ok : true,
            status : 200,
            body : codes
        });
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    };
};

export const generateCode = async(req, res) => {
    const {mail} = req.body;
    const code = generateRandomCode();

    const salt = await bcrypt.genSalt(10);
    const code_bcrypt = await bcrypt.hash(code.toString(), salt);

    const response = await fetch('http://worldtimeapi.org/api/timezone/America/Bogota',{method : 'GET'});
    const data = await response.json();
    const original = new Date(data.datetime);
    console.log(original)
    original.getMinutes(original.getMinutes() + 10); //10 Minutos de tiempo de expiración
    const expires_at = original;

    console.log(expires_at, code)
    try {
        const [createdCode, created] = await VerificactionsCodes.upsert({mail, code : code_bcrypt, expires_at});
    
        res.status(201).json({
            ok: true,
            status: 201,
            message: created ? "Created Code" : "Updated Code",
            body: createdCode
        });
    } catch (err) {
        res.status(400).json({
            ok: false,
            status: 400,
            err
        });
    };
};

export const validateVerificationCode = async(req, res) => {
    const {mail} = req.body;
    const codeStr = (req.body.code).toString();

    try {
        const allCodes = await VerificactionsCodes.findAll({where : {mail}});
        if (allCodes.length === 0) {
            return res.status(201).json({ok: false, message: "No se encontró un código para este correo"})
        };

        const storedCode = allCodes[0].code;
        console.log(allCodes[0].expires_at)
        const expires_at = new Date(allCodes[0].expires_at);
        console.log(expires_at);

        const currentTime = await rightNow();
        console.log(currentTime)


        if (currentTime > expires_at) {
            return res.status(201).json({ ok: false, message: "El código de Verificación ha expirado"});
        };

        const isMatch = await bcrypt.compare(codeStr, storedCode);
        if (!isMatch) {
            return res.status(201).json({ok: false, message: 'Código de verificación incorrecto'});
        };


        deleteCode(mail);
        return res.status(201).json({ok: true, message: 'Código de verificación correcto'});
    } catch(err) {
        res.status(400).json({
            ok: false,
            status: 400,
            err
        });
    };
};






//Funciones

const generateRandomCode = () => {
    return Math.floor(Math.random() * 900000 + 100000)
}

const deleteCode = async(mail) => {
    await VerificactionsCodes.destroy({where : {mail}});
}

const rightNow = async() => {
    const response = await fetch('http://worldtimeapi.org/api/timezone/America/Bogota',{method : 'GET'});
    const data = await response.json();
    const original = new Date(data.utc_datetime);
    return original;
};