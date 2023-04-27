export default function Popup({ shuffledUsers, handleClose }) {
  return (
    <>
      <div
        id="defaultModal"
        tabindex="-1"
        aria-hidden="true"
        class="fixed bg-black bg-opacity-60 flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative w-full max-w-2xl max-h-full">
          <div class="relative bg-white rounded-lg shadow ">
            <div class="flex items-start justify-between p-4 border-b rounded-t">
              <h3 class="text-xl font-semibold text-gray-900 ">
                Shuffled Users
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                data-modal-hide="defaultModal"
                onClick={handleClose}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="p-6 space-y-6">
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto shadow-lg rounded-lg border">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full ">
                        <thead className="border-b">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                              Name
                            </th>

                            <th
                              scope="col"
                              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                            >
                              Login
                            </th>
                          </tr>
                        </thead>
                        <tbody className="">
                          {shuffledUsers.map((user, index) => (
                            // <tr
                            //   key={index}
                            //   className={`${
                            //     index % 2 === 0 ? "bg-white" : "bg-gray-100"
                            //   } hover:bg-gray-100 border rounded-lg`}
                            // >
                            <tr
                              key={index}
                              className="hover:bg-gray-100 border-b rounded-lg"
                            >
                              <td className="px-6  py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                {user.name}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {user.login}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
