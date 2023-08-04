import { toast } from "react-hot-toast";
import { openUploadWidget } from "./CloudinaryService";
import { UPLOAD_PRESET } from "../secrets";

const CloudinaryUpload = ({setUrl, setName, text}) => {
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
            toast.error("Not uploaded")
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