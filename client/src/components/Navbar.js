import NavItem from "./NavItem";

function Navbar() {
  // return (<div className="navbar">
  //   {children}
  //   </div>);
  return (
    <div className="navbar">
      <NavItem name='Home' path='/' />
      <NavItem name='My List' path='/watchlist' />
    </div>
  )
}
export default Navbar;
