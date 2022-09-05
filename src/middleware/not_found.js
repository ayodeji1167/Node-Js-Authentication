const notFound = (req,res)=>{
 return res.status(404).json({mssg:"Route Doesn't Exist"});
}

module.exports = notFound;