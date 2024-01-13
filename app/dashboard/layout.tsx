import SideNav from "../ui/dashboard/sidenav";

export default function Layout({children}:{children:React.ReactNode}) {
    return (
        <div className="flex-col flex md:flex-row h-screen mx-auto">
            <div className="w-64"> <SideNav/></div>
            <div className=" p-4 w-full">{children}</div>
        </div>
    )
}