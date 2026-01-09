import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroeStats } from "@/heroes/components/HeroeStats"
import { SearchControls } from "./ui/SearchControls"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"

export const SearchPage = () => {
    return (
        <>
            <CustomJumbotron
                title="Search Superheroes"
                description="Find your favorite superheroes and villains" />
            <CustomBreadcrumbs currentPage="Search"/>
            <HeroeStats />
            <SearchControls />
        </>
    )
}