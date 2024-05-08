import { Link } from "react-router-dom";
import { Route, StopPointType } from "../../types";
import { BusLine } from "./bus-line";
import { Spacer } from "@nextui-org/react";

export type StopPointProps = {
	stopPoint: StopPointType;
};

export function StopPoint({ stopPoint }: StopPointProps) {

	return (
		<>
			{stopPoint.routes && stopPoint.routes.map((route: Route) => (
				<Link key={route.id}
					to={`voir-horaires?line=${
						route.line.id 
					}&stop_point=${stopPoint.id}&lineID=${
						route.line.name.split(" ")[1]
					}&route=${route.id}`}>
					<div className="flex flex-row items-center border-stone-100">
						<BusLine busLine={route.line} />
						<Spacer x={3} />
						<p className="flex flex-col text-tiny text-gray-500">
							<span className="text-medium font-bold">
								{stopPoint.name}
							</span>
							{route.name}
						</p>
					</div>
				</Link>
			))}
		</>
	);
}
