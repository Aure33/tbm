import axios from "axios";
import { StopPointType } from "../../types";
import { StopPoint } from "./stop-point-item";

axios.defaults.baseURL = "http://localhost:3000";


export const BusList = ( stopPoints : StopPointType[]) => {

	return (
		<>
			{stopPoints && stopPoints.map((stopPoint: StopPointType) =>
				<StopPoint key={stopPoint.id} stopPoint={stopPoint} />
			)}
		</>
	);
};
