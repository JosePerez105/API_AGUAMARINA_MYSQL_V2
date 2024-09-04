import express from 'express';
import morgan from 'morgan';

import rolesRoutes from '../src/routes/1_Roles.routes.js';
import permissionsRoutes from '../src/routes/2_permissions.routes.js';
import citiesRoutes from '../src/routes/4_Cities.routes.js';
import addressesRoutes from '../src/routes/5_Addresses.routes.js';
import categoriesRoutes from '../src/routes/6_Categories.routes.js';
import productsRoutes from '../src/routes/7_Products.routes.js';
import imagesRoutes from '../src/routes/8_Images.routes.js';
import statusRoutes from '../src/routes/9_Status.routes.js';
import reservationsRoutes from '../src/routes/10_Reservation.routes.js';
import reservationDetailsRoutes from '../src/routes/11_ReservationDetails.routes.js';
import rentsRoutes from '../src/routes/12_Rents.routes.js';
import paymentRegistersRoutes from '../src/routes/13_PaymentRegisters.routes.js';
import checkListsRoutes from '../src/routes/14_CheckLists.routes.js';
import checkListItemsRoutes from '../src/routes/15_CheckListItems.routes.js';
import purchasesRoutes from '../src/routes/16_Purchases.routes.js';
import purchaseDetailsRoutes from '../src/routes/17_PurchaseDetails.routes.js';
import verificationCodesRoutes from '../src/routes/19_VerificationCodes.routes.js'

import '../src/db/initialization.js';

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.json({message : "This is Express"});
});

app.use('/api/v2', rolesRoutes);
app.use('/api/v2', permissionsRoutes);
app.use('/api/v2', citiesRoutes);
app.use('/api/v2', addressesRoutes);
app.use('/api/v2', categoriesRoutes);
app.use('/api/v2', productsRoutes);
app.use('/api/v2', imagesRoutes);
app.use('/api/v2', statusRoutes);
app.use('/api/v2', reservationsRoutes);
app.use('/api/v2', reservationDetailsRoutes);
app.use('/api/v2', rentsRoutes);
app.use('/api/v2', paymentRegistersRoutes);
app.use('/api/v2', checkListsRoutes);
app.use('/api/v2', checkListItemsRoutes);
app.use('/api/v2', purchasesRoutes);
app.use('/api/v2', purchaseDetailsRoutes);
app.use('/api/v2', verificationCodesRoutes);


export default app;