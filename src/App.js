import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/dashboard' element={<DashboardPage />} />
                    <Route path='/' element={<h1>home</h1>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
