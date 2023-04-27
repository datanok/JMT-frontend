import { memo } from "react";
import { BsFillTrashFill } from "react-icons/bs";
function LogintTable({ logins, deleteLogin }) {
  return (
    <>
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {logins.map((login, index) => (
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
                        {login.name}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => deleteLogin(login._id)}>
                          <BsFillTrashFill color="red" className="" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(LogintTable);
