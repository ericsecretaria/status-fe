import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrivatePostsAction } from "../../redux/slices/posts/postsSlice";
import LoadingComponent from "../Alert/LoadingComponent";
import { Link } from "react-router-dom";

const PostLists = () => {
  //! redux store
  const dispatch = useDispatch();
  const { posts, error, loading } = useSelector((state) => state?.posts);
  //dispatch
  useEffect(() => {
    dispatch(fetchPrivatePostsAction());
  }, [dispatch]);
  return (
    <>
      <div>
        <section className="relative py-24 bg-white">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage:
                'url("flex-ui-assets/elements/pattern-white.svg")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left top",
            }}
          />
          <div className="container relative z-10 px-4 mx-auto">
            <div className="md:max-w-5xl mx-auto mb-8 md:mb-16 text-center">
              {/* <h3 className="mb-4 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
                Get tracked on your Business
              </h3> */}
              <h3 className="mb-4 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
                Growing Businessnes
              </h3>
              <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-lime-600 bg-white-100 font-medium uppercase rounded-full shadow-sm">
                Never miss to get updated with your businesses.
              </span>
            </div>

            <div className="flex flex-wrap -mx-4 mb-12 md:mb-20">
              {/* loop */}
              {loading ? (
                <LoadingComponent />
              ) : error ? (
                <h3 className="text-red-500 text-center">{error?.message}</h3>
              ) : posts?.posts?.length <= 0 ? (
                <h1 className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20 text-red-500">
                  <i>No Available Goal to Monitor</i>
                </h1>
              ) : (
                posts?.posts?.map((post) => {
                  return (
                    <div className="w-full md:w-1/2 px-4 mb-8">
                      <div className="block mb-6 overflow-hidden rounded-md">
                        <img
                          className="w-full"
                          alt="post cover"
                          src={post?.image}
                        />
                      </div>
                      <p className="mb-0 text-coolGray-500 font-medium">
                        {new Date(post?.createdAt).toDateString()}
                      </p>
                      <div className="inline-block mb-0 text-2xl md:text-3xl leading-tight text-coolGray-800 hover:text-coolGray-900 font-bold ">
                        {post?.title}
                      </div>
                      <p className="mb-0 text-coolGray-500">{post.content}</p>
                      <Link
                        className="inline-flex items-center text-base md:text-lg text-green-500 hover:text-green-600 font-semibold"
                        to={`/posts/${post?._id}`}
                      >
                        <span className="underline">View Status</span>
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PostLists;
