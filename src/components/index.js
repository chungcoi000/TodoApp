import {Button, Table, Tag, Modal, Tooltip, notification} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons"
import 'antd/dist/antd.css';
import {useEffect, useState} from "react";
import {setTask} from '../redux/actions/ToDo';
import ModalTask from "./Modal";
import {useDispatch, useSelector} from "react-redux";

const {confirm} = Modal

const TodoList = () => {
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);
	const [mode, setMode] = useState('ADD');
	const [data, setData] = useState('');

	useEffect(() => {
		const storage = JSON.parse(localStorage.getItem('data')) || [];
		dispatch(setTask(storage));
	}, []);

	const taskList = useSelector(state => state.task);

	const columns = [{
		title: 'Task name',
		key: 'name',
		align: 'center',
		dataIndex: 'name'
	}, {
		title: 'Status',
		key: 'status',
		align: 'center',
		dataIndex: 'status',
		render: (_, record) => {
			if (record.status === 'todo') return <Tag>TODO</Tag>;
			if (record.status === 'in progress') return <Tag color='yellow'>IN PROGRESS</Tag>
			if (record.status === 'complete') return <Tag color='green'>COMPLETE</Tag>
		}
	}, {
		title: 'Edit',
		key: 'edit',
		align: 'center',
		render: (_, record) => {
			return (
				<div>
					<Tooltip title='Edit Task' className='mr-3'>
						<Button
							type='secondary'
							icon={<EditOutlined/>}
							size='small'
							onClick={() => {
								setVisible(true);
								setMode('UPDATE');
								setData(record)
							}}
						/>
					</Tooltip>
				</div>
			)
		}
	}, {
		title: 'Remove',
		key: 'remove',
		align: 'center',
		render: (_, record) => {
			return (
				<Tooltip title='Remove Task' className='mr-3'>
					<Button
						type='danger'
						icon={<DeleteOutlined/>}
						size='small'
						onClick={() => {
							showDeleteConfirm(record.id);
						}}
					/>
				</Tooltip>
			)
		}
	}]

	const showDeleteConfirm = (id) => {
		confirm({
			title: 'Do you Want to delete these items?',
			icon: <ExclamationCircleOutlined/>,
			content: 'Some descriptions',
			onOk() {
				let newList = taskList.filter(taskList => taskList.id !== id);
				dispatch(setTask(newList));
				localStorage.setItem("data", JSON.stringify(newList));
				notification.success({
					message: 'Remove Success'
				})
			},
			onCancel() {
				setVisible(false)
			},
		});
	}

	return (
		<div>
			<div style={{
				marginBottom: '20px',
				float: 'right'
			}}>
				<Button
					type='primary'
					onClick={() => {
						setVisible(true);
						setMode('ADD');
					}}
				>
					Add Task
				</Button>
			</div>
			<div>
				<Table
					columns={columns}
					dataSource={taskList}
					pagination={false}
				/>
				<ModalTask
					mode={mode}
					visible={visible}
					data={data}
					setVisible={setVisible}
				/>
			</div>
		</div>
	)
}

export default TodoList