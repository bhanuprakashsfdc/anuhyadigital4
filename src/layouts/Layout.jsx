import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Map from '../components/Map';
import WebDesignKeywords from '../components/SEO/WebDesignKeywords';
import SalesforceKeywords from '../components/SEO/SalesforceKeywords';
import ChatWidget from '../components/ChatWidget/ChatWidget';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Outlet />
      </main>
      <WebDesignKeywords />
      <SalesforceKeywords />
      <Map />
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default Layout
