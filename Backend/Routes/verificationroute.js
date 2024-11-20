import express from 'express';
const router = express.Router();
import { upload } from '../Database/Cloudinary.js';

import { getVerificationbyId,getVerifications,postVerifications,getVerificationStatus,approveVerifiedUser } from '../Controller/Verifications.js';

router.get("/dealer/getverificationbyid", getVerificationbyId);
router.get("/dealer/getallverification", getVerifications);
router.get("/dealer/getverificationstatus/:id", getVerificationStatus);
router.get("/dealer/approveverifieduser/:id", approveVerifiedUser);
router.post('/dealer/postverifications',upload.single("licenseImage"),postVerifications);

export default router;