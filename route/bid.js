import express from "express";
const router = express.Router();

import {
  create_bid,
  grab_bid
} from "../controller/bid.js";
import {authenticate} from "../middleware/authenticate.js"

router.route("/:id").get(grab_bid);
router.route("/create/:id").post(authenticate, create_bid);

export default router;
