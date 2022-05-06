import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import TaskHistory from './pages/history/TaskHistory';
import NotFound from './pages/page404/NotFound';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import User from './pages/user/User';
import LiveTracking from './pages/live-tracking/LiveTracking';
import AccountSettings from './pages/account-settings/AccountSettings';

function AuthGuard({
    isAuthenticated,
    component,
}: {
    isAuthenticated: boolean;
    component: JSX.Element;
}) {
    return isAuthenticated ? component : <Navigate to="/signin" />;
}

function AdminOrManagerGuard({
    isAuthenticated,
    isAdminOrManager,
    component,
}: {
    isAuthenticated: boolean;
    isAdminOrManager: boolean;
    component: JSX.Element;
}) {
    return isAuthenticated && isAdminOrManager ? (
        component
    ) : (
        <Navigate to="/" />
    );
}

export default function RoutesHandler() {
    const { isAuthenticated, isAdmin, isManager } = useAuth();
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AuthGuard
                        component={<TaskHistory />}
                        isAuthenticated={isAuthenticated}
                    />
                }
            />
            <Route
                path="/tracking"
                element={
                    <AuthGuard
                        component={<LiveTracking />}
                        isAuthenticated={isAuthenticated}
                    />
                }
            />
            <Route
                path="/settings"
                element={
                    <AuthGuard
                        component={<AccountSettings />}
                        isAuthenticated={isAuthenticated}
                    />
                }
            />
            <Route
                path="users"
                element={
                    <AdminOrManagerGuard
                        component={<User />}
                        isAuthenticated={isAuthenticated}
                        isAdminOrManager={isAdmin || isManager}
                    />
                }
            />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
