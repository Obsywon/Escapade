export interface Place {
    // Définir les propriétésd'une place
    name: string;
    address: string;
    vicinity: string;
    rating: number;
    photos?: { photo_reference: string }[];
  }