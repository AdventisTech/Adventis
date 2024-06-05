
const locationModel = require('../models/location');
module.exports = {
    locationDetailspost: async (req, res) => {
    try {
      const { latitude,longitude, name,EmployeeId,department,timestamp} = req.body;
      const result = new locationModel({
        latitude:latitude,
        longitude:longitude,
        name: name,
        EmployeeId:EmployeeId,
        department:department,
        timestamp:timestamp,
      });
      await result.save();
        return res.status(201).json({ message: 'Success', result });
    } catch (err) {
      res.status(400).json({
        err: err.message,
      });
    }
  },
  locationDetailsget: async (req, res) => {
    try{
      const result = await locationModel.find();
     res.status(200).json(result);
     return res
     }catch(err){
     res.status(400).json({
         err:err
      })
    }
  },
  locationDetailsupdate: async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
     const updatedWorkOrder = await locationModel.findByIdAndUpdate(id, updates, { new: true });
    if (updatedWorkOrder) {
      return res.status(200).json({ message: 'details updated successfully' });
    }
    return res.status(200).json(updatedWorkOrder);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
 },
 locationDetailsdelete: async (req, res) => {
    try{
        await locationModel.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"details deleted successfully"});
    }catch(err){
      res.status(400).json({
          err:err
      })
    }
 }
};