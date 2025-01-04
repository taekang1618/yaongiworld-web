import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.scss'; // Use CSS Modules

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const sideMenuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (sideMenuRef.current && !sideMenuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <header className={styles.header}>
            <button className={styles.menuButton} onClick={toggleMenu}>
                ☰
            </button>
            <nav ref={sideMenuRef} className={`${styles.sideMenu} ${isMenuOpen ? styles.open : ''}`}>
                <ul>
                    <li><Link href="/" onClick={toggleMenu}>Home</Link></li>
                    <li><Link href="/about" onClick={toggleMenu}>About</Link></li>
                    <li><Link href="/projects" onClick={toggleMenu}>Projects</Link></li>
                    <li><Link href="/contact" onClick={toggleMenu}>Contact</Link></li>
                </ul>
            </nav>
            <nav className={styles.topMenu}>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/projects">Projects</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;