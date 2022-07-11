import React, { useState, useEffect } from 'react';
import { HeartStraight } from 'phosphor-react';

import useAuthStore from '../store/authStore';

interface IProps {
	handleLike: () => void,
	handleDislike: () => void,
	likes: any[]
}

const LikeButton = ({ handleLike, handleDislike, likes }: IProps) => {
	const [alreadyLiked, setAlreadyLiked] = useState<boolean>(false);
	const { userProfile }: any = useAuthStore();
	const filterLikes = likes?.filter(item => item._ref === userProfile?._id)

	useEffect(() => {
		if (filterLikes?.length > 0) {
			setAlreadyLiked(true)
		} else {
			setAlreadyLiked(false)
		}
	}, [filterLikes, likes])

	return (
		<div className='flex gap-6'>
			<div className='flex justify-center items-center cursor-pointer space-x-2'>
				{alreadyLiked ? (
					<div
						onClick={handleDislike}
						className='text-[#F51997]'>
						<HeartStraight className='text-lg md:text-2xl' weight='fill' />
					</div>
				) : (
					<div
						onClick={handleLike}
						className=''>
						<HeartStraight className='text-lg md:text-2xl' weight='regular' />
					</div>
				)}
				<p className='text-md font-semibold'>{likes?.length || 0}</p>
			</div>
		</div>
	)
}

export default LikeButton