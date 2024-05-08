import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarMenuToggle,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Icons } from "./icons";
import { useState } from "react";



export function TBMNavbar() {

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<Navbar
			className="h-24 flex-grow bg-color-none z-0 absolute"
			maxWidth="full"
			isBlurred={false}>
			<NavbarContent>
				<NavbarBrand>
					<img src="logo_tbhess.png" className="h-20" />
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent justify="center" className="mr-4">
				<Dropdown isOpen={isMenuOpen} onOpenChange={setIsMenuOpen}>
					<DropdownTrigger>
						<NavbarMenuToggle isDisabled={false} className="h-8" data-open={isMenuOpen} aria-label={isMenuOpen ? "Close menu" : "Open menu"}/>
					</DropdownTrigger>
					<DropdownMenu aria-label="menu-dropdown" itemClasses={{
						base: "gap-4",
					}}>
						<DropdownItem 
							textValue="users"
							startContent={<Icons.usersList />}
							description="Consulter la liste des utilisateurs"
							>
							<Link to="/tbm/profiles/">
								Utilisateurs
							</Link>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</NavbarContent>
		</Navbar>
	);
}
