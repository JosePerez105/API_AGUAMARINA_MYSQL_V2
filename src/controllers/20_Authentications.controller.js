import Users from "../models/18_User.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import "../config.js";
import { getNamesPermissionsByRolFunc } from "./3_RolPermissions.controller.js";

export const validateLogin = async(req, res) => {
    const {mail, password} = req.body
    const passwordStr = password.toString();
    try {
        const users = await Users.findAll({where : {mail}})
        if (users.length <= 0) {
            return res.status(200).json({
                message : "No existe una cuenta con este correo",
                logged : false
            })
        }
        const user = users[0]
        const active = user.status

        
        const isMatch =  await bcrypt.compare(passwordStr, user.password)
        if (isMatch) {
            if(!active) {
                return res.status(200).json({
                    message : "No puedes iniciar sesión ahora, tu usuario está Inhabilitado",
                    logged : false
                })
            }
            
            const payload = {
                id_user : user.id_user,
                names : user.names,
                lastnames : user.lastnames,
                dni : user.dni,
                mail : user.mail,
                password : user.password,
                phone_number : user.phone_number,
                id_rol : user.id_rol,
                status : user.status
            }
            const accessToken = generateAccessToken(payload)
            res.cookie('jwt_ag', accessToken, {
                //httpOnly: true,
                maxAge: 12 * 60 * 60 * 1000,
                secure: true,
                sameSite: 'None'
            }) 
            res.status(200).header('authorization', accessToken).json({
                    message : "Inicio de Sesión Correcto",
                    data : payload,
                    logged : true
                }
            )
        } else {
            await res.status(400).json({
                message : "Contraseña Incorrecta",
                logged : false
            })
        }
    } catch(err) {
        res.status(400).json({
            ok : false,
            status : 400,
            error : err.message || err
        });
    };
}

export function generateAccessToken(payload) {
    return  jwt.sign(payload, process.env.SECRET_JWT, {expiresIn : '12h'})
}


export const validateToken = (req, res, next) => {
    const token = req.cookies.jwt_ag || req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ message: 'No Autorizado: No se proporcionó un token' });
    }
  
    jwt.verify(token, process.env.SECRET_JWT, (err, payload) => {
        if (err) {
          console.log('Error en la verificación del token:', err);
          return res.status(403).json({ message: 'Token inválido o expirado' });
        }
        console.log('Token Válido');
        req.user = payload;
        next();
    });
};

export const validatePermission = (requiredPermission) => {
    return async (req, res, next) => {
        try {
          const id_user = req.user.id_user;
          const user = await Users.findByPk(id_user);
          if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
          }
          const permissions = await getNamesPermissionsByRolFunc(user.id_rol);
          console.log("Permisos chequeados: ", permissions)
    
          if (!permissions.includes(requiredPermission)) {
            return res.status(403).json({ message: 'No tienes permisos para entrar aquí' });
          }
    
          next();
        } catch(err) {
            res.status(400).json({
                ok : false,
                status : 400,
                err
            });
        };
      };
};

export const validateLogout = async(req, res) => {
    try {
        res.clearCookie('jwt_ag', { path : '/'});
        res.status(200).json({
            ok : true,
            status : 200,
            message : "Logout Successfully"
        });
    } catch (err) {
        res.status(400).json({
            ok : false,
            status : 400,
            err
        });
    }
};
