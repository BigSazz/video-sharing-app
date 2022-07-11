import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { SignOut } from 'phosphor-react';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

import Logo from '../utils/tiktik-logo.png';
import { createOrGetUser } from '../utils';

import useAuthStore from '../store/authStore';

const Navbar = () => {
	const { userProfile, addUser, removeUser } = useAuthStore();

	return (
		<div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
			<Link href='/'>
				<div className='w-[100] md:w-[130px]'>
					<Image
						className='cursor-pointer'
						src={Logo}
						alt='logo'
						layout='responsive'
					/>
				</div>
			</Link>

			<div>SEARCH</div>

			<div>
				{userProfile ? (
					<div className='flex gap-5 md:gap-10'>
						<Link href='/upload'>
							<button className='border px-2 md:px-4 text-md font-semibold flex items-center gap-2 rounded hover:bg-gray-200'>
								<IoMdAdd className='text-xl' /> {' '}
								<span className='hidden md:block'>Upload</span>
							</button>
						</Link>
						{userProfile?.image && (
							<Link href='/'>
								<>
									<Image
										width={40}
										height={40}
										className='rounded-full cursor-pointer'
										src={userProfile?.image}
										alt='profile image'
									// layout='responsive'
									/>
								</>
							</Link>
						)}
						<button
							type='button'
							className='px-2 hover:shadow-md'
							onClick={() => {
								googleLogout();
								removeUser();
							}}
						>
							<SignOut color='#f51997' size={30} weight='light' />
						</button>
					</div>
				) : (
					<GoogleLogin
						onSuccess={(res) => createOrGetUser(res, addUser)}
						onError={() => console.log("error")}
					/>
				)}
			</div>
		</div>
	)
}

export default Navbar;