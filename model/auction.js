import mongoose from "mongoose";
import timestamp from "mongoose-timestamp";

const AuctionSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "User",
  },
  bid:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
    },
  expiry: {
    type: Date
  }
});

AuctionSchema.plugin(timestamp);

const Auction = mongoose.model("Auction", AuctionSchema);

export default Auction;
