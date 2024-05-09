import { Accordion, AccordionItem, Autocomplete, AutocompleteItem, Spacer } from "@nextui-org/react";
import { useBusRoutes } from "@hooks/use-bus-routes";
import { RouteItem } from "./route-item";
import { BusLine } from "./bus-line";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Icons } from "../icons";
import { Route, StopPoint } from "./../../types"
import { StopPointItem } from "./stop-point-item";

export function SearchBar() {
	const [searchInput, setSearchInput] = useState("");
	const debouncedSearchInput = useDebounce(searchInput, 1000);
	const { status, data } = useBusRoutes(debouncedSearchInput);

	const label = (
		<p className="flex flex-row items-center">
			<Icons.transport className="w-4 text-secondary" />
			<Spacer x={1} />
			Chercher un arrêt
		</p>
	);

	const linkToDetailsPage = (item: {route: Route, stopPoint: StopPoint}) => 
		`/voir-horaires?line=${item.route.line.id}&stop_point=${item.stopPoint.id}&lineID=${item.route.line.name}&route=${item.route.id}`;

	return (
		<>
			<Autocomplete
				size="sm"
				className="rounded-lg"
				isLoading={status === "pending"}
				label={label}
				inputValue={searchInput}
				onInputChange={(value) => setSearchInput(value)}
				allowsCustomValue={true}
				scrollShadowProps={{
					isEnabled: false,
				}}
				items={data || []}>
				{(item) => (
					<AutocompleteItem
						key={item.route.id + item.stopPoint.id}
						textValue={item.route.name}
						href={linkToDetailsPage(item)}
						startContent={
							<BusLine
								busLine={item.route.line}
								className="w-10 mr-2"
							/>
						}
					>
						<div className="flex flex-col">
							<StopPointItem stopPoint={item.stopPoint}/>
							<RouteItem route={item.route}/>
						</div>
					</AutocompleteItem>
				)}
			</Autocomplete>
			<Spacer y={10} />
			<Accordion className="*:w-72 *:text-foreground-500 *:text-sm">
				<AccordionItem
					key="1"
					title="Pourquoi TBHess ?"
					subtitle={<span className="text-xs">Cliquez pour plus d'informations</span>}
					indicator={<span className="text-2xl text-primary">+</span>}>
					Cette application vous permet d'accéder à toutes les informations du réseau TBM, en mieux.
				</AccordionItem>
				<AccordionItem
					key="2"
					title="Comment ça marche ?"
					subtitle={<span className="text-xs">Cliquez pour plus d'informations</span>}
					indicator={<span className="text-2xl text-primary">+</span>}>
					Entrez le nom d'un arrêt de bus pour voir les prochains passages. C'est tout !
				</AccordionItem>
			</Accordion>
			<Spacer y={10} />
		</>
	);
}
