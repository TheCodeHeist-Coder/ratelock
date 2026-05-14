import { Router } from "express";
import { rateLimitCheckController } from "../controller/rateLimitController.js";

const router = Router();


/**
 * POST /api/rl/check
 * Hot path — called by SDKs on every inbound request.
 *
 * Headers:
 *   X-RL-Key       <project api key>
 *   X-RL-Endpoint  <path>    (default "/")
 *   X-RL-Method    <method>  (default "GET")
 *   X-RL-IP        <client ip> (optional)
 */

router.post("/check", rateLimitCheckController);


router.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'ratelock-engine', ts: Date.now() });
})





export default router;