import type { Hero } from "../types/hero.interface"
import { HeroeGridCard } from "./HeroeGridCard"

interface Props {
    heroes?: Hero[];
}

export const HeroeGrid = ({ heroes = [] }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Hero Card 1 - Superman */}
            {/* <HeroeGridCard isActive={false} /> */}
            {
                heroes.map((hero) => (
                    <HeroeGridCard key={hero.id} hero={hero} />
                ))
            }
        </div>
    )
}