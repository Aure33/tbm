export type BusItemType = {
	id: string;
	name: string;
};

export interface BusType extends BusItemType {
	stopPoints: StopPoint[];
}

export interface StopPoint extends BusItemType {
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

export interface BusDetailsProps {
	line: string;
	stopPoint: string;
	lineID: string;
	route: string;
}

export interface BusDetails {
	destinations: Destination[string];
}

export interface Destination {
	vehicleLattitude: number;
	vehicleLongitude: number;
	waitTimeText: string;
	tripID: string;
	scheduleID: string;
	destinationID: string;
	destinationName: string;
	departure: string;
	departureCommande: string;
	departureTheorique: string;
	arrival: string;
	arrivalCommande: string;
	arrivalTheorique: string;
	comment: string;
	realTime: string;
	waitTime: string;
	updatedAt: string;
	vehicleID: string;
	vehiclePositionUpdatedAt: string;
	origin: string;
}
