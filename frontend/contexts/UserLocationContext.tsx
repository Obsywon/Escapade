import { createContext, Dispatch, SetStateAction } from 'react';
import { LocationObject } from 'expo-location';

export interface UserLocationContextType {
    location: LocationObject | null;
    setLocation: Dispatch<SetStateAction<LocationObject | null>>;
}

export const UserLocationContext = createContext<UserLocationContextType>({
    location: null,
    setLocation: () => { },
});
