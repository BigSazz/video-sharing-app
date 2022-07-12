import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CircleWavyCheck } from 'phosphor-react';

import useAuthStore from '../store/authStore';
import { IUser } from '../types';




const SuggestedAccounts = () => {
	const { fetchAllUsers, allUsers, userProfile }: any = useAuthStore();

	useEffect(() => {
		fetchAllUsers();
	}, [fetchAllUsers]);

	const filterUsers = allUsers.filter((users: IUser) => users._id !== userProfile?._id);

	return (
		<div className='xl:border-b border-gray-200 pb-4'>
			<p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>Suggested Accounts</p>

			<div>
				{filterUsers.slice(0, 6).map((user: IUser) => (
					<Link key={user?._id} href={`/profile/${user?._id}`}>
						<div className='flex gap-3 items-center hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
							<div className='w-8 h-8'>
								<Image
									src={user?.image}
									alt='profile image'
									height={34}
									width={34}
									className='rounded-full'
									layout='responsive'
								/>
							</div>

							<div className='hidden xl:block'>
								<p className='flex justify-center items-center font-bold text-primary lowercase'>
									{user?.userName.replaceAll(' ', '')}
									<CircleWavyCheck className='ml-1 text-blue-400 text-md' weight='fill' />
								</p>
								<p className='capitalize text-gray-400 text-xs'>
									{user?.userName}
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default SuggestedAccounts