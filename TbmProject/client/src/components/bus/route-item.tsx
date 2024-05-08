import { Link } from "react-router-dom";
import { type Route, StopPointType } from "../../types";

export type RouteProps = {
	stopPoint: StopPointType;
	route: Route;
};

export function Route({ route, stopPoint }: RouteProps) {

	console.log(route, stopPoint);

	return (
		<Link
			to={`voir-horaires?line=${
				route.line.id 
			}&stop_point=${stopPoint.id}&lineID=${
				route.line.name.split(" ")[1]
			}&route=${route.id}`}>
			<p className="flex flex-col text-tiny text-gray-500 w-20">
				<span className="text-medium font-bold">
					{stopPoint.name}
				</span>
				{route.name}
			</p>
		</Link>
	);
}
