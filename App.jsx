import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {AuthProvider} from './context/AuthContext';
import {useAuth} from './hooks/useAuth';

//auth pages
import {LoginDesktop} from './pages/auth/LoginDesktop';
import {LoginOptions} from './pages/auth/LoginOptions';
import {StudentLogin} from './pages/auth/StudentLogin';
import {SecurityLogin} from './pages/auth/SecurityLogin';
import {CreateAccount} from './pages/auth/CreateAccount';

//student pages
import {StudentDashboard} from './pages/student/StudentDashboard';
import {ReportIncident} from './pages/student/ReportIncident';
import {IncidentReported} from './pages/student/IncidentReported';
import {SafeRoute} from './pages/student/SafeRoute';

//security pages
import {SecurityDashboard} from './pages/security/SecurityDashboard';
import {IncidentList} from './pages/security/IncidentList';
import {Analytics} from './pages/security/Analytics';

const ProtectedRoute =({
    children, 
    role
}: {
    children: React.ReactNode;
    role: 'student' | 'security'
}) => {
    const {user} = useAuth();
    if(!user) return <Navigate to="/login" replace/>;
    if(user.role !== role) return <Navigate to={'/${user.role}'} replace/>;
    retrn <>{children}</>;
};

const AppRoutes = () => {
    return (
        <Routes>
            
            {/* Public Routes */}
            <Route path="/" element={<LoginDesktop />} />
            <Route path="/login" element={<LoginDesktop/>}/>
            <Route path="/login/options" element={<LoginOptions/>}/>
            <Route path="/login/student" element={<StudentLogin/>}/>
            <Route path="/login/security" element={<SecurityDesktop/>}/>
            <Route path="/register" element={<CreateAccount/>}/>


            {/* Student Routes */}
            <Route path="/student" element={
                <ProtectedRoute role="student">
                    <StudentDashboard/>
                </ProtectedRoute>
            }/>
            <Route path="/student/report" element={
                <ProtectedRoute role="student">
                    <ReportIncident/>
                </ProtectedRoute>
            }/>
            <Route path="/student/reported" element={
                <ProtectedRoute role="student">
                    <IncidentReported/>
                </ProtectedRoute>
            }/>
            <Route path="/student/safe-route" element={
                <ProtectedRoute role="student">
                    <SafeRoute/>
                </ProtectedRoute>
            }/>



            {/* Security Routes */}
            <Route path="/security" element={
                <ProtectedRoute role="security">
                    <SecurityDashboard/>
                </ProtectedRoute>
            }/>
            <Route path="/security/incidents" element={
                <ProtectedRoute role="security">
                    <IncidentList/>
                </ProtectedRoute>
            }/>
            <Route path="/security/analytics" element={
                <ProtectedRoute role="security">
                    <Analytics/>
                </ProtectedRoute>
            }/>

            </Routes>
    );
};


function App() {
    return(
        <BrowserRouter>
        <AuthProvider>
            <AppRoutes/>
            <Toaster position="top-right"/>
        </AuthProvider>
        </BrowserRouter>
    );
};

export default App;