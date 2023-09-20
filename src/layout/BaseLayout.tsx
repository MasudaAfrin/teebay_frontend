import { Outlet } from 'react-router-dom';
import { TfiMoreAlt } from 'react-icons/tfi';

function BaseLayout() {
    return (
        <div className='h-screen'>
            <nav className='bg-[#9eadba] shadow p-2 rounded-t-sm'>
                <div className='pl-2'>
                  <TfiMoreAlt className='' style={{fontSize: '2.5rem', color: '8f9eac'}}/>
                </div>
            </nav>

            <main className='container mx-auto h-auto 2xl:h-4/5 flex items-center'>
                <Outlet />
            </main>

            <footer className='bg-[#9eadba] sahdow py-2 mt-0 lg:mt-6 2xl:mt-24 '>
                <p className='px-3 italic font-medium text-neutral-50'>teebay</p>
            </footer>
        </div>
    )
}

export default BaseLayout;
