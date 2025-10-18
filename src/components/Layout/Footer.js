import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 md:p-12 bg-black text-white">
      <div className="space-y-3">
        <h1 className="font-medium text-xl">Exclusive</h1>
        <div>Subscribe</div>
      </div>
      <div className="space-y-3">
        <h1 className="font-medium text-xl">Support</h1>
        <div>Ahmed Magdy Hassan</div>
        <div>exclusive@gmail.com</div>
        <div>+88015-88888-9999</div>
      </div>
      <div className="space-y-3">
        <h1 className="font-medium text-xl">Account</h1>
        <div>
          <Link to="/home/my-account">My Account</Link>
        </div>
        <div>
          <Link to="/login">Login / Register</Link>
        </div>
        <div>
          <Link to="/home/cart">Cart</Link>
        </div>
        <div>
          <Link to="/home/all-products">Shop</Link>
        </div>
      </div>
      <div className="space-y-3">
        <h1 className="font-medium text-xl">Quick Link</h1>
        <div>
          <Link to="/home/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
