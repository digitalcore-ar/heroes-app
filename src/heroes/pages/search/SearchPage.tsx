import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroeStats } from "@/heroes/components/HeroeStats"
import { SearchControls } from "./ui/SearchControls"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"
import { useQuery } from "@tanstack/react-query"
import { searchHeroesAction } from "@/heroes/actions/search-heros.action"
import { useSearchParams } from "react-router"
import { HeroeGrid } from "@/heroes/components/HeroeGrid"

export const SearchPage = () => {

    const [searchParams] = useSearchParams();
    const name = searchParams.get('name') ?? '';
    const strength = searchParams.get('strength') || '0';

    const { data = [] } = useQuery({
        queryKey: ['searchHeroes', { name, strength }],
        queryFn: () => searchHeroesAction({ name, strength }),
        staleTime: 1000 * 60 * 5,
    })
    return (
        <>
            <CustomJumbotron
                title="Search Superheroes"
                description="Find your favorite superheroes and villains" />
            <CustomBreadcrumbs currentPage="Search" />
            <HeroeStats />
            <SearchControls />

            <HeroeGrid heroes={data} />
        </>
    )
}