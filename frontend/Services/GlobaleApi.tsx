import axios from "axios"

const BASE_URL="https://maps.googleapis.com/maps/api/place/";
const API_KEY="AIzaSyAABNPGkjDak4g3bd2_BxB1SVo0omURGck";


const nearByPlace=(lat: number, lng: number, type: string)=>
// axios.get(`${BASE_URL}nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&key=${API_KEY}`);
axios.get(`${BASE_URL}nearbysearch/json?location=${lat},${lng}&radius=1500&type=${type}&key=${API_KEY}`);

export default {
    nearByPlace,
    API_KEY
    
};
