import { heroApi } from "../api/hero.api"
import type { Hero } from "../types/hero.interface";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroAction = async (id: string) => {
    console.log(id)
    const { data } = await heroApi.get<Hero>(`/${id}`);
    return {
        ...data,
        image: `${BASE_URL}/images/${data.image}`
    }
}