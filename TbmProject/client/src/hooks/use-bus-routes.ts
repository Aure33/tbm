import { useEffect } from "react";
import { useBusList } from "./use-bus-list";

export const useBusRoutes = (searchInput: string) => {
	const { status, data, refetch } = useBusList(searchInput);

	useEffect(() => {
		refetch();
	}, [searchInput, refetch]);

	return {
		data:
			data?.flatMap((bus) =>
				bus.stopPoints.flatMap((stopPoint) => {
					return stopPoint.routes.map((route) => ({
						stopPoint,
						route,
					}));
				})
			) || [],
		status: status,
		refetch,
	};
};
