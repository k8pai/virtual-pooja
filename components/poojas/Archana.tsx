'use client';

import { activePoojas } from '@/atoms/pooja';
import { soundAtom } from '@/atoms/sound';
import Image from 'next/image';
import React, { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import AudioPlayer from '@/components/AudioPlayer';

const Archana = () => {
	const [pooja, setPooja] = useRecoilState(activePoojas);
	const sound = useRecoilValue(soundAtom);
	const audioRef = useRef<HTMLAudioElement>(null);

	const handlePlay = () => {
		setPooja((ref) => ({ ...ref, archana: true }));

		if (audioRef.current) {
			audioRef.current.play();
		}

		const archana = setTimeout(() => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.currentTime = 0;
			}
			setPooja((ref) => ({ ...ref, archana: false }));
		}, 7000);

		return () => clearTimeout(archana);
	};

	return (
		<button
			onClick={handlePlay}
			disabled={pooja.archana}
			className="absolute top-[2%] left-[41%] flex flex-col items-center"
		>
			<div className="rounded-full bg-white w-14 h-14 relative">
				<Image
					alt="Image is not supported"
					src="https://pooja.bookseva.com/Assets/Archana/icon/flowerIcon.png"
					fill
					className="p-2"
				/>
			</div>
			<AudioPlayer
				src={'/audio/archana.mp3'}
				muted={!sound.sound}
				audioRef={audioRef}
			/>
			<div className="text-sm font-semibold mt-1 text-white">Archana</div>
		</button>
	);
};

export default Archana;
