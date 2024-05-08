import { BusDetails, BusDetailsProps } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useBusDetails = ({ line, lineID, route, stopPoint }: BusDetailsProps) => {
	return useQuery<BusDetails>({
		queryKey: ["busDetails", line, lineID, route, stopPoint],
		queryFn: async () => {
			const data = await fetch(`https://ws.infotbm.com/ws/1.0/get-realtime-pass-by-id/${line}/${stopPoint}/${lineID}/${route}`);
			return data.json();
		},
		refetchInterval: 10000,
	});
};
