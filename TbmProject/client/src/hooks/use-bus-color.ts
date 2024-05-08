export const useBusColor = (busType: string) => {
	return busColorsMap[busType.toLowerCase()] || "gray";
};

const busColorsMap: Record<string, string> = {
	lianes: "#00b1eb",
	locale: "#76b82a",
	principale: "#00a98b",
	car: "#e7344c",
};
