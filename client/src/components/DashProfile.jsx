import { TextInput, Button, Alert, Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {updateStart , updateFailure ,updateSuccess , deleteUserFailure, deleteUserStart, deleteUserSuccess} from '../redux/user/userSlice.js'
import { UseDispatch } from "react-redux";
import {HiOutlineExclaimationCircle } from 'react-icons/hi';

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageUploadingProgress] = useState(null);
  const [imageFileUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const filePickRef = useRef();
  const dispatch = UseDispatch()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    console.log("uploading inmage");
  };
  setImageFileUploading(true);
  setImageUploadError(null);
  const storage = getStorage(app);
  const fileName = new Date().getTime() + imageFile.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, imageFile);
  const [imageFileUploading , setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError , setUpdateUserError] = useState(null)
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      imageFileUploadingProgress(progress.toFixed(0));
    },
    (error) => {
      setImageUploadError(
        "Could not Upload image (File must be less than 2 mb)"
      );
      setImageUploadingProgress(null);
      setImageFile(null);
      setImageFileUrl(null);
      setImageFileUploading(false)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        setImageFileUrl(downloadUrl);
        setFormData({...formData, profilePicture: downloadUrl})
        setImageFileUploading(false)
      });
    }
  );

  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) =>{
e.preventDefault();
setUpdateUserError(null);
setUpdateUserSuccess(null);
if(Object.keys(formData).length === 0){
  setUpdateUserError('No changes made')
  return;
}
if(imageFileUploading){
  setUpdateUserError("Please wait for the image to be uploaded")
  return
}
try{
dispatch(updateStart())
const res = await fetch(`/api/user/update/${currentUser._id}`,{
  method: 'PUT',
  headers:{
    'Content-Type': 'application/json',

  },
  body: JSON.stringify(formData)
});
const data = await res.json();
if(!res.ok){
  dispatch(updateFailure(data.mesage));
  setUpdateUserError(data.message)
}else{
  dispatch(updateSuccess(data))
   setUpdateUserSuccess("User's profile Updated successfully");
}
}catch(error){
dispatch(updateFailure(error.message))
setUpdateUserError(error.message)
}
  }
const handleDelelteUser = async ()=>{
setShowModal(false);
try{
dispatch(deleteUserStart());
const res = await fetch('/api/user/delete/${currentUser._id}', {
  method: 'DELETE',
});
const data = await res.json();
if(!res.ok){
  dispatch(deleteUserFailure(data.message));
}else{
  dispatch(deleteUserSuccess(data))
}
}catch(error){
  dispatch(deleteUserFailure(error.mesage))
}
}
  return (
    <div className="max-w-lg mx:auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickRef}
        />
        <div
          className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickRef.current.click()}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadingProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={
              "rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-50'} "
            }
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}  onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email} onChange={handleChange}
        />
        <TextInput type="password" id="password" placeholder="password"  onChange={handleChange}/>

        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={()=>setShowModal(true)} className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>

      {updateUserSuccess && (
        <Alert color='success' className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError &&(
        <Alert color='failure' className="mt-5">
          {updateUserError}
        </Alert>
      )}
      <Modal show={showModal} onClose={()=> setShowModal(false)} popup size='md'>

        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclaimationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
          <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you Sure you want to delete this account</h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDelelteUser}>Yes, I am Sure</Button>
            <Button color='gray' onClick={()=> setShowModal(false)}>No cancel</Button>
          </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>

  );
};

export default DashProfile;
