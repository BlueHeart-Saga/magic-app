import { Outlet, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <header className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                        <Sparkles className="w-8 h-8 text-purple-400" />
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
