import { Optional } from "@tanstack/react-query";
import { type Route } from "../../types";
import { cn } from "@/utils";

export type RouteItemProps = {
	route: Route;
    className: string;
};

export function RouteItem({ route, className }: Optional<RouteItemProps, "className">) {

	return (
		<p className={cn("text-xs text-gray-500", className)}>
            {route.name}
		</p>
	);
}

