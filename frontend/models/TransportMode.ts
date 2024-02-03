export enum TransportMode {
    WALKING = "WALKING",
    DRIVING = "DRIVING",
    BICYCLING = "BICYCLING",
    TRANSIT = "TRANSIT",
};

export type TransportModeOption = {
    value: TransportMode,
    text: string,
}

export const transportOptions: TransportModeOption[] = [
    { value: TransportMode.WALKING, text: 'A pied' },
    { value: TransportMode.DRIVING, text: 'En voiture' },
    { value: TransportMode.BICYCLING, text: 'A vélo' },
    { value: TransportMode.TRANSIT, text: 'Transports en commun' }
]