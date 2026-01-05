import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { SearchPage } from "@/heroes/pages/search/SearchPage";
import { createBrowserRouter } from "react-router";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/search",
        element: <SearchPage />,
    },
    {
        path: "/hero/:id",
        element: <HeroPage />,
    },
    {
        path: "/admin",
        element: <AdminPage />,
    },
])