
import './App.css';

import {BrowserRouter as Routers, Routes, Route} from "react-router-dom";

import Navigation from './components/Navigation';
import ExploreScreen from './screens/ExploreScreen';
import UserRegister from './screens/UserRegister';
import UserLogin from './screens/UserLogin';
import AuctionItem from './screens/AuctionItem';
import NewAuction from './screens/NewAuction';


function App() {

  return (
    <Routers>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<ExploreScreen />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/auction/:id" element={<AuctionItem />} />
          <Route path="/auction/new" element={<NewAuction />} />

        </Route>
      </Routes>
    </Routers>
  );
}

export default App;
