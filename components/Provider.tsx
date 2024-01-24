'use client';

import React, { ReactNode } from 'react';
import {
	RecoilRoot,
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
} from 'recoil';

const Provider = ({ children }: { children: ReactNode }) => {
	return <RecoilRoot>{children}</RecoilRoot>;
};

export default Provider;
