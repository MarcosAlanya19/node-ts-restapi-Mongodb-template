import { Router } from 'express';
import * as userCtrl from '../controllers/user.controllers';

export const router = Router();

router.get('/', userCtrl.usersCtrlGet);

router.put('/:id', userCtrl.userCtrlPut);

router.post('/', userCtrl.userCtrlPost);

router.delete('/', userCtrl.userCtrlDelete);
