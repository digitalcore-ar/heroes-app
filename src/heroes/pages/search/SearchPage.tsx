import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroeStats } from "@/heroes/components/HeroeStats"

export const SearchPage = () => {
    return (
        <>
            <CustomJumbotron
                title="Search Superheroes"
                description="Find your favorite superheroes and villains" />
            <HeroeStats />
        </>
    )
}