import { toast } from "react-hot-toast";
import { openUploadWidget } from "./CloudinaryService";

const CloudinaryUpload = ({setUrl, setName, text}) => {
  console.log(process.env.REACT_APP_UPLOAD_PRESET)
  const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget({
      cloudName:"damn2yl49",
      uploadPreset:UPLOAD_PRESET,
      sources: ["local"],
      },
      function (error, result){
        if(!error && result.event === "success"){
          setUrl(result.info.secure_url)
          setName(result.info.original_filename)
          console.log(result.info)
        }
        else{
          if(error){
            console.log(error)
          }
        }
      }
    )
    myUploadWidget.open()
  }
  return (
    <button className='bg-gray-500 rounded-2xl py-3 w-[50%] px-5' onClick={uploadImageWidget}>Select {text}</button>
  )
}

export default CloudinaryUpload