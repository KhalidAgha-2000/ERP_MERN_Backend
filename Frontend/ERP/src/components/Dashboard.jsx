import { Outlet } from "react-router-dom";
import SideBar from "./Shared/SideBar";
import Header from "./Shared/Header";
function Dashboard(props) {

    return (
        <div className='dashboard'>
            <SideBar />
            <div className='dashboard-body'>
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard