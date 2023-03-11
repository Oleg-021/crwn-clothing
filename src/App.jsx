import {Routes, Route} from "react-router-dom";

import Home from "./rotes/Home";
import Navigation from "./rotes/Navigation";
import Authentication from "./rotes/Authentication";
import Shop from "./rotes/Shop";

import "./styles.scss";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path="shop" element={<Shop/>}/>
                <Route path="auth" element={<Authentication/>}/>
            </Route>
        </Routes>
    )
}

export default App;
