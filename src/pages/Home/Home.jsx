import {Outlet} from "react-router-dom";

import Categories from "../../components/Categories";

import "./styles.scss";

const Home = () => {
    return <>
        <Categories/>
        <Outlet/>
    </>;
}

export default Home;
