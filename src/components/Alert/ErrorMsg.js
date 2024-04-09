import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { resetErrorAction } from "../../redux/slices/globalSlice/globalSlice";

const ErrorMsg = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "error",
    title: "Oops",
    text: message,
    confirmButtonColor: "#84CC16",
  });
  dispatch(resetErrorAction());
};

export default ErrorMsg;
