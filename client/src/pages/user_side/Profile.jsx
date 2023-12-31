import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase/firebase";
import SuccessToast from "../../components/SuccessToast";
import axios from "../../axios/axios_instance";
import { loginSuccess, logout } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import FailerToast from "../../components/FailerToast";

const Profile = () => {
  const {user, token} = useSelector((state) => state.user);
  const fileRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState();
  const [imageurl, setImageurl] = useState();
  const [loading, setLoading] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (image) {
      handleUpload(image);
    }
  }, [image]);

  useEffect(() => {
    updateImage()
  },[imageurl])

  const updateImage = () => {
    if(!imageurl) return
    axios
      .post(`/updateimage/${user._id}`, {
        imageurl,
        token,
      })
      .then((response) => {
        if (response.data.success) {
          dispatch(loginSuccess(response.data));
          setSuccess("Image uploaded Success");
          setTimeout(() => {
            setSuccess(null);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Image uploading failed");
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  };

  const handleUpload = async (image) => {
    if (!image.type.startsWith("image/")) {
      setError("Invalid file type");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoading(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageurl(downloadURL)
        })
      }
    );
  };

  const handleLogOut = async () => {
    await axios.request("/logout");
    dispatch(logout());
    navigate("/login");
  };

  const handleDeleteAccount = async (userId) => {
    axios
      .post(`/deleteuser/${userId}`,{
        token
      })
      .then((res) => {
        dispatch(logout());
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData?.username?.trim().length < 6 &&
      formData?.password !== user.username
    ) {
      setError("username must be at least 6 characters");
      return setTimeout(() => {
        setError(null);
      }, 3000);
    }
    // const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    // if (!emailRegex.test(formData?.email) && formData?.email !== user.email) {
    //   setError("Invalid email");
    //   return setTimeout(() => {
    //     setError(null);
    //   }, 3000);
    // }

    axios
      .post(`/update/${user._id}`, {
        username: formData?.username,
        email: formData.email,
        password: formData?.password,
        token
      })
      .then(function (response) {
        if (response.data.success) {
          dispatch(loginSuccess(response.data));
          setSuccess("Account updated successfully");
          setTimeout(() => {
            setSuccess(null);
          }, 3000);
        } else {
          setError('Failed to update account');
          setTimeout(() => {
            setError(null);
          }, 3000);
        }
      })
      .catch(function (error) {
        setError(error.message);
          setTimeout(() => {
            setError(null);
          }, 3000);
      });
  };

  return (
    <div>
      {success && <SuccessToast message={success} />}
      {error && <FailerToast message={error} />}
      <Navbar />

      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-white text-center mt-5 my-7">
          Profile
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={
              user.profilePicture ||
              imageurl ||
              `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEJ6aCBAcZ4ldYdG3do9HOShAndpdghkiL74xysu9a-JezzYY-LK3nkp62Z8RPcHsZQAY&usqp=CAU`
            }
            alt="profile"
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
            onClick={() => fileRef.current.click()}
          />
          {/* <p className="text-sm self-center">
            {imageError ? (
              <span className="text-red-700">
                Error uploading image (file size must be less than 2 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className="text-green-700">
                Image uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p> */}
          <input
            defaultValue={user.username}
            type="text"
            id="username"
            placeholder="Username"
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
          />
          <input
            defaultValue={user.email}
            type="email"
            id="email"
            placeholder="Email"
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
          />
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {"Update"}
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span
            onClick={() => handleDeleteAccount(user._id)}
            className="text-red-700 cursor-pointer"
          >
            Delete Account
          </span>
          <span onClick={handleLogOut} className="text-red-700 cursor-pointer">
            Logout
          </span>
        </div>
        {/* <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess && "User is updated successfully!"}
        </p> */}
      </div>
    </div>
  );
};

export default Profile;
