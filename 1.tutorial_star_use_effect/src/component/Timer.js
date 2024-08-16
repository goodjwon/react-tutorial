import React, {useEffect} from 'react';

const Timer = ()=>{

	useEffect(()=>{
		const timer = setInterval(()=>{
			console.log('Timer 돌아라는 중')
	}, 1000);

	return()=>{
		console.log('타이머가 종료되었습니다.');
		clearInterval(timer);
	};

	}, []);

	return (
		<div>
			<span>타이머를 시작합니다. 콘솔을 보세요.</span>
		</div>
	)
}

export default Timer;