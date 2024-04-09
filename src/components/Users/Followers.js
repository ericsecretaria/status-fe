export default function Followers({ followers }) {
  return (
    <div className="container relative z-10 px-4 mx-auto">
      <div className="mx-auto mb-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Your followers
          </h2>
        </div>
        <ul
          role="list"
          className="grid max-w-2xl grid-cols-2 mx-auto mt-20 text-center gap-y-16 gap-x-8 sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
        >
          {followers?.map((user) => (
            <li key={user?._id}>
              <img
                className="w-24 h-24 mx-auto rounded-full"
                src={user?.profilePicture}
                alt="user profile"
              />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {user?.username}
              </h3>
              <p className="text-sm leading-6 text-gray-600">{user?.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
