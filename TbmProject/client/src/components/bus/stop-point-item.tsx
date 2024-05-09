import { Optional } from "@tanstack/react-query";
import { StopPoint } from "../../types";
import { cn } from "@/utils";

export type StopPointItemProps = {
	stopPoint: StopPoint;
    className: string;
};

export function StopPointItem({ stopPoint, className }: Optional<StopPointItemProps, "className">) {

	return (
		<p className={cn("text-md font-semibold", className)}>
            {stopPoint.name}
		</p>
	);
}
