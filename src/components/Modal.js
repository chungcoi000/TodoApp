import {Button, Form, Input, Modal, notification, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setTask} from "../redux/actions/ToDo";

const ModalTask = (props) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const {mode, data, visible, setVisible} = props;

	const taskList = useSelector(state => state.task);

	if (mode && mode !== 'ADD') {
		form.setFieldsValue({
			name: data.name,
			status: data.status
		});
	} else {
		form.resetFields();
	}

	const onFinish = (values) => {
		let submitData = {
			id: values?.id ?? Math.random(),
			name: values?.name,
			status: values?.status ?? 'todo'
		}
		if (mode && mode === 'ADD') {
			let newTaskList = [...taskList, submitData];
			dispatch(setTask(newTaskList));
			localStorage.setItem("data", JSON.stringify(newTaskList));
			setVisible(false);
			notification.success({
				message: 'Add task success'
			})
		}
		else {
			let newList = taskList.map(task => {
				if (task.id === data.id) {
					return submitData
				} else {
					return task
				}
			})
			dispatch(setTask(newList));
			localStorage.setItem("data", JSON.stringify(newList));
			setVisible(false);
			notification.success({
				message: 'Update task success'
			})
		}
	}

	return (
		<div>
			<Modal
				visible={visible}
				footer={false}
				title={mode === 'ADD' ? 'Add Task' : 'Edit Task'}
				onCancel={() => {
					setVisible(false)
				}}
			>
				<Form
					form={form}
					layout='vertical'
					onFinish={onFinish}
				>
					<Form.Item label='Task Name' name='name'>
						<Input placeholder='Please input task...'/>
					</Form.Item>
					{
						mode !== 'ADD' ?
							<Form.Item label='Status' name='status'>
								<Select>
									<Select.Option value='todo'>Todo</Select.Option>
									<Select.Option value='in progress'>In Progress</Select.Option>
									<Select.Option value='complete'>Complete</Select.Option>
								</Select>
							</Form.Item>
							: null
					}
					<Form.Item>
						<Button type="primary" htmlType="submit">Submit</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}

export default ModalTask