'use client';

import { soundAtom } from '@/atoms/sound';
import useSound from 'use-sound';
import Image from 'next/image';
import React, { ReactNode, useEffect } from 'react';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { useRecoilState } from 'recoil';
import { FaBell, FaBellSlash } from 'react-icons/fa';
import { TbMusicOff } from 'react-icons/tb';
import ohm from '@/public/image/om.png';
import { RiShareFill } from 'react-icons/ri';

const PageLayout = ({ children }: { children: ReactNode }) => {
	const [play, { pause, sound: howl }] = useSound('/audio/ram_updated.mp3');
	const [playBell, { stop: stopBell, sound: bell }] =
		useSound('/audio/bell.mp3');

	const [sound, setSound] = useRecoilState(soundAtom);

	const toggleMute = () => {
		setSound((ref) => {
			return {
				...ref,
				sound: !ref.sound,
				backgroundSound: false,
				bell: false,
			};
		});
	};

	useEffect(() => {
		if (sound.backgroundSound === true) {
			howl.loop(true);
			play();
		} else {
			pause();
		}
	}, [sound.backgroundSound]);

	useEffect(() => {
		if (sound.bell === true) {
			bell.loop(true);
			playBell();
		} else {
			stopBell();
		}
	}, [sound.bell]);

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: 'Ram Pooja | Bookseva',
					text: 'Join me in the bookseva initiative, Ram Pooja!',
					url: 'https://puja.bookseva.com',
				});
			} catch (error) {
				console.error('Error sharing:', error);
			}
		} else {
			console.log('Something went wrong');
		}
	};

	return (
		<div className="flex-1 w-full h-full">
			<div className="absolute z-[999] left-2 top-5 flex flex-col space-y-3">
				<button
					onClick={() => {
						toggleMute();

						// console.log('clicked');
					}}
				>
					{sound.sound ? (
						<HiSpeakerWave className="h-7 fill-orange-600 bg-white rounded-full p-1 w-7" />
					) : (
						<HiSpeakerXMark className="h-7 fill-orange-600 bg-white rounded-full p-1 w-7" />
					)}
				</button>
				<button
					onClick={() => {
						if (sound.sound) {
							setSound((ref) => {
								return {
									...ref,
									backgroundSound: !ref.backgroundSound,
								};
							});
						}
						// console.log('clicked');
					}}
				>
					{sound.backgroundSound ? (
						<Image
							src={ohm}
							alt="ohm image"
							className="h-7 fill-orange-600 text-orange-600a bg-white rounded-full p-1 w-7"
						/>
					) : (
						<TbMusicOff className="h-7 fill-orange-600 bg-white rounded-full p-1 w-7" />
					)}
				</button>
			</div>
			<div className="absolute z-[999] right-2 top-5 flex flex-col space-y-3">
				<button
					onClick={() => {
						if (sound.sound) {
							setSound((ref) => {
								return {
									...ref,
									bell: !ref.bell,
								};
							});
						}
						// console.log('bell', sound);
					}}
				>
					{sound.bell ? (
						<FaBell className="h-7 fill-orange-600 bg-white rounded-full p-1 w-7 animate-wiggle" />
					) : (
						<FaBellSlash className="h-7 fill-orange-600 bg-white rounded-full p-1 w-7" />
					)}
				</button>
				<button onClick={handleShare}>
					<RiShareFill className="h-7 fill-orange-600 bg-white rounded-full p-1 w-7" />
				</button>
			</div>
			<div className="max-w-screen w-full mx-auto bg-background h-full">
				{children}
			</div>
		</div>
	);
};

export default PageLayout;
