export enum TransportationMode {
  PLACEHOLDER = "",
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
  { value: TransportationMode.PLACEHOLDER, text: "Sélectionnez un mode de transport" },
  { value: TransportationMode.WALKING, text: "A pied" },
  { value: TransportationMode.DRIVING, text: "En voiture" },
  { value: TransportationMode.BICYCLING, text: "A vélo" },
  { value: TransportationMode.TRANSIT, text: "Transports en commun" },
];
