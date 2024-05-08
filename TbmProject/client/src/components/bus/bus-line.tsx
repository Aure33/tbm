import { Image } from "@nextui-org/react";
import { Line } from "../../types";
import { useBusColor } from "../../hooks/use-bus-color";
import { Optional } from "@tanstack/react-query";
import { cn } from "../../utils";

export type BusLineProps = {
	busLine: Optional<Line, "isChartered" | "isHidden" | "isSpecial">;
	className: string;
};

export function BusLine({ busLine, className }: Optional<BusLineProps, 'className'>) {
	const [lineType, lineName] = busLine.name.split(" ");

	const busColor = useBusColor(lineType);

	const isTram = lineType === "Tram";

	console.log(busLine);

	const isTBNight = busLine.name === "TBNight";


	return (
		<div className={cn(
			`rounded-md px-2 py-1 flex justify-center items-center text-white relative`,
			className,
			{ "rounded-full w-7": isTram, }
		
		)} style={{ backgroundColor: busColor }}>
			{ isTBNight ? (
				<>
					<p className="opacity-0">TBNight</p>
					<Image src={`./ImagesBus/tbnight.png`} alt={lineName} classNames={{wrapper: "absolute top-0 left-0 h-full w-full rounded-md overflow-hidden", img: "h-full w-full rounded-none object-cover"}} />
				</>
			) : 
				lineName
			}
		</div>
	)
}