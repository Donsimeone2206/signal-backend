import express from "express";
import passport from "passport";

const router = express.Router();
import {
  addSignalRouteHandler,
  getAllSignalRouteHandler,
  getSignalRouteHandler,
  patchSignalRouteHandler,
  deleteSignalRouteHandler,
} from "../../services/signal/index.js";

// add signal
router.post(
  "/add",
  async (req, res) => {
    addSignalRouteHandler(req, res)
  }
);
// get single signal
router.get(
  "/get/:id",
  (req, res) => { getSignalRouteHandler(req, res) }
);

// get all signal
router.get(
  "/get",
  (req, res) => { getAllSignalRouteHandler(req, res) }
);

// update signal
router.patch(
  "/update/:id",
  async (req, res) => {
    //console.log(req.body);
    patchSignalRouteHandler(req, res)
  }
);

// delete signal
router.delete(
  "/delete/:id",
  async (req, res) => {
    console.log(req.params);
    deleteSignalRouteHandler(req, res)
  }
);

export default router;
