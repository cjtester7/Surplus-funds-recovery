/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Gavel, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  MessageCircle,
  X,
  Send,
  Building2,
  Calendar,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-900 tracking-tight text-lg">Surplus Recovery</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
          <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          <button 
            onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all shadow-sm"
          >
            Check Eligibility
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="pt-32 pb-20 px-4 bg-[#FDFCFB]">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-blue-700 uppercase bg-blue-50 rounded-full">
          Homeowner Assistance
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
          You May Be Owed Money After a Foreclosure Sale
        </h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Many former homeowners are unaware that excess proceeds from a foreclosure auction may legally belong to them. We help you find out if you qualify.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2 group"
          >
            Check My Eligibility
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a 
            href="#how-it-works"
            className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all flex items-center justify-center"
          >
            How It Works
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const TrustBadges = () => (
  <div className="bg-white border-y border-gray-100 py-10">
    <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { icon: CheckCircle2, text: "No upfront fees" },
        { icon: CheckCircle2, text: "Free eligibility review" },
        { icon: CheckCircle2, text: "Confidential process" }
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-center gap-3 text-gray-600 font-medium italic">
          <item.icon className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  </div>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 px-4 bg-white">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How Surplus Funds Work</h2>
        <p className="text-gray-600 max-w-xl mx-auto">The process is straightforward, but often overlooked by the banks.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
        
        {[
          { 
            step: "01", 
            title: "Property sold at auction", 
            desc: "The property is sold to the highest bidder at a foreclosure or tax auction.",
            icon: Gavel
          },
          { 
            step: "02", 
            title: "Debt gets paid", 
            desc: "The lender takes only what is owed (principal, interest, and legal fees).",
            icon: Building2
          },
          { 
            step: "03", 
            title: "Remaining balance", 
            desc: "Any 'surplus' funds remaining legally belong to the former homeowner.",
            icon: Search
          }
        ].map((item, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl border-2 border-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
              <item.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ChatAssistant = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    address: '',
    state: '',
    date: '',
    phone: '',
    email: ''
  });
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (text: string, options?: string[]) => {
    setMessages(prev => [...prev, { role: 'bot', text, options }]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { role: 'user', text }]);
  };

  useEffect(() => {
    // Initial message
    setTimeout(() => {
      addBotMessage("Hi — many homeowners are unaware they may still be owed money after a foreclosure auction. I can help answer questions and explain how the process works.", [
        "What are surplus funds?",
        "How do I know if money is owed?",
        "Check my property",
        "Speak with someone"
      ]);
    }, 500);
  }, []);

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    
    if (option === "What are surplus funds?") {
      setTimeout(() => {
        addBotMessage("Surplus funds (also called excess proceeds) are the money left over after a foreclosure auction once the bank is paid off. These funds legally belong to you.");
        addBotMessage("Would you like to check if your property had surplus funds?", ["Yes, check my property", "Tell me more"]);
      }, 600);
    } else if (option === "How do I know if money is owed?") {
      setTimeout(() => {
        addBotMessage("We research county records and auction reports to determine the exact sale amount versus the debt. If there's a gap, that's your surplus.");
        addBotMessage("Ready to check?", ["Check my property", "Not yet"]);
      }, 600);
    } else if (option === "Check my property" || option === "Yes, check my property") {
      setStep(1);
      setTimeout(() => {
        addBotMessage("Excellent. To start, what is the address of the property that went to auction?");
      }, 600);
    } else if (option === "Speak with someone") {
      setTimeout(() => {
        addBotMessage("Of course. Please provide your phone number and we'll reach out for a private consultation.");
        setStep(4);
      }, 600);
    } else {
       setTimeout(() => {
        addBotMessage("I understand. Feel free to ask anything else or click 'Check my property' when ready.");
      }, 600);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    addUserMessage(inputVal);
    const val = inputVal;
    setInputVal('');

    if (step === 1) {
      setFormData({ ...formData, address: val });
      setStep(2);
      setTimeout(() => addBotMessage("Thank you. What state is the property located in?"), 600);
    } else if (step === 2) {
      setFormData({ ...formData, state: val });
      setStep(3);
      setTimeout(() => addBotMessage("Approximately when was the auction date? (Month/Year is fine)"), 600);
    } else if (step === 3) {
      setFormData({ ...formData, date: val });
      setStep(4);
      setTimeout(() => addBotMessage("Got it. Last step: what is your best phone number so we can send you the results of our review?"), 600);
    } else if (step === 4) {
      setFormData({ ...formData, phone: val });
      setTimeout(() => addBotMessage("Review requested! We help determine whether funds may exist and will contact you shortly with our findings. No upfront fees ever."), 1000);
      setStep(5);
    }
  };

  return (
    <div id="chat-section" className="py-24 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[600px]">
          {/* Bot Header */}
          <div className="bg-blue-600 p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Homeowner Assistance Chat</h3>
              <p className="text-blue-100 text-sm">Surplus Funds Information Assistant</p>
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    {msg.options && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {msg.options.map((opt: string, j: number) => (
                          <button
                            key={j}
                            onClick={() => handleOptionClick(opt)}
                            className="text-xs bg-white text-blue-600 px-3 py-1.5 rounded-full border border-blue-100 hover:bg-blue-50 transition-colors font-medium shadow-sm"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            {step === 5 ? (
              <div className="text-center py-4 bg-green-50 rounded-xl text-green-700 font-medium flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Request Submitted Successfully
              </div>
            ) : (
              <form onSubmit={handleInputSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base md:text-sm"
                />
                <button 
                  type="submit"
                  className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-gray-400 italic">
          Disclaimer: This does not constitute legal advice. Results may vary based on county and state regulations.
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What are surplus funds?",
      a: "Surplus funds are the leftover money from a property sale (foreclosure or tax auction) after all debts and liens are paid off. These funds legally belong to the former owner."
    },
    {
      q: "How long do I have to claim them?",
      a: "The timeframe (statute of limitations) varies significantly by state and county, ranging from 6 months to several years. It is best to act promptly once you know funds exist."
    },
    {
      q: "What if I already moved out of the state?",
      a: "You can still claim the funds. As long as you were the legal owner at the time of the auction, the money belongs to you regardless of where you live now."
    },
    {
      q: "Does checking cost anything?",
      a: "No. Our initial review to determine if funds exist is completely free. We only get paid if we successfully help you recover your money."
    }
  ];

  return (
    <section id="faq" className="py-24 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors group"
              >
                <span className="font-semibold text-gray-900">{faq.q}</span>
                {openIndex === i ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-16 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-blue-400" />
          <span className="font-bold text-white tracking-tight text-xl">Surplus Recovery</span>
        </div>
        <p className="text-sm leading-relaxed max-w-xs text-gray-400">
          We help homeowners navigate the recovery of excess proceeds from foreclosure sales. Trust-based, educational, and professional.
        </p>
      </div>

      <div className="space-y-6">
        <h4 className="text-white font-bold">Contact Us</h4>
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-gray-500" />
            <span>(555) 123-4567</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-500" />
            <span>help@surplusrecovery.org</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>Serving Homeowners Nationwide</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-white font-bold">Legal</h4>
        <div className="flex flex-col gap-3 text-sm text-gray-400">
          <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          <p className="mt-4 text-[10px] leading-tight text-gray-500">
            * We are not a law firm or a government agency. We provide research and documentation assistance for surplus fund recovery.
          </p>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
      &copy; {new Date().getFullYear()} Surplus Recovery Specialists. All rights reserved.
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustBadges />
      <HowItWorks />
      <ChatAssistant />
      <FAQ />
      <Footer />
      
      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <button 
          onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center animate-bounce"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
