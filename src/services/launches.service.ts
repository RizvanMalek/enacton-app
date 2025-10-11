import AxiosInstance from "../configs/axios";
import { getLaunchByIdAPI, getLaunchesDataAPI } from "../apis/launches.api";
import { toast } from "react-toastify";

const getLaunchesDataService = async (params: object) => {
    try {
        const response = await AxiosInstance(getLaunchesDataAPI(params))
        return response;
    } catch (error) {
        toast.error("Something went wrong, Try again later!")
    }
};

const getLaunchByIdService = async (flight_number: string | number) => {
  try {
    const response = await AxiosInstance(getLaunchByIdAPI(flight_number));
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch launch details.");
    return null;
  }
};

export {
    getLaunchesDataService,
    getLaunchByIdService
}