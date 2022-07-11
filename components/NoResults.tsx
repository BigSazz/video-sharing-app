import React from 'react';
import { VideoCameraSlash, ChatDots } from 'phosphor-react';

interface IProps {
	text: string
}

const NoResults = ({ text }: IProps) => {
	return (
		<div className='flex flex-col justify-center items-center h-full w-full'>
			<p className='text-8xl'>
				{text === 'No comments yet!' ? <ChatDots className='text-gray-500' weight='duotone' /> : <VideoCameraSlash className='text-gray-500' weight='duotone' />}
			</p>
			<p className='text-2xl text-center'>{text}</p>
		</div>
	)
}

export default NoResults