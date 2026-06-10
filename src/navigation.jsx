// navigation.js
import { Link, Outlet } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const NavBar = () => {
  // Estados independientes para cada dropdown
  const [openDropdowns, setOpenDropdowns] = useState({
    gen7: false,
    gen8: false,
    lightning: false,
    calc: false,
  });

  // Refs para detectar clics fuera
  const gen7Ref = useRef(null);
  const calcRef = useRef(null);
  const gen8Ref = useRef(null);
  const lightningRef = useRef(null);

  // Cierra todos los menús si haces clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calcRef.current &&
        !calcRef.current.contains(event.target) &&
        gen7Ref.current &&
        !gen7Ref.current.contains(event.target) &&
        gen8Ref.current &&
        !gen8Ref.current.contains(event.target) &&
        lightningRef.current &&
        !lightningRef.current.contains(event.target)
      ) {
        setOpenDropdowns({ gen7: false, calc: false, gen8: false, lightning: false });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Función para abrir/cerrar dropdowns
  const toggleDropdown = (menu) => {
    setOpenDropdowns((prev) => ({
      gen7: false,
      calc: false,
      gen8: false,
      lightning: false,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <div className="navbar-dropdown" ref={calcRef}>
                <h2>SwingWeight PXG</h2>
              </div>
          </div>

          {/* ===== Menús principales ===== */}
          <div className="navbar-menu-desktop">
            {/* Lightning */}
            <div className="navbar-dropdown" ref={lightningRef}>
              <button
                className="navbar-link dropdown-button"
                onClick={() => toggleDropdown('lightning')}
              >
                Lightning ▾
              </button>
              {openDropdowns.lightning && (
                <div className="dropdown-menu">
                  <Link to="/lightning/driver" className="dropdown-item" onClick={() => toggleDropdown('lightning')}>Lightning Driver</Link>
                  <Link to="/lightning/maxlite" className="dropdown-item" onClick={() => toggleDropdown('lightning')}>Lightning Max Lite</Link>
                  <Link to="/lightning/fairway" className="dropdown-item" onClick={() => toggleDropdown('lightning')}>Lightning Fairway</Link>
                  <Link to="/lightning/hybrid" className="dropdown-item" onClick={() => toggleDropdown('lightning')}>Lightning Hybrid</Link>
                </div>
              )}
            </div>
            {/* GEN 8 */}
            <div className="navbar-dropdown" ref={gen8Ref}>
              <button
                className="navbar-link dropdown-button"
                onClick={() => toggleDropdown('gen8')}
              >
                GEN 8 ▾
              </button>
              {openDropdowns.gen8 && (
                <div className="dropdown-menu">
                  <Link to="/gen8/iron" className="dropdown-item" onClick={() => toggleDropdown('gen8')}>Iron</Link>
                </div>
              )}
            </div>
            {/* GEN 7 */}
            <div className="navbar-dropdown" ref={gen7Ref}>
              <button
                className="navbar-link dropdown-button"
                onClick={() => toggleDropdown('gen7')}
              >
                All Other Models ▾
              </button>
              {openDropdowns.gen7 && (
                <div className="dropdown-menu">
                  <Link to="/iron" className="dropdown-item" onClick={() => toggleDropdown('gen7')}>Iron</Link>
                  <Link to="/driver" className="dropdown-item" onClick={() => toggleDropdown('gen7')}>Driver</Link>
                  <Link to="/ultralite" className="dropdown-item" onClick={() => toggleDropdown('gen7')}>Ultra Lite</Link>
                  <Link to="/secretweapon" className="dropdown-item" onClick={() => toggleDropdown('gen7')}>Secret Weapon</Link>
                  <Link to="/fairway" className="dropdown-item" onClick={() => toggleDropdown('gen7')}>Fairway</Link>
                  <Link to="/hybrid" className="dropdown-item" onClick={() => toggleDropdown('gen7')}>Hybrid</Link>
                </div>
              )}
            </div>


          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default NavBar;
