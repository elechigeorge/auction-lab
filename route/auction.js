import express from "express";
const router = express.Router();

import {
  grab_auction,
  create_auction,
  delete_auction,
  single_auction,
} from "../controller/auction.js";

import {authenticate} from "../middleware/authenticate.js"

router.route("/z").get(grab_auction);
router.route("/create").post(authenticate, create_auction);
router.route("/z/:id").delete(authenticate, delete_auction).get(single_auction);

export default router;
