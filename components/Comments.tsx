import React, { useState, Dispatch, SetStateAction } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CircleWavyCheck, UserPlus } from 'phosphor-react';
import useAuthStore from '../store/authStore';
import NoResults from './NoResults';

interface IProps {
	isPostingComment: boolean,
	comment: string,
	setComment: Dispatch<SetStateAction<string>>,
	addComment: (e: React.FormEvent) => void,
	comments: IComment[],
}

interface IComment {
	comment: string,
	length?: number,
	_key: string,
	postedBy: { _ref: string, _id?: string },
}

const Comments = ({ comment, comments, isPostingComment, addComment, setComment }: IProps) => {
	const router = useRouter();
	const { userProfile } = useAuthStore();

	console.log("COMMENTS=========>", comments);

	return (
		<div className='border-y border-gray-200 pt-4 px-10 bg-[#F8F8F8] lg:pb-0 pb-[100px]'>
			<div className='overflow-scroll lg:h-[475px]'>
				{comments?.length ? (
					<div>videos</div>
				) : (
					<NoResults text={'No comments yet!'} />
				)}
			</div>

			{userProfile && (
				<div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
					<form
						onSubmit={addComment}
						className='flex gap-4'
					>
						<input
							type="text"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder='Add a comment...'
							className='bg-primary flex-1 w-[250px] md:w-[700px] lg:w-[420px] px-6 py-4 border-2 border-gray-100 rounded-lg text-md font-medium outline-none focus:outline-none focus:border-2 focus:border-gray-300'
						/>
						<button
							onClick={addComment}
							className='text-md text-gray-400 hover:text-gray-700'
						>
							{isPostingComment ? 'Commenting...' : 'Comment'}
						</button>
					</form>
				</div>
			)}
		</div>
	)
}

export default Comments