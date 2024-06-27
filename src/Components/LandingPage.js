import React, { useState } from 'react';
import Header from '../LandingPage-Components/Header';
import MainSection from '../LandingPage-Components/MainSection';
import Features from '../LandingPage-Components/Features';
import ImageSection from '../LandingPage-Components/ImageSection';
import Footer from '../LandingPage-Components/Footer';
import bgImg from '../Images/Page_bg.png';
import Contribute from '../ContributeSection/ContributeSection';
import './LandingPage.css'

function LandingPage({ onLogin }) {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
        onLogin(userData);
    };

    return (
        <div className='lp'>
            <Header user={user} />
            <div className="content-container">
                <MainSection onLogin={handleLogin} />
                <Features />
                <ImageSection />
                <div id="contribute">
                    <Contribute />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LandingPage;
