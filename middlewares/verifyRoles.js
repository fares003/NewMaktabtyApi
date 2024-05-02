const verifyRoles=(...allowedRoles)=>{
    return (req,res,next)=>{
        if(!req?.roles)return res.sendStatus(401)
        const rollesArray=[...allowedRoles]
        console.log(rollesArray)
        console.log(req.roles)
        const result=req.roles.map(role=>rollesArray.includes(role)).find(val=>val===true)
        if(!result)return res.sendStatus(401)
        next()
        
    }
}
module.exports=verifyRoles;