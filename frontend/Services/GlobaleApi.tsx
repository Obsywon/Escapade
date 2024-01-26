import axios, { AxiosResponse } from "axios";
import env from "../env";

const BASE_URL = env.GOOGLE_BASE_URL;
export const API_KEY = env.GOOGLE_API_KEY;

export type GlobaleApiType = {
  nearByPlace: (lat: number, lng: number, type: string) => Promise<AxiosResponse<any, any>>;
};

export default function GlobaleApi(): GlobaleApiType {
  async function nearByPlace (lat: number, lng: number, type: string){
    return await axios.get(
      `${BASE_URL}nearbysearch/json?location=${lat},${lng}&radius=1500&type=${type}&key=${API_KEY}`
    );
  };

  return {
    nearByPlace,
  };
}
