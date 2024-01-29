import React from "react";
import {Link} from "react-router-dom";

const GroupList = ({title, arr, className}) => {
	return (
		<div className={className}>
			<div>
				<h4 className="mb-1 md:mb-5 text-white text-lg">{title}</h4>
				<ul>
					{arr.map((item, index) => (
						<li key={index}>
							<Link to={item.path} className="text-gray-400">
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default GroupList;
