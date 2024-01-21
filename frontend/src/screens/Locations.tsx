export interface Location {
    name: string;
    discovered: boolean;
    backgroundImage: string;
}

export const LOCATIONS: Array<Location> = [
    { name: "Location A", discovered: true, backgroundImage: "../location-1.png" },
    { name: "Location B", discovered: true, backgroundImage: "" },
    { name: "Location C", discovered: false, backgroundImage: "" },
];
