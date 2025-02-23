import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp.jsx';
import AboutUs from './components/AboutUs.jsx';
import Index from './components/Index.jsx'
import CreateBucket from "./components/CreateBucket.jsx";
import CreateCard from "./components/CreateCard.jsx";
import DeleteCard from "./components/DeleteCard.jsx";
import UpdateCard from "./components/UpdateCard.jsx";
import GetCardByName from "./components/GetCardByName.jsx"
import { StrictMode } from 'react';

function App() {
    return (
        <Router>
            <StrictMode>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/sign-up" element={<AboutUs />} />

                    <Route path="/" element={<AboutUs />} />
                    <Route path="/create_bucket" element={<CreateBucket />} />
                    <Route path="/create_card" element={<CreateCard />} />
                    <Route path="/get_card_by_name" element={<GetCardByName />} />
                    <Route path="/delete_card" element={<DeleteCard />} />
                    <Route path="/update_card" element={<UpdateCard />} />
                </Routes>
            </StrictMode>
        </Router>
    );
}

export default App;