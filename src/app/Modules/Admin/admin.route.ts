import express from 'express';

import { adminValidations } from './admin.validation';
import validationMiddleware from '../../middleware/validateReq';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get('/getAllAdmin', AdminControllers.getAllAdmins);

router.get('/getSingleAdmin/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/updateAdmin/:id',
  validationMiddleware(adminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/deleteAdmin/:adminId', AdminControllers.deleteAdmin);

export const AdminRouter = router;
