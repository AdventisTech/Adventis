
const ratingModel = require('../models/rating');
module.exports = {


    // EmployeeId:{ type: String, unique: true, required: [true, 'EmployeeIdshould be mandatory'] },
    // Name: { type: String, unique: false, required: [true, 'Name should be mandatory'] },
    // selectedDate: { type: String, unique: false, required: [true, 'Data should be mandatory'] },
    // Finalrating: 
  ratingDetails: async (req, res) => {

    try {
      const { EmployeeId,Name, selectedDate,Finalrating} = req.body;
      const result = new ratingModel({
        EmployeeId:EmployeeId,
        Name: Name,
        selectedDate: selectedDate,
        Finalrating:Finalrating,
 
      });

      await result.save();
      return res.status(201).json({ message: 'Successfully submitted', result });
    } catch (err) {
      res.status(400).json({
        err: err.message
      });
    }
  },
  ratingDetailsget: async (req, res) => {
    try{
     const result = await ratingModel.find();
     res.status(200).json(result);
     return res
     }catch(err){
     res.status(400).json({
         err:err
      })
    }
  },
//  projectDetailsupdate: async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;
//   try {
//     const updatedWorkOrder = await assetModel.findByIdAndUpdate(id, updates, { new: true });
//     if (updatedWorkOrder) {
//       return res.status(200).json({ message: 'Workorder details updated successfully' });
//     }
//     return res.status(200).json(updatedWorkOrder);
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// },
// projectDetailsdelete: async (req, res) => {
//     try{
//       await assetModel.findByIdAndDelete(req.params.id);
//       res.status(200).json({message:"Workorder details deleted successfully"});
//     }catch(err){
//       res.status(400).json({
//           err:err
//       })
//     }
//   }
};