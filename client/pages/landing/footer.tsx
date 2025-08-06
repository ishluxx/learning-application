import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-60 dark:bg-[#1a1a1a] dark:text-gray-100 border-t border-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-black font-bold text-lg mb-4 dark:text-white">About Us</h3>
            <p className="text-gray-400">
              Your trusted platform for online learning and professional development.
            </p>
          </div>
          <div>
            <h3 className="text-black font-bold text-lg mb-4 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#partners" className="hover:text-white transition-colors">Partners</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-black font-bold text-lg mb-4 dark:text-white">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail size={18} />
                info@example.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                (123) 456-7890
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} />
                123 Learning Street, Education City
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-black font-bold text-lg mb-4 dark:text-white">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get updates and news</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg flex-grow"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-lg dark:text-black">
                Subscribe
              </button>
            </div>
          </div>
        </div>
          <div className="mt-8 pt-8 text-center text-black">
          <p>&copy; 2025 Your E-Learning Platform. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
}