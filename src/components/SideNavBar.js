const Navbar = ({toggleStyle}) => {
 
    return (
        <nav className="side-nav-bar">
            <ul>
               
                    <button onClick={toggleStyle}>
                        <span>
                            <i className="fi fi-rr-circle"></i>
                         </span>
                    </button>
               
            </ul>
        </nav>
    );
  };
  
  export default Navbar;
  