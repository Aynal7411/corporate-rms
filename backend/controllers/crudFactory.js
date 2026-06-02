export const list = (Model, defaultFilter = {}) => async (req, res) => {
  const filter = { ...defaultFilter, ...req.query };
  const items = await Model.find(filter).sort({ createdAt: -1 }).limit(100);
  res.json(items);
};

export const getOne = (Model) => async (req, res) => {
  const item = await Model.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Resource not found');
  }
  res.json(item);
};

export const createOne = (Model) => async (req, res) => {
  const item = await Model.create(req.body);
  res.status(201).json(item);
};

export const updateOne = (Model) => async (req, res) => {
  const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!item) {
    res.status(404);
    throw new Error('Resource not found');
  }
  res.json(item);
};

export const deleteOne = (Model) => async (req, res) => {
  const item = await Model.findByIdAndDelete(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Resource not found');
  }
  res.json({ message: 'Deleted successfully' });
};
