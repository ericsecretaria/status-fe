import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Users/Login";
import PublicUserProfile from "./components/Users/PublicUserProfile";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import ProtectedRoute from "./components/AuthRoute/ProtectedRoute";
import AddPost from "./components/Posts/AddPost";
import PostDetails from "./components/Posts/PostDetails";
import PostLists from "./components/Posts/PostLists";
import UpdatePost from "./components/Posts/UpdatePost";
import PrivateUserProfile from "./components/Users/PrivateUserProfile";
import UploadProfileImage from "./components/Users/UploadProfileImage";
import UploadCoverImage from "./components/Users/UploadCoverImage";
import AccountVerification from "./components/Users/AccountVerification";
import Register from "./components/Users/Register";
import PasswordResetRequest from "./components/Users/PasswordResetRequest";
import { PasswordReset } from "./components/Users/PasswordReset";
import UpdateUser from "./components/Users/UpdateUser";

export default function App() {
  //! Get the login user from store
  const { userAuth } = useSelector((state) => state?.users);
  const isLogin = userAuth?.userInfo?.token;
  return (
    <BrowserRouter>
      {/* Navbar */}
      {isLogin ? <PrivateNavbar /> : <PublicNavbar />}

      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* profile */}
        <Route
          path="/user-public-profile/:userId"
          element={
            <ProtectedRoute>
              <PublicUserProfile />
            </ProtectedRoute>
          }
        ></Route>
        {/* Add Post */}
        <Route
          path="/add-post"
          element={
            <ProtectedRoute>
              <AddPost />
            </ProtectedRoute>
          }
        ></Route>
        {/* Post Details*/}
        <Route
          path="/posts/:postId"
          element={
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          }
        ></Route>
        {/* UPDATE USER PROFILE*/}
        <Route
          path="/update-profile"
          element={
            <ProtectedRoute>
              <UpdateUser />
            </ProtectedRoute>
          }
        ></Route>
        {/* Forgot Password Request*/}
        <Route
          path="/forgot-password"
          element={<PasswordResetRequest />}
        ></Route>
        {/* Reset Password */}
        <Route
          path="/reset-password/:token"
          element={<PasswordReset />}
        ></Route>
        {/* Private User Profile*/}
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <PrivateUserProfile />
            </ProtectedRoute>
          }
        ></Route>
        {/* Verify Account*/}
        <Route
          path="/verify-email/:token"
          element={
            <ProtectedRoute>
              <AccountVerification />
            </ProtectedRoute>
          }
        ></Route>
        {/* Private upload profile image*/}
        <Route
          path="/upload-profile-image"
          element={
            <ProtectedRoute>
              <UploadProfileImage />
            </ProtectedRoute>
          }
        ></Route>
        {/* Private upload cover image*/}
        <Route
          path="/upload-cover-image"
          element={
            <ProtectedRoute>
              <UploadCoverImage />
            </ProtectedRoute>
          }
        ></Route>
        {/* Private Post Details*/}
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <PostLists />
            </ProtectedRoute>
          }
        ></Route>
        {/* UPDATE Private Post*/}
        <Route
          path="/posts/:postId/update"
          element={
            <ProtectedRoute>
              <UpdatePost />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

//https://github.com/tweneboah/mern-blogify-frontend/blob/main/src/Templates/RegisterTemplate.js
