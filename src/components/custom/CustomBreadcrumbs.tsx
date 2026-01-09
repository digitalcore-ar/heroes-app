import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "react-router"

interface Props {
    currentPage: string;
    breadcrumbs?: BreadcrumbProps[];
}

interface BreadcrumbProps {
    label: string;
    to: string;
}

export const CustomBreadcrumbs = ({ currentPage, breadcrumbs = [] }: Props) => {

    return (
        <Breadcrumb className="my-5">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                {
                    breadcrumbs.map((breadcrumb) => (
                        <>
                            <BreadcrumbItem key={breadcrumb.to}>
                                <BreadcrumbLink asChild>
                                    <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </>
                    ))
                }

                <BreadcrumbItem>
                    <BreadcrumbLink className="text-black">{currentPage}</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}