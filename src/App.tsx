/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { TrustBadges } from './components/TrustBadges';
import { CategoryTiles } from './components/CategoryTiles';
import { FeaturedCollection } from './components/FeaturedCollection';
import { BrandStoryBanner } from './components/BrandStoryBanner';
import { NotesFamilySection } from './components/NotesFamilySection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { CollectionPage } from './components/CollectionPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';
import { AccountPage } from './components/AccountPage';
import { AdminPage } from './components/AdminPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { 
  FAQPage, 
  ShippingPolicyPage, 
  ReturnPolicyPage, 
  PrivacyPolicyPage, 
  TermsPage, 
  OrderTrackingPage, 
  WishlistPage, 
  NotFoundPage 
} from './components/PolicyAndInfoPages';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { AuthModal } from './components/AuthModal';
import { ExclusiveBundlesBanner } from './components/ExclusiveBundlesBanner';
import { ShopByGenderSection } from './components/ShopByGenderSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { MobileDrawer } from './components/MobileDrawer';
import { OlfactoryFamily } from './types';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const MainApp: React.FC = () => {
  const { toast } = useApp();

  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [routeParams, setRouteParams] = useState<Record<string, any>>({});
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute, routeParams]);

  const handleNavigate = (route: string, params: Record<string, any> = {}) => {
    if (route === 'mobile-menu') {
      setIsMobileNavOpen(true);
      return;
    }
    setCurrentRoute(route);
    setRouteParams(params);
  };

  const handleNavigateToProduct = (slug: string) => {
    setCurrentRoute('product');
    setRouteParams({ slug });
  };

  const handleOrderCompleted = (orderNumber: string) => {
    setCurrentRoute('order-confirmation');
    setRouteParams({ orderId: orderNumber });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFA] text-[#0A2328]">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in flex items-center gap-2.5 px-4 py-3 rounded shadow-xl text-xs font-semibold tracking-wide border bg-[#07262C] text-white border-[#10404B]">
          {toast.type === 'success' && <CheckCircle2 size={16} className="text-[#4CAF50]" />}
          {toast.type === 'error' && <AlertCircle size={16} className="text-[#FF5252]" />}
          {toast.type === 'info' && <Info size={16} className="text-[#22D3EE]" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Announcement Bar */}
      <AnnouncementBar onNavigate={handleNavigate} />

      {/* Main Luxury Header */}
      <Navbar 
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Page Routing */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <div>
            <HeroSlider onNavigate={handleNavigate} />
            <TrustBadges />
            <CategoryTiles onNavigate={handleNavigate} />
            <FeaturedCollection 
              onNavigateToProduct={handleNavigateToProduct}
              onNavigateToCollection={(filter) => handleNavigate('collection', filter)}
            />
            <ExclusiveBundlesBanner onNavigateToCollection={() => handleNavigate('collection', { classification: 'Bundles' })} />
            <ShopByGenderSection onSelectGender={(gender) => handleNavigate('collection', { gender })} />
            <WhyChooseUs />
            <CustomerReviewsSection />
            <NewsletterSection />
          </div>
        )}

        {currentRoute === 'collection' && (
          <CollectionPage
            initialFilter={routeParams}
            onNavigateToProduct={handleNavigateToProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'product' && (
          <ProductDetailPage
            slug={routeParams.slug || 'fearless-prince'}
            onNavigateToProduct={handleNavigateToProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'cart' && (
          <CartPage onNavigate={handleNavigate} />
        )}

        {currentRoute === 'checkout' && (
          <CheckoutPage 
            onOrderCompleted={handleOrderCompleted}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'order-confirmation' && (
          <OrderConfirmationPage
            orderId={routeParams.orderId}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'account' && (
          <AccountPage
            onNavigate={handleNavigate}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {currentRoute === 'admin' && (
          <AdminPage onNavigate={handleNavigate} />
        )}

        {currentRoute === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentRoute === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}

        {currentRoute === 'faq' && (
          <FAQPage onNavigate={handleNavigate} />
        )}

        {currentRoute === 'shipping-policy' && (
          <ShippingPolicyPage onNavigate={handleNavigate} />
        )}

        {(currentRoute === 'return-policy' || currentRoute === 'exchange-policy') && (
          <ReturnPolicyPage onNavigate={handleNavigate} />
        )}

        {currentRoute === 'privacy-policy' && (
          <PrivacyPolicyPage onNavigate={handleNavigate} />
        )}

        {(currentRoute === 'terms-and-conditions' || currentRoute === 'terms') && (
          <TermsPage onNavigate={handleNavigate} />
        )}

        {(currentRoute === 'tracking' || currentRoute === 'track-order') && (
          <OrderTrackingPage onNavigate={handleNavigate} />
        )}

        {currentRoute === 'wishlist' && (
          <WishlistPage 
            onNavigate={handleNavigate} 
            onNavigateToProduct={handleNavigateToProduct}
          />
        )}

        {![
          'home', 
          'collection', 
          'product', 
          'cart', 
          'checkout', 
          'order-confirmation', 
          'account', 
          'admin', 
          'about', 
          'contact', 
          'faq', 
          'shipping-policy', 
          'return-policy', 
          'exchange-policy', 
          'privacy-policy', 
          'terms-and-conditions', 
          'terms', 
          'tracking', 
          'track-order', 
          'wishlist'
        ].includes(currentRoute) && (
          <NotFoundPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Drawers & Modals */}
      <CartDrawer onNavigate={handleNavigate} />
      <SearchModal 
        onSelectProduct={handleNavigateToProduct}
        onNavigateToCollection={(search) => handleNavigate('collection', { search })}
      />
      <QuickViewModal 
        onNavigateToProduct={handleNavigateToProduct}
        onNavigateToCheckout={() => handleNavigate('checkout')}
      />
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onNavigateToAdmin={() => handleNavigate('admin')}
      />
      <MobileDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onNavigate={handleNavigate}
        onOpenAuth={() => {
          setIsMobileNavOpen(false);
          setIsAuthModalOpen(true);
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
