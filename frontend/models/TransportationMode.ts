export enum TransportationMode {
  WALKING = "WALKING",
  DRIVING = "DRIVING",
  BICYCLING = "BICYCLING",
  TRANSIT = "TRANSIT",
}

export type TransportOption = {
  value: TransportationMode;
  text: string;
};

export const TransportOptions: TransportOption[] = [
  { value: TransportationMode.WALKING, text: "A pied" },
  { value: TransportationMode.DRIVING, text: "En voiture" },
  { value: TransportationMode.BICYCLING, text: "A vélo" },
  { value: TransportationMode.TRANSIT, text: "Transports en commun" },
];
