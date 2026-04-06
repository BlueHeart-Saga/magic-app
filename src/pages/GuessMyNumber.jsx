import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, RotateCcw } from 'lucide-react';

const steps = [
    "Think of a number. Any number.",
    "Multiply that number by 2.",
    "Add 10 to your new number.",
    "Now, divide the result by 2.",
    "Ready? Enter your final result below."
];

export default function GuessMyNumber() {
    const [currentStep, setCurrentStep] = useState(0);
    const [resultInput, setResultInput] = useState('');
    const [revealed, setRevealed] = useState(false);
    const [originalNumber, setOriginalNumber] = useState(null);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(curr => curr + 1);
        }
    };

    const handleReveal = (e) => {
        e.preventDefault();
        const res = parseInt(resultInput, 10);
        if (!isNaN(res)) {
            // The math trick gives a final result of x + 5, 
            // thus the original number x is result - 5.
            setOriginalNumber(res - 5);
            setRevealed(true);
        }
    };

    const resetGame = () => {
        setCurrentStep(0);
        setResultInput('');
        setRevealed(false);
        setOriginalNumber(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-2xl px-4">

            {!revealed ? (
                <motion.div
                    className="w-full bg-[#1c1630]/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-purple-500/20 shadow-2xl relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep) / (steps.length - 1)) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                    <h2 className="text-3xl font-bold mb-10 flex justify-center items-center gap-3 text-slate-100">
                        <Sparkles className="text-purple-400 w-7 h-7" />
                        Guess My Number
                    </h2>

                    <div className="min-h-[140px] flex flex-col justify-center items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -15, filter: "blur(6px)" }}
                                transition={{ duration: 0.4 }}
                                className="text-2xl md:text-3xl font-medium text-center text-slate-200"
                            >
                                {steps[currentStep]}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-12 flex justify-center h-16 items-center">
                        {currentStep < steps.length - 1 ? (
                            <button
                                onClick={nextStep}
                                className="flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all active:scale-95 shadow-[0_0_25px_rgba(168,85,247,0.5)]"
                            >
                                Next <ArrowRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <form onSubmit={handleReveal} className="flex flex-col md:flex-row gap-4 w-full">
                                <input
                                    type="number"
                                    value={resultInput}
                                    onChange={(e) => setResultInput(e.target.value)}
                                    placeholder="Final result..."
                                    className="flex-grow bg-[#0f0b1a] border border-purple-500/30 focus:border-purple-400 rounded-xl px-5 py-4 text-xl outline-none text-white text-center font-mono shadow-inner"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:brightness-110 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 whitespace-nowrap shadow-lg shadow-purple-500/20"
                                >
                                    Reveal Magic ✨
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="mt-10 flex justify-center gap-3">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentStep ? 'bg-purple-400 scale-125' : i < currentStep ? 'bg-purple-800' : 'bg-white/10'}`}
                            />
                        ))}
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    className="w-full text-center flex flex-col items-center gap-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                >
                    <motion.div
                        className="text-8xl md:text-9xl flex justify-center"
                        initial={{ rotate: -20, scale: 0.5 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                        😲
                    </motion.div>
                    <div>
                        <h3 className="text-2xl text-slate-400 mb-4 font-medium uppercase tracking-widest">Your original number was</h3>
                        <div className="text-8xl md:text-[10rem] leading-none font-black text-transparent bg-clip-text magic-gradient drop-shadow-[0_0_40px_rgba(168,85,247,0.5)]">
                            {originalNumber}
                        </div>
                    </div>

                    <button
                        onClick={resetGame}
                        className="flex items-center gap-2 mt-8 text-slate-400 hover:text-white transition-colors py-3 px-6 rounded-full hover:bg-white/5 font-medium"
                    >
                        <RotateCcw className="w-5 h-5" /> Play Again
                    </button>
                </motion.div>
            )}

        </div>
    );
}
