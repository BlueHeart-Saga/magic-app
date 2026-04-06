import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <header className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img
                            src={logoImg}
                            alt="Magics of Python Logo"
                            className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        />
                    </motion.div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent magic-gradient">
                        Magics OF Python
                    </h1>
                </Link>
            </header>

            <main className="flex-grow w-full max-w-5xl mx-auto p-6 flex flex-col items-center">
                <Outlet />
            </main>

            <footer className="py-6 text-center text-slate-500 text-sm mt-8 border-t border-white/5 w-full">
                <p>&copy; {new Date().getFullYear()} Magics OF Python. A fun math magic app.</p>
            </footer>
        </div>
    );
}
