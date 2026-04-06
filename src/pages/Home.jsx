import { games } from '../data/games';
import GameCard from '../components/GameCard';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <div className="w-full flex justify-center items-center flex-col pt-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-5xl md:text-6xl font-black mb-6 magic-gradient">
                    Test Your Mind.
                </h2>
                <p className="text-lg text-slate-400 max-w-xl mx-auto">
                    Welcome to the realm of interactive number tricks. Pick a game below and discover the math magic hidden within.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            >
                {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </motion.div>
        </div>
    );
}
