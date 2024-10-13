import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import UploadAndDisplay from './UploadAndDisplay';

function App() {
  return (
    <Router>
      <div style={styles.nav}>
        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <Link to="/login" style={styles.link}>Login</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/signup" style={styles.link}>Signup</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/uploadAndDisplay" element={<UploadAndDisplay />} />
      </Routes>
    </Router>
  );
}

const styles = {
  nav: {
    marginBottom: '20px',
    backgroundColor: '#f0f0f0',
    padding: '10px 0',
  },
  navList: {
    display: 'flex',
    justifyContent: 'center',
    listStyleType: 'none',
  },
  navItem: {
    margin: '0 15px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '18px',
  },
};

export default App;
