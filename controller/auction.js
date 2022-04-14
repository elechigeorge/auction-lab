import asyncHandler from "express-async-handler";
import Auction from "../model/auction.js";

// GET /auction
// get all auctions
const grab_auction = asyncHandler(async (request, response) => {
  try {
    const auctions = await Auction.find({}).populate("user").sort("desc");

    if (auctions) {
      response.status(200).json(auctions);
    }
  } catch (error) {
    response.status(500).json({ message: "Server Error" + error });
  }
});

// POST /auction/create
// create new auction
const create_auction = asyncHandler(async (request, response) => {
  try {
    const { image, title, description, expiry } = request.body;

    // ensure no fields are empty
    if (image == "" || title == "" || description == "" || expiry == "") {
      response
        .status(400)
        .json({ message: "You need to fill all fields appropriately.." });
    }

    // new auction instance
    const new_auction = {
      image,
      title,
      description,
      user: request.user,
      expiry
    };

    // save auction
    const auction = await Auction.create(new_auction);

    // check if creation succeeded
    if (!auction)
      response
        .status(400)
        .json({ message: "Something went wrong, try again soon.." });
    // send response
    response.status(201).json(auction);
  } catch (error) {
    response.status(500).json({ message: "Server Error " + error });
  }
});

// DELETE /auction/:id
// delete an auction
const delete_auction = asyncHandler(async (request, response) => {
  try {
    // check if that auction exists
    const auction = await Auction.findById(request.params.id);

    if (!auction)
      response.status(404).json({ message: "No record, for that auction.." });

    await Auction.deleteOne({ _id: request.params.id });

    response.status(200).json({ message: "Deleted .." });
  } catch (error) {
    response.status(500).json({ message: "Server Error " });
  }
});

// DELETE /auction/:id
// delete an auction
const single_auction = asyncHandler(async (request, response) => {
  try {
    // check if that auction exists
    const auction = await Auction.findById(request.params.id).populate("user");

    if (!auction)
      response.status(404).json({ message: "No record, for that auction.." });

    response.status(200).json(auction);
  } catch (error) {
    response.status(500).json({ message: "Server Error" + error });
  }
});

export { grab_auction, create_auction, delete_auction, single_auction };
