import { deleteTargetAction } from "../../redux/slices/targets/targetsSlice";
import { useDispatch } from "react-redux";

const TargetsList = ({ targets }) => {
  const dispatch = useDispatch();
  //! Delete Post Handler
  const deleteTargetHandler = (targetId) => {
    dispatch(deleteTargetAction(targetId));
    // Handle deletion logic here using targetId
    console.log("Delete target with ID:", targetId);
  };

  return (
    <div className="flex flex-col space-y-4 mt-5">
      <div className="flex space-x-4">
        <div className="flex-grow">
          <div>
            <div class="flex mb-0 text-center bg-gray-50 dark:bg-gray-700 dark:text-lime-400 font-semibold text-xs uppercase h-10 pt-3 italic">
              <div class="w-1/3 bg-white-500">Customers</div>
              <div class="w-1/3 bg-white-500">Amount</div>
              <div class="w-1/3 bg-white-500">Action</div>
            </div>

            {targets?.length <= 0 ? (
              <h1 className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20 text-red-500">
                <i>No Preview Available</i>
              </h1>
            ) : (
              targets?.map((target) => {
                return (
                  <>
                    <div key={target._id} class="flex mb-0 text-center">
                      <div class="w-1/3 bg-white-500 h-7 pt-1 border-b border-grey-dark text-xs uppercase">
                        {target?.renter}
                      </div>
                      <div class="w-1/3 bg-white-500 h-7 pt-1 border-b border-grey-dark text-xs uppercase">
                        {target?.rentAmount}
                      </div>
                      <div class="w-1/3 bg-white-500 h-7 pt-1 border-b border-grey-dark text-xs uppercase">
                        {/* delete */}
                        <button
                          onClick={() => deleteTargetHandler(target._id)}
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-3 h-3"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* ============================================================================================================ */}
                    {/* <div className="bg-blue-50 px-4 py-3 sm:px-6 flex justify-between items-center mt-2">
                      <div>
                        <h4 className="text-sm font-medium text-blue-600">
                          {target?.renter}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {target?.rentAmount}
                        </p>
                      </div>
                    </div> */}
                  </>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetsList;
