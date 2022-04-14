import asyncHandler from "express-async-handler";
import Auction from "../model/auction.js";
import Bid from "../model/bid.js";

// GET /bid/:auctionId
// get all bids for an auction
const grab_bid = asyncHandler(async (request, response) => {
  try {
    const bids = await Bid.find({ auction: request.params.id }).populate("auction").sort(
      "desc"
    );

    if (bids) {
      response.status(200).json(bids);
    }
  } catch (error) {
    response.status(500).json({ message: "Server Error" + error });
  }
});

// POST /bid/create
// create new bid
const create_bid = asyncHandler(async (request, response) => {
  try {
    const { price } = request.body;

    // ensure no fields are empty
    if (price == "") {
      response
        .status(400)
        .json({ message: "State a bid price" });
    }

    // check if the auction exists
    const auction = await Auction.findOne({_id: request.params.id})
  

    // new auction instance
    const new_bid = {
      price,
      user: request.user,
      auction: auction._id
    };

    // save bid
    const bid = await Bid.create(new_bid);

    // check if creation succeeded
    if (!bid)
      response
        .status(400)
        .json({ message: "Something went wrong, try again soon.." });

    // send response
    response.status(201).json(bid);
  } catch (error) {
    response.status(500).json({ message: "Server Error " + error });
  }
});


export { grab_bid, create_bid };