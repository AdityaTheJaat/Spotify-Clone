import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core'

export const url = (publicId, options) => {
  try{
    const scOptions = Util.withSnakeCaseKeys(options)
    const cl = CoreCloudinary.new()
    return cl.url(publicId, scOptions)
  } catch(err){
    console.error(err)
    return null
  }
}

export const openUploadWidget = (options, callback) => {
  return window.cloudinary.openUploadWidget(options, callback);
}