const cloudnairy=require('cloudinary').v2

cloudnairy.config({
    cloud_name:process.env.CLOUDNAIRY_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET_KEY
})
module.exports=cloudnairy