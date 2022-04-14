import mongoose from "mongoose";
import timestamp from "mongoose-timestamp";

const BidSchema = new mongoose.Schema({
  price: String,
  user: {
    
  },
  auction: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
    },
  
});

BidSchema.plugin(timestamp);

const Bid = mongoose.model("Bid", BidSchema);

export default Bid;
