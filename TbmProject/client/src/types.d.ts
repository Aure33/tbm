export type BusItemType = {
	id: string;
	name: string;
};

export interface BusType extends BusItemType {
	stopPoints: StopPointType[];
}

export interface StopPointType extends BusItemType {
	hasWheelchairBoarding: boolean;
	routes: Route[];
}

export interface Route extends BusItemType {
	line: Line;
}

export interface Line extends BusItemType {
	isChartered: boolean;
	isHidden: boolean;
	isSpecial: boolean;
}
