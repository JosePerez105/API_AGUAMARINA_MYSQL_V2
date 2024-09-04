import Rol from "../models/1_Rol.model.js";
import Permission from "../models/2_Permission.model.js";
import RolPermissions from "../models/3_RolPermissions.model.js";
import City from "../models/4_City.model.js";
import Address from "../models/5_Address.model.js";
import Category from "../models/6_Category.model.js";
import Product from "../models/7_Product.model.js";
import Image from "../models/8_Image.model.js";
import Status from "../models/9_Status.model.js";
import Reservation from "../models/10_Reservation.model.js";
import ReservationDetail from "../models/11_ReservationDetail.model.js";
import Rent from "../models/12_Rent.model.js";
import PaymentRegister from "../models/13_PaymentRegister.model.js";
import CheckList from "../models/14_CheckList.model.js";
import CheckListItem from "../models/15_CheckListItem.model.js";
import Purchase from "../models/16_Purchase.model.js";
import PurchaseDetail from "../models/17_PurchaseDetail.model.js";
import User from "../models/18_User.model.js";
import VerificationCode from "../models/19_VerificationCode.model.js";


//Para Borrar y crear todo de nuevo
/* import sequelize from "./sequelize.js";
await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
await sequelize.drop().then(() => {console.log("Tablas borradas");});
await sequelize.query('SET FOREIGN_KEY_CHECKS = 1'); 
await Rol.sync()
await Permission.sync()
await RolPermissions.sync()
await User.sync()
await City.sync()
await Address.sync()
await Category.sync()
await Product.sync()
await Image.sync()
await Status.sync()
await Reservation.sync()
await ReservationDetail.sync()
await Rent.sync()
await PaymentRegister.sync()
await CheckList.sync()
await CheckListItem.sync()
await Purchase.sync()
await PurchaseDetail.sync()
await VerificationCode.sync()  */

//Relaciones necesarias  1:1  1:M  N:M
import '../models/0_Asossiations.js'





const cantidadRoles = await Rol.findAndCountAll();
if (cantidadRoles.count <= 0) {
    await Rol.create({name : "Admin", description : "Tiene TODOS los permisos dentro del aplicativo"}).then(() => {console.log("Rol Creado Correctamente");});
};

const cantidadPermisos = await Permission.findAndCountAll();
if (cantidadPermisos.count <= 0) {
    const Permissions = [
        {name : "Crear Usuario", description : "Puede crear Usuarios personalizados"}, //1
        {name : "Actualizar Usuario", description : "Puede actualizar datos del Usuario"}, //2
        {name : "Cambiar Estados Usuarios", description : "Puede habilitar y deshabilitar los Usuarios"}, //3
        {name : "Ver Usuarios", description : "Puede visualizar todos los Usuarios"}, //4
        {name : "Eliminar Usuarios", description : "Puede eliminar Usuarios"}, //5
        {name : "Crear Roles", description : "Puede crear Roles personalizados"}, //6
        {name : "Actualizar Roles", description : "Puede cambiar los datos de los Roles"}, //7
        {name : "Ver Roles", description : "Puede visualizar todos los Roles"}, //8
        {name : "Eliminar Roles", description : "Puede eliminar Roles"}, //9
        {name : "Gestionar Permisos", description : "Puede agregar y quitar Permisos a los Roles"}, //10
        {name : "Crear Productos", description : "Puede crear Productos personalizados"}, //11
        {name : "Actualizar Productos", description : "Puede actualizar datos de los Productos"}, //12
        {name : "Cambiar Estado Productos", description : "Puede habilitar y deshabilitar los Productos"}, //13
        {name : "Ver Productos", description : "Puede visualizar los Productos (NO confundir con ver catálogo)"}, //14
        {name : "Eliminar Productos", description : "Puede eliminar Productos"}, //15
        {name : "Generar Reserva", description : "Puede crear Reservas personalizadas"}, //16
        {name : "Cambiar Estado Reserva", description : "Puede cambiar el estado de las Reservas por un estado personalizado"}, //17
        {name : "Ver Mis Reservas", description : "Puede visualizar las Reservas hechas por ese Usuario"}, //18
        {name : "Ver Reservas", description : "Puede visualizar todas las Reservas"}, //19
        {name : "Ver Mis Alquileres", description : "Puede visualizar los Alquileres hechos por ese Usuario"}, //20
        {name : "Ver Alquileres", description : "Puede visualizar todos los Alquileres"}, //21
        {name : "Crear Registros De Pago", description : "Puede crear Registros de Pago personalizados"}, //22
        {name : "Actualizar Registros De Pago", description : "Puede actualizar datos de los Registros de Pago"}, //23
        {name : "Eliminar Registros De Pago", description : "Puede eliminar Registros de Pago"}, //24
        {name : "Ver Agenda", description : "Puede visualizar la información de la agenda"}, //25
    ];
    Permissions.map(async(per) => await Permission.create(per));
    console.log("Todos los Permisos Creados")
};

const cantidadRolPermissions = await RolPermissions.findAndCountAll();
if (cantidadRolPermissions.count <= 0) {
    const allPermissions = await Permission.findAll();
    allPermissions.map(async(per) => await RolPermissions.create({id_rol : 1, id_permission : per.id_permission}));
    console.log("Se Añadido todos los permisos al Rol de Admin");
};



console.log("Estamos Ready en el Backend");