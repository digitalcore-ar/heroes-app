import { createBrowserRouter } from "react-router";
import { AdminLayout } from "@/admin/layout/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/heroes/layout/HeroesLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { lazy } from "react";
// import { SearchPage } from "@/heroes/pages/search/SearchPage";

const SearchPage = lazy(() => import("@/heroes/pages/search/SearchPage").then((module) => ({ default: module.SearchPage })));

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <HeroesLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "search",
                element: <SearchPage />,
            },
            {
                path: "heroes/:id",
                element: <HeroPage />,
            },
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />
            },
        ]
    },
])