import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function GameCard({ game }) {
    const isAvailable = game.path !== '#';

    return (
        <motion.div
            whileHover={isAvailable ? { scale: 1.05, y: -5 } : {}}
            className={`relative rounded-2xl p-[1px] ${isAvailable ? 'bg-gradient-to-br from-purple-500 to-blue-500' : 'bg-slate-800'} ${game.isBlurred ? 'opacity-50 blur-[3px] select-none pointer-events-none' : ''}`}
        >
            <div className="bg-[#120e24] w-full h-full rounded-2xl p-6 flex flex-col gap-4 text-left">
                <h3 className="text-xl font-bold text-slate-100">{game.title}</h3>
                <p className="text-slate-400 flex-grow">{game.description}</p>

                {isAvailable ? (
                    <Link
                        to={game.path}
                        className="w-full py-3 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 font-semibold rounded-xl text-center transition-colors border border-purple-500/30"
                    >
                        Play Now
                    </Link>
                ) : (
                    <button
                        disabled
                        className="w-full py-3 bg-slate-800 text-slate-500 font-semibold rounded-xl text-center border border-slate-700 cursor-not-allowed"
                    >
                        Coming Soon
                    </button>
                )}
            </div>
        </motion.div>
    );
}
