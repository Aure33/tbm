import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/css/index.css";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./components/home";
import { TBMOutlet } from "./components/tbm-outlet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
	{
		path: "/",
		element: <TBMOutlet />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/profile/:profile",
				// element: <ProfileInfo />,
			},
			{
				path: "/profiles/",
				// element: <ListeUser />,
			},
			{
				path: "/voir-horaires/",
				// element: <BusScreen />,
			},
		],
	},
]);

const queryClient = new QueryClient();

const rootElement: HTMLElement | null = document.getElementById(
	"root"
) as HTMLElement;

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<NextUIProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</NextUIProvider>
	</React.StrictMode>
);
