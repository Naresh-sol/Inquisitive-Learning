import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux"

import "video-react/dist/video-react.css"
import { Player } from "video-react"



export default function Upload({ name, label, register, setValue, errors, video = false, viewData = null, editData = null, }) {
  // const { course } = useSelector((state) => state.course)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(viewData ? viewData : editData ? editData : "")
  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  })

  const previewFile = (file) => {
    // console.log(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    register(name, { required: true })
  }, [register])


  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, setValue])

  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-sm text-richblack-900 font-medium" htmlFor={name}>
          {label} {!viewData && <sup className="text-red-500">*</sup>}
        </label>
      )}

      <div
        className={`${isDragActive ? "bg-gray-100" : "bg-gray-50/50"}
         flex min-h-[220px] cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#0056D2] transition-all`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}

            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-sm font-semibold text-red-500 hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-[#0056D2]/10 mb-2">
              <FiUploadCloud className="text-2xl text-[#0056D2]" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-gray-500 font-medium">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-bold text-[#0056D2]">Browse</span>
            </p>
            <ul className="mt-6 flex list-none justify-between space-x-6 text-center text-xs font-semibold text-gray-400">
              <li>16:9 Aspect Ratio</li>
              <li>1024x576 Recommended</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-1 text-xs font-semibold text-red-500">
          {label || "This field"} is required
        </span>
      )}
    </div>
  )
}