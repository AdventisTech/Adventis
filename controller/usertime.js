
const UserTimeModel = require('../models/usertime');
module.exports = {
//   UserTimeDetailspost: async (req, res) => {
//     try {

//       const {Name,userid,TodayDate,Todayfrom,Todayto} = req.body;
//       const result = new UserTimeModel({
//         Name:Name,
//         userid:userid,
//         TodayDate:TodayDate,
//         Todayfrom:Todayfrom,
//         Todayto:Todayto
//       });
//       await result.save();
//         return res.status(201).json({ message: 'ok its saved', result });
//     } catch (err) {
//       res.status(400).json({
//         err: err.message,
//       });
//     }
//   },

  UserTimeDetailspost: async (req, res) => {
  
  try {
    const { Name, userid, TodayDate, Todayfrom, Todayto,totaytotaltime } = req.body;

    const result = new UserTimeModel({
      Name,
      userid,
      TodayDate,
      Todayfrom,
      Todayto,
      totaytotaltime

    });

    await result.save();

    return res.status(201).json({ message: 'ok its saved', result });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate entry: this user already has a record for this date' });
    }

    res.status(400).json({ error: err.message });
  }
},


UserTimeDetailsget: async (req, res) => {
  try {
    // Calculate date 30 days ago
    const today = new Date();
    const lastMonthDate = new Date(today);
    lastMonthDate.setDate(today.getDate() - 15);

    // Query: only documents with TodayDate >= lastMonthDate
    // Assuming TodayDate is stored as "YYYY-MM-DD" string,
    // so convert it to Date for comparison using $gte operator in aggregation or match stage.

    const result = await UserTimeModel.find({
      TodayDate: { $gte: lastMonthDate.toISOString().slice(0, 10) } 
      // slice(0,10) to keep only "YYYY-MM-DD" string for matching
    });

    res.status(200).json(result);
    return res;
  } catch (err) {
    res.status(400).json({
      err: err.message || err
    });
  }
},

UserTimeDetailsByUserId: async (req, res) => {
  try {
    const { userid } = req.params;  // assuming userid comes in route param

    if (!userid) {
      return res.status(400).json({ error: "userid is required" });
    }

    const today = new Date();
    const lastMonthDate = new Date(today);
    lastMonthDate.setDate(today.getDate() - 30);

    // Find all records for this userid with TodayDate in last 30 days
    const result = await UserTimeModel.find({
      userid: userid,
      TodayDate: { $gte: lastMonthDate.toISOString().slice(0, 10) }
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err: err.message || err });
  }
},

// UserTimeDetailsByUserId1: async (req, res) => {
//   try {
//     const { userid } = req.params;
//     const { date } = req.query;

//     if (!userid || !date) {
//       return res.status(400).json({ error: "userid and date are required" });
//     }

//     const formattedDate = new Date(date).toISOString().slice(0, 10); // YYYY-MM-DD

//     const result = await UserTimeModel.findOne({
//       userid: userid,
//       TodayDate: formattedDate
//     });

//     res.status(200).json(result || {}); // return empty object if not found
//   } catch (err) {
//     res.status(400).json({ err: err.message || err });
//   }
// },
UserTimeDetailsByUserId1: async (req, res) => {
  try {
    const { userid } = req.params;
    const { date } = req.query;

    if (!userid || !date) {
      return res.status(400).json({ error: "userid and date are required" });
    }

    // Format the date to match what's stored in the DB
    const formattedDate = new Date(date).toISOString().slice(0, 10); // "YYYY-MM-DD"

    // 🔍 Fetch only the exact date match
    const result = await UserTimeModel.findOne({
      userid: userid,
      TodayDate: formattedDate,
    });

    res.status(200).json(result || {}); // Return empty object if not found
  } catch (err) {
    console.error('Error fetching time data:', err);
    res.status(500).json({ error: err.message || err });
  }
},




//   UserTimeDetailsget: async (req, res) => {
//     try{
//       const result = await UserTimeModel.find();
//      res.status(200).json(result);
//      return res
//      }catch(err){
//      res.status(400).json({
//          err:err
//       })
//     }
//   },
  UserTimeDetailsupdate: async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
     const updatedUserTime = await UserTimeModel.findByIdAndUpdate(id, updates, { new: true });
    if (updatedUserTime) {
      return res.status(200).json({ message: 'updated successfully' });
    }
    return res.status(200).json(updatedUserTime);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
 },
 UserTimeDetailsdelete: async (req, res) => {
    try{
        await UserTimeModel.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"deleted successfully"});
    }catch(err){
      res.status(400).json({
          err:err
      })
    }
 }
};