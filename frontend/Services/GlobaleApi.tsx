import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_GOOGLE_BASE_URL;
export const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;


async function nearByPlace (lat: number, lng: number, type: string, searchRadius: number) : Promise<google.maps.Map>
 {
    const response = axios.get<any, google.maps.Map>(`${BASE_URL}nearbysearch/json?location=${lat},${lng}&radius=${searchRadius}&type=${type}&key=${API_KEY}`);
    //console.log(`${BASE_URL}nearbysearch/json?location=${lat},${lng}&radius=${searchRadius}&type=${type}&key=${API_KEY}`);
    return response;
}

export default nearByPlace;