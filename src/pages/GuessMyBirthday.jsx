import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, RotateCcw } from 'lucide-react';

const steps = [
    "Take your birth month as a number (e.g. 5 for May).",
    "Multiply that number by 5.",
    "Add 6 to the result.",
    "Multiply that result by 4.",
    "Add 9.",
    "Multiply by 5.",
    "Add your birth day (e.g. 24).",
    "Multiply the current result by 100.",
    "Add the last two digits of your birth year (e.g. 99 for 1999).",
    "Ready? Enter your final magical number below:"
];

export default function GuessMyBirthday() {
    const [currentStep, setCurrentStep] = useState(0);
    const [resultInput, setResultInput] = useState('');
    const [revealed, setRevealed] = useState(false);
    const [originalData, setOriginalData] = useState(null);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(curr => curr + 1);
        }
    };

    const handleReveal = (e) => {
        e.preventDefault();
        const res = parseInt(resultInput, 10);
        if (!isNaN(res)) {
            setRevealed(true);
            const decodedNumber = res - 16500;
            let decodedStr = decodedNumber.toString();

            // If month is single digit and day/year are valid, length could be 5.
            // E.g. May 5, 2005 (M=5, D=5, Y=5) -> 50505
            if (decodedStr.length < 5) {
                decodedStr = decodedStr.padStart(5, '0');
            }

            if (decodedStr.length === 5 || decodedStr.length === 6) {
                let mmStr, ddStr, yyStr;

                if (decodedStr.length === 5) {
                    mmStr = decodedStr.slice(0, 1);
                    ddStr = decodedStr.slice(1, 3);
                    yyStr = decodedStr.slice(3, 5);
                } else {
                    mmStr = decodedStr.slice(0, 2);
                    ddStr = decodedStr.slice(2, 4);
                    yyStr = decodedStr.slice(4, 6);
                }

                let mm = parseInt(mmStr, 10);
                let dd = parseInt(ddStr, 10);
                let yy = parseInt(yyStr, 10);

                if (mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31) {
                    let fullYear = yy > 24 ? 1900 + yy : 2000 + yy; // Guess century based on year threshold
                    const date = new Date(fullYear, mm - 1, dd);
                    const monthName = date.toLocaleString('default', { month: 'long' });
                    setOriginalData(`${monthName} ${dd}, ${fullYear}`);
                } else {
                    setOriginalData("Hmm, did you do the math right? Try again!");
                }
            } else {
                setOriginalData("Hmm, that doesn't look quite right! Let's try again.");
            }
        }
    };

    const resetGame = () => {
        setCurrentStep(0);
        setResultInput('');
        setRevealed(false);
        setOriginalData(null);
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

                    <h2 className="text-3xl font-bold mb-10 flex text-center justify-center items-center gap-3 text-slate-100">
                        <Sparkles className="text-purple-400 w-7 h-7" />
                        Guess My Birthday
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
                                    placeholder="Final number..."
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

                    <div className="mt-8 flex justify-center gap-2 flex-wrap">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentStep ? 'bg-purple-400 scale-125' : i < currentStep ? 'bg-purple-800' : 'bg-white/10'}`}
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
                        🎂
                    </motion.div>
                    <div>
                        <h3 className="text-2xl text-slate-400 mb-4 font-medium uppercase tracking-widest">You were born on</h3>
                        <div className={`text-4xl md:text-7xl leading-tight font-black text-transparent bg-clip-text magic-gradient drop-shadow-[0_0_40px_rgba(168,85,247,0.5)] ${originalData.startsWith('Hmm') ? 'text-2xl md:text-4xl' : ''}`}>
                            {originalData}
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
