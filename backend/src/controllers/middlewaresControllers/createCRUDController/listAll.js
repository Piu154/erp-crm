const listAll = async (Model, req, res) => {
  const sort = req.query.sort || 'desc';
  const enabledParam = req.query.enabled;

  const filter = { removed: false };
  if (enabledParam !== undefined) {
    filter.enabled = enabledParam === 'true'; // Convert string to Boolean
  }

  try {
    const result = await Model.find(filter)
      .sort({ created: sort })
      .populate()
      .exec();

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
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
