import React, {useEffect, useState} from "react";

const Clock = () => {
	const [days, setDays] = useState();
	const [hours, setHours] = useState();
	const [minutes, setMinutes] = useState();
	const [seconds, setSeconds] = useState();

	let interval;

	const countInit = () => {
		const destination = new Date("June 10,2023");
		interval = setInterval(() => {
			const now = new Date().getTime();
			const different = destination - now;
			const days = Math.floor(different / (1000 * 60 * 60 * 24));
			const hours = Math.floor((different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((different % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((different % (1000 * 60)) / 1000);

			if (destination < 0) {
				clearInterval(interval.current);
			} else {
				setDays(days);
				setHours(hours);
				setMinutes(minutes);
				setSeconds(seconds);
			}
		});
	};
	useEffect(() => {
		countInit();
	});

	return (
		<div className="flex items-center justify-center md:justify-start gap-3 mb-14">
			<div className="flex items-center gap-5">
				<div className="text-center">
					<h1 className="text-white text-4xl mb-2">{days}</h1>
					<h5 className="text-white text-lg">Days</h5>
				</div>
				<span className="text-white text-lg">:</span>
			</div>
			<div className="flex items-center gap-3">
				<div className="text-center">
					<h1 className="text-white text-text-4xl mb-2">{hours}</h1>
					<h5 className="text-white text-lg">Hours</h5>
				</div>
				<span className="text-white text-lg">:</span>
			</div>
			<div className="flex items-center gap-3">
				<div className="text-center">
					<h1 className="text-white text-text-4xl mb-2">{minutes}</h1>
					<h5 className="text-white text-lg">Minutes</h5>
				</div>
				<span className="text-white text-lg">:</span>
			</div>
			<div className="flex items-center gap-3">
				<div className="text-center">
					<h1 className="text-white text-text-4xl mb-2">{seconds}</h1>
					<h5 className="text-white text-lg">Seconds</h5>
				</div>
			</div>
		</div>
	);
};

export default Clock;
