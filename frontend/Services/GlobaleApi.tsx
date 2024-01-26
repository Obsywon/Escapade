import axios from "axios"

const BASE_URL="https://maps.googleapis.com/maps/api/place/";
const API_KEY="AIzaSyAABNPGkjDak4g3bd2_BxB1SVo0omURGck";


const nearByPlace=(lat: number, lng: number, type: string, searchRadius: number) => {
    const response = axios.get(`${BASE_URL}nearbysearch/json?location=${lat},${lng}&radius=${searchRadius}&type=${type}&key=${API_KEY}`);

    return response;
}

export default {
    nearByPlace,
    API_KEY
};
