import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useBusRoutes } from "@hooks/use-bus-routes";
import { Route } from "./route-item";
import { BusLine } from "./bus-line";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export function SearchBar() {

	const [searchInput, setSearchInput] = useState("");
	const debouncedSearchInput = useDebounce(searchInput, 1000);
	const { status, data } = useBusRoutes(debouncedSearchInput);

	return (
		<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
			<Autocomplete
				size="sm"
				className="rounded-lg"
				isLoading={status === "pending"}
				label="Search for a bus stop" 
				inputValue={searchInput}
				onInputChange={(value) => setSearchInput(value)}
				allowsCustomValue={true}
				scrollShadowProps={{
					isEnabled: false
				}}
				items={data || []}>
				{(item) => (
					<AutocompleteItem key={item.route.id+item.stopPoint.id} textValue={item.route.name} startContent={<BusLine busLine={item.route.line} className="w-10 mr-2"/>}>
						<Route route={item.route} stopPoint={item.stopPoint} />
					</AutocompleteItem>
				)}
			</Autocomplete>
		</div>
	);
}
