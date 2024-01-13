import { Suspense } from "react";
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from "../lib/data"
import { Revenue } from "../lib/definitions";
import {Card} from "../ui/dashboard/cards"
import LatestInvoices from "../ui/dashboard/latest-invoices"
import RevenueChart from "../ui/dashboard/revenue-chart"
import DashboardSkeleton, { RevenueChartSkeleton } from "../ui/skeletons";

export default async function Dashboard(){
    const lastestInvoices = await fetchLatestInvoices();
    const {
        numberOfCustomers,
        numberOfInvoices,
        totalPaidInvoices,
        totalPendingInvoices,
    } = await fetchCardData();

    const revenue : Revenue[] = await fetchRevenue()

    return <div className="w-full max-w-screen-2xl mx-auto ">
        Dashboard
        <Suspense fallback={<DashboardSkeleton/>}>
        <div className="gap-6 grid grid-cols-4 p-4">
           
            <Card title="Collected" value={totalPaidInvoices} type="collected"/>
            <Card title="Pending" value={totalPendingInvoices} type="pending"/>
            <Card title="Total Invoices" value={numberOfInvoices} type="invoices"/>
            <Card title="Total Customer" value={numberOfCustomers} type="customers"/>
        </div>
        </Suspense>
        <div className="flex w-screen mx-auto p-2">
        <Suspense fallback={<RevenueChartSkeleton/>}>
        <div className="w-1/2"><RevenueChart revenue={revenue}/></div>
        </Suspense>
        <Suspense fallback={<RevenueChartSkeleton/>}>
        <div className="w-1/2"><LatestInvoices lastestInvoices = {lastestInvoices}/></div>
        </Suspense>
        </div>
    </div>
}