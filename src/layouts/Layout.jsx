import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Map from '../components/Map';
import WebDesignKeywords from '../components/SEO/WebDesignKeywords';
import SalesforceKeywords from '../components/SEO/SalesforceKeywords';
import ChatWidget from '../components/ChatWidget/ChatWidget';
import MobileStickyBar from '../components/MobileStickyBar/MobileStickyBar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Header />
      <main>
        <Outlet />
      </main>
      <WebDesignKeywords />
      <SalesforceKeywords />
      <Map />
      <Footer />
      <ChatWidget />
      <MobileStickyBar />
    </div>
  )
}

export default Layout
