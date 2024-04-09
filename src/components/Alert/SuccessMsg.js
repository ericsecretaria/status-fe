import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { resetSuccessAction } from "../../redux/slices/globalSlice/globalSlice";

const SuccessMsg = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    confirmButtonColor: "#84CC16",
    confirmButtonText: "close",
    timer: 1500,
  });
  dispatch(resetSuccessAction());
};

export default SuccessMsg;
