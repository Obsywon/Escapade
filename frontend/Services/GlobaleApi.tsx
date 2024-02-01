import axios from "axios";
import env from "../env";

const BASE_URL = env.GOOGLE_BASE_URL;
export const API_KEY = env.GOOGLE_API_KEY;


const nearByPlace = (lat: number, lng: number, type: string, searchRadius: number) => {
    const response = axios.get<any, google.maps.Map>(`${BASE_URL}nearbysearch/json?location=${lat},${lng}&radius=${searchRadius}&type=${type}&key=${API_KEY}`);
    console.log(`${BASE_URL}nearbysearch/json?location=${lat},${lng}&radius=${searchRadius}&type=${type}&key=${API_KEY}`);
    return response;
}

export default nearByPlace;