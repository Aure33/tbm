import { Outlet } from "react-router-dom";
import { VersionLabel } from "./verion-label";
import { TBMNavbar } from "./tbm-navbar";
import { useEffect, useState } from "react";
import { Loader } from "./loader";

export function TBMOutlet() {

	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
        setTimeout(() => setIsLoaded(true), 1000)
    }, [])

	return (
		<>
			<TBMNavbar />
			<div className="min-h-screen flex justify-center items-center">
				{isLoaded ? (
					<div className="thin-border border-gray p-14 mx-auto flex flex-col justify-center items-center  bg-white shadow-xl relative">
						<Outlet />
						<VersionLabel version="0.0.1-alpha" />
					</div>
				) : (
					<Loader/>
				)}
			</div>
		</>
	);
}
