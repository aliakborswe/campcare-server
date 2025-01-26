
// verify is admin middleware
const checkPermission = (...roles)=>{
    return async (req, res, next)=>{
        const role = req.user.role;
        if(roles.includes(role)){
            next();
        }else{
            res.status(403).json({
                message: "You are not permitted to access this route"
            })
        }
    }
}

module.exports = checkPermission;