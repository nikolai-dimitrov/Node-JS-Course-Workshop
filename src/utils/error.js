const mongoose = require("mongoose");

exports.extractErrorMessages = function (error) {
  console.error(error);
  if (error instanceof mongoose.MongooseError) {
    return Object.values(error.errors).map((e) => e.message);
  } else if (error instanceof Error) {
    return [error.message];
  }
};
