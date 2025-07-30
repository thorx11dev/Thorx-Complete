import { Router, Route, Switch } from 'wouter';
import AuthProvider from './components/AuthProvider';
import { TeamAuthProvider } from './components/TeamAuthProvider';
import ThemeProvider from './components/ThemeProvider';
import ProtectedRoute from './components/ProtectedRoute';

import TeamProtectedRoute from './components/TeamProtectedRoute';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard_Simple';
import EarningsInterface from './pages/EarningsInterface';
import WorkPortal from './pages/WorkPortal';
import PayoutSystem from './pages/PayoutSystem';
import SettingsHub from './pages/SettingsHub';

import FeaturesPage from './pages/FeaturesPage';
import UpdatesPage from './pages/UpdatesPage';
import HelpCenterPage from './pages/HelpCenterPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

import Navbar from './components/Navbar';
import TeamLoginPage from './pages/TeamLoginPage';
import TeamDashboard from './pages/TeamDashboard';
import UserCarePage from './pages/UserCarePage';
import InboxPage from './pages/InboxPage';
import LinkagePage from './pages/LinkagePage';
import TeamHubPage from './pages/TeamHubPage';
import DigitalMarketPage from './pages/DigitalMarketPage';
import AccountStatusPage from './pages/AccountStatusPage';
import BannedUserPage from './pages/BannedUserPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TeamAuthProvider>
          <Router>
            <div className="min-h-screen bg-slate-900 dark:bg-slate-900 font-cosmic transition-all duration-300">
              <Switch>
                <Route path="/" component={LandingPage} />
                <Route path="/auth" component={AuthPage} />
                <Route path="/account-status" component={AccountStatusPage} />
                <Route path="/banned">
                  <BannedUserPage />
                </Route>
                <Route path="/login" component={AuthPage} />
                <Route path="/register" component={AuthPage} />



                {/* Team Routes */}
                <Route path="/team/login" component={TeamLoginPage} />
                <Route path="/team/dashboard">
                  <TeamProtectedRoute>
                    <TeamDashboard />
                  </TeamProtectedRoute>
                </Route>
                <Route path="/team/users">
                  <TeamProtectedRoute>
                    <UserCarePage />
                  </TeamProtectedRoute>
                </Route>
                <Route path="/team/inbox">
                  <TeamProtectedRoute>
                    <InboxPage />
                  </TeamProtectedRoute>
                </Route>
                <Route path="/team/chat">
                  <TeamProtectedRoute>
                    <LinkagePage />
                  </TeamProtectedRoute>
                </Route>
                <Route path="/team/hub">
                  <TeamProtectedRoute>
                    <TeamHubPage />
                  </TeamProtectedRoute>
                </Route>
                <Route path="/team/market">
                  <TeamProtectedRoute>
                    <DigitalMarketPage />
                  </TeamProtectedRoute>
                </Route>

                {/* Regular User Routes */}
                <Route path="/dashboard">
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <Dashboard />
                    </>
                  </ProtectedRoute>
                </Route>
                <Route path="/earnings">
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <EarningsInterface />
                    </>
                  </ProtectedRoute>
                </Route>
                <Route path="/work">
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <WorkPortal />
                    </>
                  </ProtectedRoute>
                </Route>
                <Route path="/payout">
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <PayoutSystem />
                    </>
                  </ProtectedRoute>
                </Route>
                <Route path="/settings">
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <SettingsHub />
                    </>
                  </ProtectedRoute>
                </Route>

                <Route path="/features" component={FeaturesPage} />
                <Route path="/updates" component={UpdatesPage} />
                <Route path="/help" component={HelpCenterPage} />
                <Route path="/contact" component={ContactPage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/blog" component={BlogPage} />
                <Route path="/blog/:id" component={BlogPostPage} />
              </Switch>
            </div>
          </Router>
        </TeamAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;