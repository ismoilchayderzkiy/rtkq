import React, { useState } from 'react'
import {
  useAddImageMutation,
	useAddTodoMutation,
	useDeleteImageMutation,
	useDeleteTodoMutation,
	useEditStatusMutation,
	useEditTodoMutation,
	useGetPokemonByNameQuery,
} from './api/todoApi'
import { Button, Carousel, Input, Modal } from 'antd'
import DrawerInfo from './drawer'

const App = () => {
	let { data } = useGetPokemonByNameQuery()
	let [addTodo] = useAddTodoMutation()
	let [inpName, setInpName] = useState('')
	let [inpDesc, setInpDesc] = useState('')
	let [idx, setIdx] = useState(null)
	let [idX, setIdX] = useState(null)
	let [deleteTodo] = useDeleteTodoMutation()
	let [deleteImage] = useDeleteImageMutation()
	let [editStatus] = useEditStatusMutation()
	let [editTodo] = useEditTodoMutation()
	let [addImage] = useAddImageMutation()
	const [isModalOpen, setIsModalOpen] = useState(false)

	const showModal = () => {
		setIsModalOpen(true)
	}
	const [isModalOpen2, setIsModalOpen2] = useState(false)

	const showModal2 = (e) => {
    setIdX(e.id)
		setIsModalOpen2(true)
	}
	const [isModalOpen1, setIsModalOpen1] = useState(false)

	const showModal1 = e => {
		setIdx(e.id)
		setInpDesc(e.description)
		setInpName(e.name)
		setIsModalOpen1(true)
	}

	function hundleSubmit(e: React.FormEvent) {
		e.preventDefault()
		let form = e.target
		let formData = new FormData(form)
		addTodo(formData)
		setIsModalOpen(false)
		form.reset()
	}
	function hundleSubmit2(e: React.FormEvent) {
		e.preventDefault()
		let form = e.target
		let formData = new FormData(form)
		addImage({formData,id:idX})
		setIsModalOpen2(false)
		form.reset()
	}
	function hundleSubmit1(e: React.FormEvent) {
		e.preventDefault()
		let obj = {
			name: inpName,
			description: inpDesc,
			id: idx,
		}
		editTodo(obj)
		setIsModalOpen1(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}
	const handleCancel1 = () => {
		setIsModalOpen1(false)
	}
	const handleCancel2 = () => {
		setIsModalOpen2(false)
	}
	return (
		<>
			<Button
				type='primary'
				onClick={showModal}
				style={{ fontWeight: 'bolder', marginLeft: '6%', marginTop: '10px' }}
			>
				Add User
			</Button>
			<Modal
				title='Edit user'
				closable={{ 'aria-label': 'Custom Close Button' }}
				open={isModalOpen2}
				footer={null}
				onCancel={handleCancel2}
			>
				<form action='' onSubmit={hundleSubmit2}>
					<Input placeholder='image' type='file' name='images' />
					<Button
						color='primary'
						variant='solid'
						htmlType='submit'
						style={{ width: '100%' }}
					>
						Edit
					</Button>
				</form>
			</Modal>
			<Modal
				title='Edit user'
				closable={{ 'aria-label': 'Custom Close Button' }}
				open={isModalOpen1}
				footer={null}
				onCancel={handleCancel1}
			>
				<form action='' onSubmit={hundleSubmit1}>
					<Input
						placeholder='Name...'
						value={inpName}
						onChange={e => {
							setInpName(e.target.value)
						}}
						name='name'
					/>
					<Input
						placeholder='Desc...'
						value={inpDesc}
						onChange={e => {
							setInpDesc(e.target.value)
						}}
						name='description'
					/>
					<Button
						color='primary'
						variant='solid'
						htmlType='submit'
						style={{ width: '100%' }}
					>
						Edit
					</Button>
				</form>
			</Modal>
			<Modal
				title='New User'
				closable={{ 'aria-label': 'Custom Close Button' }}
				open={isModalOpen}
				footer={null}
				onCancel={handleCancel}
			>
				<form action='' onSubmit={hundleSubmit}>
					<Input placeholder='Name...' name='name' />
					<Input placeholder='Desc...' name='description' />
					<Input placeholder='image' type='file' name='images' />
					<Button
						color='primary'
						variant='solid'
						htmlType='submit'
						style={{ width: '100%' }}
					>
						Add
					</Button>
				</form>
			</Modal>
			<div className='w-[90%] m-auto flex lg:justify-between justify-center items-center flex-wrap'>
				{data?.data?.map(e => {
					return (
						<div
							className='lg:w-[565px] w-[330px] flex justify-center items-center flex-col bg-[#d8d8d8] mt-[10px] rounded-[30px] p-[50px] text-[black] text-[30px] font-black'
							key={e.id}
						>
							<Carousel
								className='lg:w-[350px] w-[240px]'
								autoplay={{ dotDuration: true }}
								autoplaySpeed={2000}
							>
								{e.images?.map(imm => {
									return (
										<>
											<img
												src={`http://37.27.29.18:8001/images/${imm.imageName}`}
												alt=''
												className='lg:w-[350px] w-[300px] h-[250px] rounded-[30px]'
											/>
											<Button
												color='danger'
												variant='solid'
												onClick={() => {
													deleteImage(imm.id)
												}}
											>
												delete
											</Button>
										</>
									)
								})}
							</Carousel>
							<p className='max-w-[80%] break-words'>{e.name}</p>
							<p className='max-w-[80%] break-words'>{e.description}</p>
							<div className='flex justify-center gap-[5px] items-center mt-[20px]'>
								<Button
									color='danger'
									variant='solid'
									onClick={() => {
										deleteTodo(e.id)
									}}
								>
									delete
								</Button>
								<Button
									color='purple'
									variant='solid'
									onClick={() => {
										editStatus(e.id)
									}}
								>
									{e.isCompleted ? 'Active' : 'Inactive'}
								</Button>
								<Button
									color='cyan'
									variant='solid'
									onClick={() => {
										showModal1(e)
									}}
								>
									✍️
								</Button>
								<Button color='primary' variant='solid' onClick={() => {
										showModal2(e)
									}}>
									Add Image +
								</Button>
                <DrawerInfo id={e.id}/> 
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}

export default App
