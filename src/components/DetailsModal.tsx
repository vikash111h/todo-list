import { BaseSyntheticEvent, useEffect, useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DetailsModalProps {
	open: boolean;
	setIsOpen: (isOpen: boolean) => void;
	setIsEdit: (isEdit: boolean) => void;
	isEdit: boolean;
	id: number;
	setList: (list: TaskProps[]) => void;
	list: TaskProps[];
	isAdd: boolean;
	setIsAdd: (isAdd: boolean) => void;
  }
  
  export interface TaskProps {
	id: number;
	title: string;
	description: string;
	dueDate?: Date | string;
	createdAt: Date | string;
	updatedAt: Date | string;
  }

export const DetailsModal: React.FC<DetailsModalProps> = (props) => {

	const [task, setTask] = useState<TaskProps>({
    id: 0,
    description: "",
    title: "",
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
	const [selectedDate, setSelectedDate] = useState<Date>(new Date())

	const { open, setIsOpen, isEdit, setIsEdit, id, setList, list, isAdd, setIsAdd } = props;

	useEffect(() => {
		if (isAdd) {
			setTask({
				id: 0,
				description: "",
				title: "",
				dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
			})
			setSelectedDate(new Date())
		} else {
			const task = list.filter((data: any) => data.id === id);
			setTask(task[0])
			setSelectedDate(new Date(`${task[0]?.dueDate}`))
		}

	}, [id, isEdit, isAdd]);


	const handleChange = (e: BaseSyntheticEvent) => {
		setTask({
			...task,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e: BaseSyntheticEvent) => {
		e.preventDefault();
		if (isAdd) {
			const  newtask:TaskProps = { ...task, dueDate: selectedDate }
			setList([...list, newtask])
			setIsAdd(false)
			setIsEdit(false)
			setIsOpen(false)
			return
		}
		const index = list.findIndex((data: TaskProps) => data.id === id)
		const tasks = list;
		tasks[index] = { ...task, dueDate: selectedDate };
		setList(tasks);
		setIsOpen(false);
		setIsEdit(false);
	}

	if (!task) return <></>

	return (
		<>
			<div id="authentication-modal" aria-hidden="true" hidden={!open} className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#00000070]">
				<div className="relative w-full max-w-md max-h-full absolute -translate-x-2/4 -translate-y-2/4 inset-x-1/2 inset-y-1/2">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<button
							onClick={() => {
								setIsOpen(false)
								setIsEdit(false)
								setIsAdd(false)
							}}
							className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
							<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
						<div className="px-6 py-6 lg:px-8">
							<h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">{!isEdit ? "View Details" : (isAdd ? "Add Details" : "Update Details")}</h3>
							<form className="space-y-6">
								<div>
									<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
									<input
										type="text"
										name="title"
										readOnly={!isEdit}
										id="title"
										value={task.title}
										onChange={handleChange}
										placeholder="Title"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
									/>
								</div>
								<div>
									<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
									<input
										type="text"
										name="description"
										readOnly={!isEdit}
										id="password"
										placeholder="Description"
										onChange={handleChange}
										value={task.description}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
									/>
								</div>
								<div>
									<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
									<DatePicker readOnly={!isEdit} maxDate={new Date()} selected={selectedDate} onChange={(date) => { isEdit && setSelectedDate(date) }} />
								</div>
								{isEdit && <button type="submit" onClick={handleSubmit} className="w-full text-white bg-[#194D44] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{isAdd ? "Add Task" : "Update Task"}</button>}                     </form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}