import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation/MainNavigation';
import BreakpointIndicator from '../layout/BreakpointIndicator/BreakpointIndicator';

const RootLayout = ({ routerConfig }) => {
    return (
        <>
            <BreakpointIndicator breakpoint="mobile"/>
            <MainNavigation routerConfig={routerConfig} />
            <main>
                <Outlet />
            </main>
        </>
        
    )

}

export default RootLayout;