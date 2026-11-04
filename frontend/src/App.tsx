import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { IncomingLetters } from './pages/IncomingLetters';
import { OutgoingLetters } from './pages/OutgoingLetters';
import { Approvals } from './pages/Approvals';
import { Archive } from './pages/Archive';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/incoming" element={<IncomingLetters />} />
          <Route path="/outgoing" element={<OutgoingLetters />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}