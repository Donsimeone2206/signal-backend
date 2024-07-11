import { signalModel } from "../../schemas/signal.js";

export const getAllSignalRouteHandler = (req, res) => {
  signalModel.find({}, (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching signals" });
    }
    return res.status(200).json(data);
  });
};

export const getSignalRouteHandler = (req, res) => {
  const { signalId } = req.params;
  signalModel
    .findById(signalId)
    .then((signal) => {
      if (!signal) {
        return res.status(404).json({ message: "Signal not found" });
      }
      return res.status(200).json(signal);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: err.message });
    });
};
