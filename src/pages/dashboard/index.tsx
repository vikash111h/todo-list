import { useEffect, useState } from "react"
import Authentication from "@/components/Authentication";
import { DetailsModal } from "@/components/DetailsModal";
import { Navbar } from "@/components/NavBar";

import jsonData from "../../data.json"

interface TaskProps {
  id: number;
	title: string;
	description: string;
	dueDate?: Date | string;
	createdAt: Date | string;
	updatedAt: Date | string;
}

interface ItemType {
  title: string;
  description: string;
  id: number;
}

function Dashboard() {

  const [list, setList] = useState<TaskProps[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [isAdd, setIsAdd] = useState<boolean>(false)

  useEffect(() => {
    setList(jsonData.data)
  }, []);

  const handleDelete = (id: number) => {
    const updatedList = list.filter((list: TaskProps) => list.id !== id)
    setList(updatedList)
  }


  return (
  <>
    <Navbar />
    <div className="max-w-screen-lg mx-auto mt-24">
      <div className="border border-gray-300 shadow-lg w-[90%] mx-auto mb-2">
        <div className="h-[calc(100vh-180px)] overflow-y-auto p-4">
          {list.sort((a: ItemType, b: ItemType) => a.title.localeCompare(b.title)).map(({ description, title, id }: { description: string, title: string, id: number }) => {
            return (
              <div className="flex justify-between gap-4 mb-5 bg-white border border-[#194D44] rounded-none shadow-lg dark:bg-gray-800 dark:border-gray-700" key={title}>
                <div className="p-3">
                  <h5 className="text-base font-semibold leading-none capitalize text-gray-800 dark:text-white">
                    {title}
                  </h5>
                  <p className="text-gray-800 mt-2">{description}</p>
                </div>
                <div className="flex md:order-2 gap-0">
                  <button
                    type="button"
                    data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                    className="text-[#194D44] hover:text-white bg-gray-200 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-none border-l border-gray-500 text-base px-4 py-2 text-center md:mr-0 dark:bg-green-600 dark:hover:bg-[#194D44] dark:focus:ring-green-800"
                    onClick={() => {
                      setIsOpen(true)
                      setSelectedId(id)
                    }}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="text-[#194D44] hover:text-white bg-gray-200 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-none border-x border-gray-500 text-base px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-[#194D44] dark:focus:ring-green-800"
                    onClick={() => {
                      setIsEdit(true)
                      setIsOpen(true)
                      setSelectedId(id)
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(id)}
                    className="text-[#194D44] hover:text-white bg-gray-200 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-none border-none text-base px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-[#194D44] dark:focus:ring-green-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex justify-center pt-3">
        <button
          type="button"
          onClick={() => {
            setIsAdd(true)
            setIsEdit(true)
            setIsOpen(true)
          }}
          className="text-white bg-[#194D44] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded text-base px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-[#194D44] dark:focus:ring-green-800 w-2/5"
        >
          Add Task
        </button>
      </div>
    </div>
    <DetailsModal
      open={isOpen}
      setIsOpen={setIsOpen}
      setIsEdit={setIsEdit}
      isEdit={isEdit}
      id={selectedId}
      setList={setList}
      list={list}
      isAdd= {isAdd}
      setIsAdd={setIsAdd}
    />
  </>
  )
}

export default Authentication(Dashboard);