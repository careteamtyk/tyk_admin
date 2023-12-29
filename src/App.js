import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import Login from './login/login';
import NotFound from './NotFound';
import PrivatePath from './privatePath';
import LoginPath from './loginPath';
import ImagesUpload from './components/imagesLibrary/imagesUpload';
import Dashboard from './components/home/dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ViewMockResult from './components/mocktest/ViewMockResult';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route exact path="/" element={<PrivatePath> <Home /></PrivatePath>} />
      <Route exact path="/dashboard" element={<PrivatePath> <Home /></PrivatePath>} />
      <Route exact path="/reset-password" element={<PrivatePath> <Home /></PrivatePath>} />
      <Route exact path="/create-mocktest" element={<PrivatePath> <Home /></PrivatePath>} />
      <Route exact path="/mock-test" element={<PrivatePath> <Home /></PrivatePath>} />
      <Route exact path="/mock-test-report/:id" element={<PrivatePath> <ViewMockResult /></PrivatePath>} />
      <Route exact path="/question-library" element={<PrivatePath> <Home /></PrivatePath>} />
      <Route path="/images-library" element={<PrivatePath><ImagesUpload /></PrivatePath>} />
      <Route exact path="/membership" element={<PrivatePath> <Home /></PrivatePath>} />
      <Route exact path="/email-scheduler" element={<PrivatePath> <Home /></PrivatePath>} />
      <Route exact path="/manage-plans" element={<PrivatePath> <Home /></PrivatePath>} />
      <Route exact path="/audit-log" element={<PrivatePath> <Home /></PrivatePath>} />
      <Route exact path="/error-log" element={<PrivatePath> <Home /></PrivatePath>} />
      <Route path="/home" element={<PrivatePath> <Home /></PrivatePath>} />
      <Route path="/login" element={<LoginPath><Login /></LoginPath>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
