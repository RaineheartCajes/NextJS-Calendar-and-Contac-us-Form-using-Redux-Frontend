"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <AppBar position="static" className={styles.navbar}>
      <Toolbar>
        <Typography variant="h6" className={styles.title}>
          Raineheart
        </Typography>
        <Button color="inherit" className={styles.button} onClick={() => handleNavigate('/calendar')}>
          Calendar
        </Button>
        <Button color="inherit" className={styles.button} onClick={() => handleNavigate('/contact-us')}>
          Contact Us
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
