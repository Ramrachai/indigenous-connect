import TopCards from './components/TopCards';
import VisitChart from './components/VisitChart';
import CountryVisitChart from './components/CountryChart';

export default async function AdminDashboard() {
    return (
        <div>
            <TopCards />
            <div className='flex flex-col md:flex-row justify-between gap-4 md:gap-6 mt-6'>
                <VisitChart />
                <CountryVisitChart />
            </div>
        </div>
    )
}