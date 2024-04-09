import { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyAccountAction } from "../../redux/slices/users/usersSlices";
import { logoutAction } from "../../redux/slices/users/usersSlices";

export default function AccountVerification() {
  //! Get the token from the urk
  const { token } = useParams();
  const dispatch = useDispatch();

  const { loading, error, isVerified } = useSelector((state) => state?.users);
  useEffect(() => {
    if (token) {
      dispatch(verifyAccountAction(token));
    } else {
      console.log("Token not Found");
    }
  }, [dispatch, token]);

  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logoutAction());
    navigate("/", { replace: true });
    //reload
    window.location.reload();
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {loading ? (
          <h1>Verifying please wait...</h1>
        ) : (
          <>
            <FiCheckCircle className="text-green-500 text-9xl" />
            <h1 className="mt-4 text-3xl font-bold text-gray-700">
              Account Verified!
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Thank you for verifying your email address. You may now proceed to
              login.
            </p>
            <button
              onClick={logoutHandler}
              className="mt-8 px-8 py-3 text-white bg-lime-500 rounded-full hover:bg-lime-400 focus:outline-none"
            >
              Log in
            </button>
          </>
        )}
      </div>
    </>
  );
}
