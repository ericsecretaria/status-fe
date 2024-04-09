import React, { useEffect, useState } from "react";
import TargetsList from "./TargetList";
import { useDispatch, useSelector } from "react-redux";
import { createTargetAction } from "../../redux/slices/targets/targetsSlice";
import { TbTargetArrow } from "react-icons/tb";
import { Ri24HoursLine } from "react-icons/ri";
import { TbProgressAlert } from "react-icons/tb";

const AddTarget = ({ postId, targets }) => {
  const [formData, setFormData] = useState({
    renter: "",
    rentAmount: "",
  });

  const { post } = useSelector((state) => state?.posts);
  const [currTotal, setCurrTotal] = useState(0);
  const [bhindTotal, setBhindTotal] = useState(0);

  //dispatch
  const dispatch = useDispatch();
  //! Handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //! get comment from store
  const { success } = useSelector((state) => state?.targets);
  //reload
  useEffect(() => {
    if (success) {
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, success]);
  //! Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTargetAction({ ...formData, postId }));
  };

  function currentRunningTotal() {
    let total = 0;
    // Iterate through posts and sum up totalRent values
    post?.post?.targets?.map((target) => {
      return (total += target.rentAmount);
    });

    // Update the state with the calculated total
    setCurrTotal(total);
  }

  function behindTotals() {
    let total = 0;
    let btotal = 0;
    let accessAmounts = 0;

    post?.post?.targets?.map((target) => {
      total += target.rentAmount;
      btotal = post?.post?.targetAmount - total;
      accessAmounts = [total, accessAmounts];
      return accessAmounts;
    });
    // Update the state with the calculated total
    setBhindTotal(btotal);
  }

  useEffect(() => {
    // Calculate the total sum of totalRent values when posts change
    currentRunningTotal();
    behindTotals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]); // Run when posts change

  return (
    <>
      <div class="max-w-screen-xl mx-auto px-1">
        <div class="-mx-4 flex flex-wrap">
          <div class="w-full flex flex-col p-4 sm:w-1/2 lg:w-1/3">
            <div class="flex-1 px-10 py-12 bg-gray-700 text-white rounded-lg shadow-lg">
              <div className="flex justify-start">
                <TbTargetArrow size={45} color={"lime"} />
                <h1 className="text-3xl font-bold ml-1">Target</h1>
              </div>
              <h1 className="text-5xl font-bold text-center mt-4">
                {post?.post?.targetAmount.toLocaleString()}
              </h1>
            </div>
          </div>

          <div class="w-full flex flex-col p-4 sm:w-1/2 lg:w-1/3">
            <div class="flex-1 px-10 py-12 bg-gray-700 text-white rounded-lg shadow-lg">
              <div className="flex justify-start">
                <Ri24HoursLine size={45} color={"cyan"} />
                <h1 className="text-3xl font-bold ml-1">Current</h1>
              </div>
              <h1 className="text-5xl font-bold text-center mt-4">
                {currTotal.toLocaleString()}
              </h1>
            </div>
          </div>

          <div class="w-full flex flex-col p-4 sm:w-1/2 lg:w-1/3">
            <div class="flex-1 px-10 py-12 bg-gray-700 text-white rounded-lg shadow-lg">
              <div className="flex justify-start">
                <TbProgressAlert size={45} color={"red"} />
                <h1 className="text-3xl font-bold ml-1">Behind</h1>
              </div>
              <h1 className="text-5xl font-bold text-center mt-4">
                {bhindTotal.toLocaleString()}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------- */}

      <div className="bg-white rounded shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-600">
            Start Tracking
          </h3>
          <form class="w-full " onSubmit={handleSubmit}>
            <div class="flex items-center border-b border-gray-500 py-2">
              <input
                class="placeholder-lime-500 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Customer's Name"
                value={formData.renter}
                onChange={handleChange}
                name="renter"
              />
              <input
                class="placeholder-lime-500 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="number"
                placeholder="Rent Amount"
                value={formData.rentAmount}
                onChange={handleChange}
                name="rentAmount"
              />
              <button
                class="flex-shrink-0 bg-gray-700 hover:bg-gray-500 border-gray-700 hover:border-gray-500 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
          {/* comment lists */}
          <TargetsList targets={targets} />
        </div>
      </div>
    </>
  );
};

export default AddTarget;
