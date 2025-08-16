import React, { useState } from 'react'
import type { DrawerProps, RadioChangeEvent } from 'antd'
import { Button, Drawer, Radio, Space } from 'antd'
import { useInfoTodoQuery } from './api/todoApi'

const DrawerInfo: React.FC = ({id}) => {
	const [open, setOpen] = useState(false)
	const [placement, setPlacement] = useState<DrawerProps['placement']>('left')
	let { data } = useInfoTodoQuery(id)

	const showDrawer = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	const onChange = (e: RadioChangeEvent) => {
		setPlacement(e.target.value)
	}

	return (
		<>
			<Space>
				<Button type='primary' onClick={showDrawer}>
					Info
				</Button>
			</Space>
			<Drawer
				title='Basic Drawer'
				placement={placement}
				closable={false}
				onClose={onClose}
				open={open}
				key={placement}
			>
        <p>{data?.data?.name}</p>
				<p>{data?.data?.description}</p>
				<p>{data?.data?.isCompleted?'Active':'Inactive'}</p>
      </Drawer>
		</>
	)
}

export default DrawerInfo
