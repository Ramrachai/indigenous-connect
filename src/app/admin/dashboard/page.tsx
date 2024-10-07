import TopCards from './components/TopCards';
import VisitChart from './components/VisitChart';
import CountryVisitChart from './components/CountryChart';

export default async function AdminDashboard() {
    return (
        <div>
            <TopCards />
            <div className='flex justify-between gap-6 mt-6'>
                <VisitChart />
                <CountryVisitChart />
            </div>
        </div>
    )
}