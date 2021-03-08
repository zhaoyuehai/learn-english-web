import axios from "axios";

export const musicBanners = () => axios.get('http://101.201.148.180:3000/banner')
export const musicPersonalized = () => axios.get('http://101.201.148.180:3000/personalized')
