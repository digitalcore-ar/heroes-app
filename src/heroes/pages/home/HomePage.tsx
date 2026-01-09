import {
    Heart
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroeStats } from "@/heroes/components/HeroeStats"
import { HeroeGrid } from "@/heroes/components/HeroeGrid"
import { useState } from "react"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action"
import { useQuery } from "@tanstack/react-query"


type TabsValue = "all" | "favorites" | "heroes" | "villains"

export const HomePage = () => {

    const [activeTab, setActiveTab] = useState<TabsValue>("all")

    const { data: heroesResponse } = useQuery({
        queryKey: ["heroes"],
        queryFn: () => getHeroesByPageAction(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    })

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
                <Tabs value={activeTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all" onClick={() => setActiveTab("all")}>All Characters (16)</TabsTrigger>
                        <TabsTrigger value="favorites" className="flex items-center gap-2" onClick={() => setActiveTab("favorites")}>
                            <Heart className="h-4 w-4" />
                            Favorites (3)
                        </TabsTrigger>
                        <TabsTrigger value="heroes" onClick={() => setActiveTab("heroes")}>Heroes (12)</TabsTrigger>
                        <TabsTrigger value="villains" onClick={() => setActiveTab("villains")}>Villains (2)</TabsTrigger>
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
                        <h1>Contenido del tab heroes</h1>
                    </TabsContent>

                    <TabsContent value="villains">
                        {/* Mostrar villanos */}
                        <h1>Contenido del tab villains</h1>
                    </TabsContent>
                </Tabs>

                {/* Character Grid */}
                {/* <HeroeGrid /> */}

                {/* Pagination */}
                <CustomPagination totalPages={3} />
            </>
        </>
    )
}