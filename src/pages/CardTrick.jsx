import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw } from 'lucide-react';

const suits = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const cardsSet = [];
for (let s of suits) {
    for (let v of values) {
        cardsSet.push({ suit: s, value: v, color: s === '♥' || s === '♦' ? 'text-red-500' : 'text-slate-100' });
    }
}

// Select a random subset for the trick
const getRandomCards = (count) => {
    const shuffled = [...cardsSet].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export default function CardTrick() {
    const [phase, setPhase] = useState('intro'); // intro, selection, shuffle, predict, reveal
    const [selectedCard, setSelectedCard] = useState(null);
    const [displayCards, setDisplayCards] = useState([]);

    useEffect(() => {
        setDisplayCards(getRandomCards(14));
    }, []);

    const startSelection = () => {
        setPhase('selection');
    };

    const handleCardPick = (card) => {
        setSelectedCard(card);
        setPhase('shuffle');
        setTimeout(() => {
            setPhase('predict');
        }, 3000);
    };

    const revealMagic = () => {
        setPhase('reveal');
    };

    const resetGame = () => {
        setPhase('intro');
        setSelectedCard(null);
        setDisplayCards(getRandomCards(14));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-5xl px-4">
            <AnimatePresence mode="wait">
                {phase === 'intro' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6 magic-gradient">
                            Card Prediction Magic
                        </h2>
                        <p className="text-lg text-slate-400 max-w-md mx-auto mb-10">
                            I have prepared a secret deck. Pick any card, and my algorithm will find it through the screen.
                        </p>
                        <button
                            onClick={startSelection}
                            className="bg-purple-600 hover:bg-purple-500 text-white px-12 py-4 rounded-full font-bold text-xl transition-all active:scale-95 shadow-[0_0_25px_rgba(168,85,247,0.5)]"
                        >
                            Start Magic Deck
                        </button>
                    </motion.div>
                )}

                {phase === 'selection' && (
                    <motion.div
                        key="selection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full text-center"
                    >
                        <h3 className="text-2xl font-bold mb-8 text-slate-100 flex items-center justify-center gap-2">
                            <Sparkles className="text-purple-400" /> Memorize one card below...
                        </h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {displayCards.map((card, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.1, rotateY: 10 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleCardPick(card)}
                                    className="w-20 h-32 md:w-28 md:h-44 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center text-slate-900 cursor-pointer overflow-hidden border-2 border-transparent hover:border-purple-500 transition-colors"
                                >
                                    <div className={`text-xl md:text-3xl font-bold ${card.color}`}>{card.value}</div>
                                    <div className={`text-3xl md:text-5xl ${card.color}`}>{card.suit}</div>
                                </motion.div>
                            ))}
                        </div>
                        <p className="mt-10 text-slate-500 italic">Click the card you picked when you're ready.</p>
                    </motion.div>
                )}

                {phase === 'shuffle' && (
                    <motion.div
                        key="shuffle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                    >
                        <div className="relative w-40 h-56 mx-auto mb-10">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0 bg-gradient-to-br from-purple-800 to-blue-900 rounded-xl border-2 border-white/20 shadow-2xl"
                                    animate={{
                                        x: [0, i * 10, -i * 10, 0],
                                        rotateY: [0, 180, 0, -180, 0],
                                        scale: [1, 1.1, 1, 0.9, 1]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.1
                                    }}
                                />
                            ))}
                        </div>
                        <h3 className="text-3xl font-black magic-gradient animate-pulse">
                            Shuffling Mind Waves...
                        </h3>
                    </motion.div>
                )}

                {phase === 'predict' && (
                    <motion.div
                        key="predict"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl font-black mb-10 text-slate-100">
                            The cards are shuffled.
                        </h2>
                        <div className="flex justify-center mb-10">
                            <div className="w-40 h-56 bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl border-4 border-purple-500/50 flex items-center justify-center animate-bounce shadow-[0_0_50px_rgba(168,85,247,0.4)]">
                                <Sparkles className="w-20 h-20 text-white/20" />
                            </div>
                        </div>
                        <button
                            onClick={revealMagic}
                            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:brightness-110 active:scale-95 transition-all"
                        >
                            Reveal My Card ✨
                        </button>
                    </motion.div>
                )}

                {phase === 'reveal' && (
                    <motion.div
                        key="reveal"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ rotateY: 180 }}
                            animate={{ rotateY: 0 }}
                            transition={{ duration: 0.8, type: 'spring' }}
                            className="w-56 h-80 md:w-64 md:h-96 bg-white rounded-3xl mx-auto shadow-[0_0_80px_rgba(255,255,255,0.3)] flex flex-col items-center justify-center border-8 border-purple-600 mb-10"
                        >
                            <div className={`text-5xl md:text-7xl font-black ${selectedCard?.color}`}>{selectedCard?.value}</div>
                            <div className={`text-7xl md:text-9xl ${selectedCard?.color}`}>{selectedCard?.suit}</div>
                        </motion.div>

                        <h3 className="text-3xl font-bold mb-6 text-slate-100">
                            Is this your card?
                        </h3>

                        <button
                            onClick={resetGame}
                            className="flex items-center gap-2 mx-auto text-slate-400 hover:text-white transition-colors py-3 px-6 rounded-full hover:bg-white/5 font-medium"
                        >
                            <RotateCcw className="w-5 h-5" /> Play Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
