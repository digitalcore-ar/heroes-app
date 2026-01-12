import { createContext, use, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
    //state
    favorites: Hero[];
    favoriteCount: number;
    //methods
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;
}

export const FavoriteHeroContext = createContext<FavoriteHeroContext>({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}


// provider

export const FavouriteHeroProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage())

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const toogleFavorite = (hero: Hero) => {
        const heroExist = favorites.find(h => h.id === hero.id)
        if (heroExist) {
            setFavorites(favorites.filter(h => h.id !== hero.id))
            return;
        }
        setFavorites([...favorites, hero])
    }

    return (
        <FavoriteHeroContext value={{
            //State
            favorites: favorites,
            favoriteCount: favorites.length,
            //methods
            isFavorite: (hero: Hero) => favorites.some(h => h.id === hero.id),
            toggleFavorite: toogleFavorite
        }}>
            {children}
        </FavoriteHeroContext>
    )
}