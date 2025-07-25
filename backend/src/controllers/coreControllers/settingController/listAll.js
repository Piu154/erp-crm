const mongoose = require('mongoose');
const Model = mongoose.model('Setting');

const listAll = async (req, res) => {
  const sort = parseInt(req.query.sort) || 'desc';

  //  Query the database for a list of all results
  const result = await Model.find({
    removed: false,
    isPrivate: false,
  }).sort({ created: sort });

  if (result.length > 0) {
    return res.status(200).json({
      success: true,
      result,
      message: 'Successfully found all documents',
    });
  } else {
    return res.status(203).json({
      success: false,
      result: [],
      message: 'Collection is Empty',
    });
  }
};

module.exports = listAll;
// const listAll = async (req, res) => {
//   const sort = req.query.sort || 'desc';

//   //⛔ Not querying DB — instead returning hardcoded dummy values
//   const result = [
//     {
//       _id: '64f1c3b12f1e4a3f7e38f93e',
//       default_currency_code: 'INR',
//       language: 'en',
//       removed: false,
//       isPrivate: false,
//       created: new Date(),
//     },
//     {
//       _id: '64f1c3b12f1e4a3f7e38f93f',
//       default_currency_code: 'USD',
//       language: 'es',
//       removed: false,
//       isPrivate: false,
//       created: new Date(),
//     }
//   ];

//   return res.status(200).json({
//     success: true,
//     result,
//     message: 'Returned dummy data',
//   });
// };

// module.exports = listAll;
