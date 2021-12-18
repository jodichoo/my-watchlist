import { Link } from "react-router-dom";

function NavItem({ name, path }) {
  return (
    <div className='nav-item'>
      <Link to={path}>{name}</Link>
    </div>
  )
}

export default NavItem;
