import { History, LucideIcon, SearchIcon, Users } from "lucide-react";

export type Icon = LucideIcon;

export const Icons: Record<string, Icon> = {
	search: SearchIcon,
	version: History,
	usersList: Users,
};
