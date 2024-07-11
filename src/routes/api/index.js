import express from "express";

const router = express.Router();
import {
  getAllSignalRouteHandler,
  getSignalRouteHandler,
} from "../../services/api/index.js";


// get single signal
router.get(
  "/signal/get/:id",
  (req, res) => { getSignalRouteHandler(req, res) }
);

// get all signal
router.get("/signals", (req, res) => {
  getAllSignalRouteHandler(req, res);
});

export default router;
