import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { CircleWavyCheck, XCircle, Play, Pause, SpeakerSimpleHigh, SpeakerSimpleX, Circle } from 'phosphor-react';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { Video } from '../../types';
import useAuthStore from '../../store/authStore';
import { LikeButton, Comments } from '../../components';

interface IProps {
	postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
	const [post, setPost] = useState<Video>(postDetails);
	const [playing, setPlaying] = useState<boolean>(false);
	const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
	const [comment, setComment] = useState('');
	const [isPostingComment, setIsPostingComment] = useState<boolean>(false)

	const videoRef = useRef<HTMLVideoElement>(null);
	const router = useRouter();

	const { userProfile }: any = useAuthStore();

	const onVideoClick = () => {
		if (playing) {
			videoRef.current?.pause();
			setPlaying(false);
		} else {
			videoRef.current?.play();
			setPlaying(true);
		}
	}

	useEffect(() => {
		if (post && videoRef?.current) {
			videoRef.current.muted = isVideoMuted;
		}
	}, [post, isVideoMuted]);

	const handleLike = async (like: boolean) => {
		if (userProfile) {
			const { data } = await axios.put(`${BASE_URL}/api/like`, {
				userId: userProfile._id,
				postId: post._id,
				like
			})

			setPost({ ...post, likes: data.likes });
		}
	}

	const addComment = async (e: any) => {
		e.preventDefault();

		if (userProfile && comment) {
			setIsPostingComment(true);
			const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
				userId: userProfile._id,
				comment
			})
			setPost({ ...post, comments: data.comments });
			setComment('');
			setIsPostingComment(false);
		}
	}

	if (!post) return null;

	return (
		<div className='flex w-full absolute left-0 top-0 flex-wrap lg:flex-nowrap bg-white'>
			{/* Left side */}
			<div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black'>
				<div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
					<p
						className='cursor-pointer'
						onClick={() => router.back()}
					>
						<XCircle size={32} color="white" weight='duotone' />
					</p>
				</div>
				<div className='relative'>
					<div className='lg:h-[100vh] h-[60vh]'>
						<video
							ref={videoRef}
							loop
							onClick={onVideoClick}
							className='h-full cursor-pointer'
							src={post?.video?.asset?.url}></video>
					</div>
					<div className='absolute z-50 top-[45%] left-[45%] cursor-pointer'>
						{!playing && (
							<button
								onClick={onVideoClick}
							>
								<Play size={54} color="white" weight='fill' />
							</button>
						)}
					</div>
				</div>
				<div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
					{isVideoMuted ? (
						<button
							onClick={() => setIsVideoMuted(false)}
						>
							<SpeakerSimpleX size={54} color="white" weight='fill' />
						</button>
					) : (
						<button
							onClick={() => setIsVideoMuted(true)}
						>
							<SpeakerSimpleHigh size={54} color="white" weight='fill' />
						</button>
					)}
				</div>
			</div>

			{/* Right side */}
			<div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
				<div className='lg:mt-20 mt-10 px-2 lg:px-4 space-y-4'>
					<div className='flex gap-3 cursor-pointer font-semibold rounded'>
						<div className='ml-4 md:w-20 md:h-20 w-16 h-16'>
							<Link href='/'>
								<>
									<Image
										width={62}
										height={62}
										className='rounded-full'
										src={post?.postedBy?.image}
										alt={post?.postedBy?.userName}
										layout='responsive'
									/>
								</>
							</Link>
						</div>
						<div>
							<Link href='/'>
								<div className='flex flex-col justify-center items-start mt-4'>
									<p className='flex gap-2 items-center md:text-md font-bold text-primary'>
										{post?.postedBy?.userName}{' '}
										<CircleWavyCheck className='text-blue-400 text-md' weight='fill' />
									</p>
									<p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>{post?.postedBy?.userName}</p>
								</div>
							</Link>
						</div>
					</div>

					<p className='pl-4 text-lg text-gray-500'>{post?.caption}</p>

					<div className='pl-4'>
						{userProfile && (
							<LikeButton
								likes={post?.likes}
								handleLike={() => handleLike(true)}
								handleDislike={() => handleLike(false)}
							/>
						)}
					</div>

					<div>
						<Comments
							comment={comment}
							comments={post?.comments}
							setComment={setComment}
							addComment={addComment}
							isPostingComment={isPostingComment}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
	const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);
	return {
		props: {
			postDetails: data
		}
	}
}

export default Detail;