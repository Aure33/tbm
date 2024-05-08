import { useQuery } from "@tanstack/react-query";
import { BusType } from "../types";
import axios from "axios";

export const useBusList = (searchInput: string) => {
	const isValidBusId = (stopPoint: string) => {
		return !["TBS", "BTD", "SNC"].includes(stopPoint.substring(11, 14));
	};

	return useQuery<BusType[]>({
		queryKey: ["search", searchInput],
		queryFn: async () => {
			if (!searchInput) return [];
			const response = await axios.get(
				`https://ws.infotbm.com/ws/1.0/get-schedule/${searchInput}?referer=www`
			);
			const listBus: BusType[] = [];
			for (let i = 0; i < response.data.length; i++) {
				const stop = response.data[i].url;
				const response2 = await axios.get(stop);
				if (response2.data.length !== 0) {
					const responseTMP: BusType = {
						id: response2.data.id,
						name: response2.data.name,
						stopPoints: [],
					};
					if (response2.data.stopPoints) {
						for (
							let j = 0;
							j < response2.data.stopPoints.length;
							j++
						) {
							const stopPoint = response2.data.stopPoints[j].id;
							if (isValidBusId(stopPoint)) {
								responseTMP.stopPoints.push(
									response2.data.stopPoints[j]
								);
							}
						}
					}
					listBus.push(responseTMP);
				}
			}
			return listBus;
		},
	});
};
