"use client";
import React, { useState } from "react";
import { Mic, MessageCircle, MoreHorizontal, Heart } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const SocialApp = () => {
	const [posts, setPosts] = useState([
		{
			id: 1,
			username: "dirtcastle",
			content:
				'It\'s painfully obvious that society has been using hand-eye coordination as a proxy for "creativity". This is why people get so confused when comparing visual and verbal arts.\n\ngenAI is not w/o its medium-specific considerations. Regular readers of my posts are familiar with the "rabbit hole" concept. It is an acknowledgment that 99% of gens are dead-ends. But genAI is also not a reliable slot machine. You need general art knowledge and model heuristics to reliably generate compelling output.',
			likes: 17,
			comments: 6,
			reposts: 0,
			shares: 0,
			timestamp: "3h",
		},
		{
			id: 2,
			username: "jamesclearatomichabits",
			content: "The ultimate productivity hack is saying no.",
			likes: 247,
			comments: 14,
			reposts: 35,
			shares: 5,
			timestamp: "21h",
		},
	]);

	return (
		<div className='max-w-xl mx-auto bg-black text-white'>
			{/* Post Creation Area */}
			<div className='p-4 border-b border-gray-800'>
				<div className='flex items-center space-x-3'>
					<Avatar className='w-8 h-8'>
						<AvatarImage
							src='/api/placeholder/32/32'
							alt='User'
						/>
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
					<input
						type='text'
						placeholder="What's new?"
						className='flex-1 bg-transparent border-none outline-none text-gray-300 placeholder-gray-500'
					/>
					<Button
						variant='secondary'
						size='sm'
						className='bg-gray-800 hover:bg-gray-700 text-white flex items-center space-x-1 px-4 py-1 rounded-full'
					>
						<span>Post</span>
						<Mic className='w-4 h-4 ml-1' />
					</Button>
				</div>
			</div>

			{/* Posts Feed */}
			{posts.map((post) => (
				<div
					key={post.id}
					className='p-4 border-b border-gray-800'
				>
					<div className='flex space-x-3'>
						<Avatar className='w-8 h-8'>
							<AvatarImage
								src='/api/placeholder/32/32'
								alt={post.username}
							/>
							<AvatarFallback>{post.username[0]}</AvatarFallback>
						</Avatar>
						<div className='flex-1'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center space-x-2'>
									<span className='font-medium'>{post.username}</span>
									<span className='text-gray-500'>· {post.timestamp}</span>
								</div>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant='ghost'
											size='sm'
											className='h-8 w-8 p-0 text-gray-500 hover:text-gray-300'
										>
											<MoreHorizontal className='h-4 w-4' />
										</Button>
									</PopoverTrigger>
									<PopoverContent
										side='bottom'
										align='end'
										className='w-40 bg-gray-900 border-gray-800'
									>
										<div className='text-sm text-gray-300'>
											Options menu placeholder
										</div>
									</PopoverContent>
								</Popover>
							</div>
							<p className='mt-2 mb-3 text-gray-300 whitespace-pre-line'>
								{post.content}
							</p>
							<div className='flex items-center space-x-6 text-gray-500'>
								<Button
									variant='ghost'
									size='sm'
									className='flex items-center space-x-2 hover:text-gray-300'
								>
									<Heart className='w-4 h-4' />
									<span>{post.likes}</span>
								</Button>
								<Button
									variant='ghost'
									size='sm'
									className='flex items-center space-x-2 hover:text-gray-300'
								>
									<MessageCircle className='w-4 h-4' />
									<span>{post.comments}</span>
								</Button>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default SocialApp;

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
// 	Mic,
// 	Heart,
// 	MessageCircle,
// 	MoreHorizontal,
// 	Trash2,
// } from "lucide-react";
// import Link from "next/link";
// import DeepSpeech from "deepspeech";

// type Post = {
// 	id: number;
// 	username: string;
// 	avatar: string;
// 	content: string;
// 	likes: number;
// 	comments: number;
// 	timeAgo: string;
// };

// export function SpeechSocialFeed() {
// 	const [posts, setPosts] = useState<Post[]>([
// 		{
// 			id: 1,
// 			username: "dirtcastle",
// 			avatar: "/placeholder.svg?height=40&width=40",
// 			content:
// 				"It's painfully obvious that society has been using hand-eye coordination as a proxy. This is why people get so confused when comparing visual and verbal arts.",
// 			likes: 17,
// 			comments: 6,
// 			timeAgo: "3h",
// 		},
// 		{
// 			id: 2,
// 			username: "jamesclearatomichabits",
// 			avatar: "/placeholder.svg?height=40&width=40",
// 			content: "The ultimate productivity hack is saying no.",
// 			likes: 247,
// 			comments: 14,
// 			timeAgo: "21h",
// 		},
// 	]);
// 	const [isRecording, setIsRecording] = useState(false);
// 	const [transcription, setTranscription] = useState("");
// 	const mediaRecorder = useRef<MediaRecorder | null>(null);
// 	const audioChunks = useRef<Blob[]>([]);

// 	useEffect(() => {
// 		// Initialize DeepSpeech model
// 		// Note: In a real application, you would need to load the model files
// 		const initDeepSpeech = async () => {
// 			try {
// 				const model = new DeepSpeech.Model("path/to/model.pbmm");
// 				// model.loadModel("path/to/model.pbmm");
// 				model.enableExternalScorer("path/to/scorer.scorer");
// 			} catch (error) {
// 				console.error("Failed to initialize DeepSpeech:", error);
// 			}
// 		};

// 		initDeepSpeech();
// 	}, []);

// 	const startRecording = async () => {
// 		try {
// 			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
// 			mediaRecorder.current = new MediaRecorder(stream);
// 			audioChunks.current = [];

// 			mediaRecorder.current.ondataavailable = (event) => {
// 				audioChunks.current.push(event.data);
// 			};

// 			mediaRecorder.current.onstop = async () => {
// 				const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
// 				// In a real application, you would:
// 				// 1. Convert the audio to the format required by DeepSpeech
// 				// 2. Process it through the DeepSpeech model
// 				// 3. Get the transcription
// 				// For now, we'll simulate the transcription
// 				setTranscription("This is a simulated transcription of your speech.");
// 			};

// 			mediaRecorder.current.start();
// 			setIsRecording(true);
// 		} catch (error) {
// 			console.error("Failed to start recording:", error);
// 		}
// 	};

// 	const stopRecording = () => {
// 		if (mediaRecorder.current && isRecording) {
// 			mediaRecorder.current.stop();
// 			setIsRecording(false);
// 			mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
// 		}
// 	};

// 	const handlePost = () => {
// 		if (transcription) {
// 			const newPost: Post = {
// 				id: Date.now(),
// 				username: "CurrentUser",
// 				avatar: "/placeholder.svg?height=40&width=40",
// 				content: transcription,
// 				likes: 0,
// 				comments: 0,
// 				timeAgo: "now",
// 			};
// 			setPosts([newPost, ...posts]);
// 			setTranscription("");
// 		}
// 	};

// 	const handleLike = (postId: number) => {
// 		setPosts(
// 			posts.map((post) =>
// 				post.id === postId ? { ...post, likes: post.likes + 1 } : post
// 			)
// 		);
// 	};

// 	const handleDelete = (postId: number) => {
// 		setPosts(posts.filter((post) => post.id !== postId));
// 	};

// 	return (
// 		<div className='max-w-xl mx-auto space-y-4 p-4 dark'>
// 			<Card className='bg-gray-900 border-gray-800'>
// 				<div className='p-4 flex items-start space-x-3'>
// 					<Avatar>
// 						<AvatarImage
// 							src='/placeholder.svg?height=40&width=40'
// 							alt='@user'
// 						/>
// 						<AvatarFallback>U</AvatarFallback>
// 					</Avatar>
// 					<div className='flex-grow'>
// 						<div className='min-h-[40px] text-gray-400'>
// 							{isRecording ? (
// 								<p>Recording...</p>
// 							) : transcription ? (
// 								<p className='text-gray-200'>{transcription}</p>
// 							) : (
// 								<p>What's new?</p>
// 							)}
// 						</div>
// 						<div className='flex items-center justify-between mt-4'>
// 							<Button
// 								onClick={isRecording ? stopRecording : startRecording}
// 								variant='ghost'
// 								size='icon'
// 								className='rounded-full text-gray-400 hover:text-gray-200'
// 							>
// 								<Mic
// 									className={isRecording ? "text-red-500 animate-pulse" : ""}
// 								/>
// 								<span className='sr-only'>Record</span>
// 							</Button>
// 							<Button
// 								onClick={handlePost}
// 								disabled={!transcription}
// 								className='bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4'
// 							>
// 								Post
// 							</Button>
// 						</div>
// 					</div>
// 				</div>
// 			</Card>

// 			{posts.map((post) => (
// 				<Card
// 					key={post.id}
// 					className='bg-gray-900 border-gray-800'
// 				>
// 					<Link
// 						href={`/post/${post.id}`}
// 						className='block'
// 					>
// 						<div className='p-4'>
// 							<div className='flex items-start justify-between'>
// 								<div className='flex items-center space-x-3'>
// 									<Avatar>
// 										<AvatarImage
// 											src={post.avatar}
// 											alt={post.username}
// 										/>
// 										<AvatarFallback>{post.username[0]}</AvatarFallback>
// 									</Avatar>
// 									<div>
// 										<p className='font-semibold text-gray-200'>
// 											{post.username}
// 										</p>
// 										<p className='text-sm text-gray-500'>{post.timeAgo}</p>
// 									</div>
// 								</div>
// 								<DropdownMenu>
// 									<DropdownMenuTrigger asChild>
// 										<Button
// 											variant='ghost'
// 											size='icon'
// 											className='text-gray-400 hover:text-gray-200'
// 										>
// 											<MoreHorizontal className='h-5 w-5' />
// 										</Button>
// 									</DropdownMenuTrigger>
// 									<DropdownMenuContent
// 										align='end'
// 										className='bg-gray-800 border-gray-700'
// 									>
// 										<DropdownMenuItem
// 											onClick={(e) => {
// 												e.preventDefault();
// 												handleDelete(post.id);
// 											}}
// 											className='text-red-400 hover:text-red-300 hover:bg-gray-700'
// 										>
// 											<Trash2 className='h-4 w-4 mr-2' />
// 											Delete
// 										</DropdownMenuItem>
// 									</DropdownMenuContent>
// 								</DropdownMenu>
// 							</div>
// 							<p className='mt-3 text-gray-200'>{post.content}</p>
// 							<div className='flex items-center space-x-4 mt-3 text-gray-400'>
// 								<button
// 									onClick={(e) => {
// 										e.preventDefault();
// 										handleLike(post.id);
// 									}}
// 									className='flex items-center space-x-1 hover:text-gray-200'
// 								>
// 									<Heart className='h-5 w-5' />
// 									<span>{post.likes}</span>
// 								</button>
// 								<button className='flex items-center space-x-1 hover:text-gray-200'>
// 									<MessageCircle className='h-5 w-5' />
// 									<span>{post.comments}</span>
// 								</button>
// 							</div>
// 						</div>
// 					</Link>
// 				</Card>
// 			))}
// 		</div>
// 	);
// }
