import {
    Heart
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroeStats } from "@/heroes/components/HeroeStats"
import { HeroeGrid } from "@/heroes/components/HeroeGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import { useMemo } from "react"
import { useHeroSumary } from "@/heroes/hooks/useHeroSumarry"


// type TabsValue = "all" | "favorites" | "heroes" | "villains"

export const HomePage = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const activeTab = searchParams.get('tab') ?? 'all';
    //obtengo de la url la pagina, para luego en tanstack hacer que se realice la peticion si este cambia
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '6';
    const category = searchParams.get('category') ?? 'all';

    //por si el la ruta es modificada mal, siempre haya un tab predeterminado
    const selectedTab = useMemo(() => {
        const validTabs = ["all", "favorites", "heroes", "villains"]
        return validTabs.includes(activeTab) ? activeTab : 'all';
    }, [activeTab])

    // const [activeTab, setActiveTab] = useState<TabsValue>("all")

    const { data: heroesResponse } = useQuery({
        //queryKey: ["heroes", "page", page] // otro ejemplo cuando los argumentos de la funcion a llamar son posicionales
        queryKey: ["heroes", { page, limit, category }],
        queryFn: () => getHeroesByPageAction(+page, +limit, category),
        staleTime: 1000 * 60 * 5, // 5 minutos
    })

    const { data: summary } = useHeroSumary();

    return (
        <>
            <>
                <CustomJumbotron
                    title="Superhero Universe"
                    description="Discover, explore, and manage your favorite superheroes and villains" />
                {/* Stats Dashboard */}
                <CustomBreadcrumbs currentPage="Superheroes" />

                <HeroeStats />


                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all"
                            //preserva el valor anterior del params, por si son 2 params o mas
                            onClick={() => setSearchParams((prev) => {
                                prev.set('tab', 'all')
                                prev.set('category', 'all')
                                return prev
                            })}
                        >All Characters {`(${summary?.totalHeroes})`}</TabsTrigger>
                        <TabsTrigger value="favorites" className="flex items-center gap-2" onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'favorites')
                            return prev
                        })}>
                            <Heart className="h-4 w-4" />
                            Favorites (3)
                        </TabsTrigger>
                        <TabsTrigger value="heroes" onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'heroes')
                            prev.set('category', 'hero')
                            prev.set('page', '1')
                            return prev
                        })}>Heroes {`(${summary?.heroCount})`}</TabsTrigger>
                        <TabsTrigger value="villains" onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'villains')
                            prev.set('category', 'villain')
                            prev.set('page', '1')
                            return prev
                        })}>Villains {`(${summary?.villainCount})`}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        {/* Mostrar todos los personajes */}
                        <HeroeGrid heroes={heroesResponse?.heroes || []} />
                    </TabsContent>

                    <TabsContent value="favorites">
                        {/* Mostrar favoritos */}
                        <h1>Contenido del tab favorites</h1>
                    </TabsContent>

                    <TabsContent value="heroes">
                        {/* Mostrar heroes */}
                        <HeroeGrid heroes={heroesResponse?.heroes || []} />
                    </TabsContent>

                    <TabsContent value="villains">
                        {/* Mostrar villanos */}
                        <HeroeGrid heroes={heroesResponse?.heroes || []} />
                    </TabsContent>
                </Tabs>

                {/* Character Grid */}
                {/* <HeroeGrid /> */}

                {/* Pagination */}
                <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
            </>
        </>
    )
}