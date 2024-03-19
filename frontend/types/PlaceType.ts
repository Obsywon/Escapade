export interface Place {
    // Définir les propriétés d'une place
    name: string;
    address: string;
    vicinity: string;
    rating: number;
    photos?: { photo_reference: string }[];
  }