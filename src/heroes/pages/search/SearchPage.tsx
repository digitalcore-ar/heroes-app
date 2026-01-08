import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroeStats } from "@/heroes/components/HeroeStats"
import { SearchControls } from "./ui/SearchControls"

export const SearchPage = () => {
    return (
        <>
            <CustomJumbotron
                title="Search Superheroes"
                description="Find your favorite superheroes and villains" />
            <HeroeStats />

            <SearchControls />
        </>
    )
}