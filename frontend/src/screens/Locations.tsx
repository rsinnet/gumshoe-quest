export interface Location {
    index: number;
    name: string;
    discovered: boolean;
    backgroundImage: string;
}

// TODO(RWS): Remove index and fix filtering.
export const LOCATIONS: Array<Location> = [
    { index: 0, name: "Evelyn Hart's Home Office", discovered: true, backgroundImage: "../location-1.png" },
    { index: 1, name: "Local Café", discovered: true, backgroundImage: "" },
    { index: 2, name: "Public Library", discovered: false, backgroundImage: "" },
    { index: 3, name: "Rival Author's Office", discovered: false, backgroundImage: "" },
    { index: 4, name: "Workspace of Evelyn's competitor", discovered: false, backgroundImage: "" },
    { index: 5, name: "Police Station", discovered: true, backgroundImage: "" },
    { index: 6, name: "Local Bookstore", discovered: false, backgroundImage: "" },
    { index: 7, name: "Assistant's Apartment", discovered: false, backgroundImage: "" },
    { index: 8, name: "Gardener's Shed", discovered: false, backgroundImage: "" },
    { index: 9, name: "Internet Café", discovered: false, backgroundImage: "" },
];
