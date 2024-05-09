import { Spacer, Spinner } from "@nextui-org/react";

export function Loader() {
    return (
        <div className="min-h-screen w-full bg-white flex flex-col justify-center items-center z-10">
            <Spinner size="lg" classNames={
                {
                    circle1: "border-b-text",
                    circle2: "border-b-text",
                }
            }/>
            <Spacer y={5} />
            <p>Chargement en cours</p>
        </div>
    );
}