const express = require('express');
const router = express.Router();
const cjController = require('../controllers/cjController');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all CJ routes
router.use(authMiddleware);

// Test route
router.get('/test-auth', cjController.authTest);

// Route for (공통)1DAY 토큰 발행 (WS_OPENAPI_006_FL / ReqOneDayToken)
router.post('/token', cjController.requestToken);

// Route for (공통)운송장 번호 생성 (WS_OPENAPI_005_FL / ReqInvcNo)
router.post('/invoice', cjController.createInvoice);

// Route for (공통)주소 정제 (WS_OPENAPI_002_FL / ReqAddrRfn)
router.post('/address', cjController.refineAddress);

// Route for (일반)예약 접수 (WS_OPENAPI_001_FL / RegBook)
router.post('/book', cjController.registerBooking);

module.exports = router;
