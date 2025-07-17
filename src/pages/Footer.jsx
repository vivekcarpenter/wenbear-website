import {
  RiFacebookFill,
  RiTwitterXFill,
  RiLinkedinFill,
  RiInstagramFill,
} from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand & Social */}
          <div>
            <a href="#" className="inline-block mb-4">
              <img
                src="https://static.readdy.ai/image/eb5862789b21eba2b372cb5fcc94d35c/4a380a59c4416d58b4948c433f8b4e44.jfif"
                alt="WenBear Technologies"
                className="h-12 rounded-md shadow-md"
              />
            </a>
            <p className="text-gray-400 mb-6">Where Code Meets Intelligence</p>
            <div className="flex gap-3">
              {[RiFacebookFill, RiTwitterXFill, RiLinkedinFill, RiInstagramFill].map(
                (Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-blue-600 transition rounded-full text-white"
                    aria-label="Social link"
                  >
                    <Icon className="text-lg" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3 text-gray-400">
              {["Custom Software", "Web Development", "AI Applications", "UI/UX Design", "Dedicated Teams"].map(
                (item, idx) => (
                  <li key={idx}>
                    <a href="#" className="hover:text-white transition">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-gray-400">
              {["About Us", "Our Work", "Careers", "Blog", "Contact"].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-white transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed!");
              }}
              className="flex"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md font-medium transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-4 md:mb-0">© 2025 WenBear Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, idx) => (
              <a key={idx} href="#" className="hover:text-white transition">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
