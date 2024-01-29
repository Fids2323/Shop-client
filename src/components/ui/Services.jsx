import React from "react";
import serviceData from "../../assets/data/serviceData.js";

const Services = () => {
	return (
		<section className="services">
			<div className="container pt-5 mx-auto flex  items-center justify-center flex gap-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{serviceData.map((service, index) => (
						<div key={index}>
							<div className="p-2 md:p-5 flex items-center justify-center gap-3 cursor-pointer h-36 rounded-md hover:scale-110 ease-out duration-300" style={{background: service.bg}}>
								<span className="hidden lg:block">
									<i className={service.icon + " text-4xl p-2"}></i>
								</span>
								<div>
									<h3 className="text-main text-lg lg:text-xl font-semibold">{service.title}</h3>
									<p className="text-sm lg:text-sm xl:text-lg text-gray-400">{service.subtitle}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;
