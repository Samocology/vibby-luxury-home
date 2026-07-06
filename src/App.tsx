import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Invest from "./pages/Invest";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminProperties from "./pages/admin/Properties";
import AdminAddProperty from "./pages/admin/AddProperty";
import AdminInquiries from "./pages/admin/Inquiries";
import AdminCampaigns from "./pages/admin/Campaigns";
import AdminSettings from "./pages/admin/Settings";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/properties" element={<AdminProperties />} />
        <Route path="/admin/properties/new" element={<AdminAddProperty />} />
        <Route path="/admin/inquiries" element={<AdminInquiries />} />
        <Route path="/admin/campaigns" element={<AdminCampaigns />} />
        <Route path="/admin/settings" element={<AdminSettings />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  );
}
