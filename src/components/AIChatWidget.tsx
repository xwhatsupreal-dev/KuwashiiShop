import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, ChevronDown, Send, Bot, User, Loader2 } from 'lucide-react';
import { StockItem } from '../types';

interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

interface AIChatWidgetProps {
  items: StockItem[];
  shopLogoUrl?: string;
  currentUser?: any;
  onLoginClick?: () => void;
}

export const AIChatWidget: React.FC<AIChatWidgetProps> = ({ items, shopLogoUrl, currentUser, onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      parts: [{ text: 'สวัสดีครับ ผมคือผู้ช่วย AI ของร้าน Kuwashii ยินดีให้บริการครับ! มีอะไรให้ผมช่วยแนะนำสินค้าไหมครับ?' }]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      parts: [{ text: inputMessage }]
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMsg.parts[0].text,
          history: messages,
          items: items.map(item => ({
             id: item.id,
             name: item.name,
             category: item.category,
             quantity: item.quantity,
             price: item.price,
             description: item.description,
             isPopular: item.isPopular
          }))
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      
      setMessages(prev => [...prev, {
        role: 'model',
        parts: [{ text: data.answer }]
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'model',
        parts: [{ text: 'ขออภัยด้วยครับ มีปัญหาระบบอัจฉริยะขัดข้อง กรุณาลองถามใหม่อีกครั้ง' }]
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white cursor-pointer"
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-4 sm:right-6 z-[100] w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] max-h-[80vh] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-zinc-800/50 p-4 border-b border-zinc-700/50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-indigo-500/30 overflow-hidden shrink-0">
                  {shopLogoUrl ? (
                    <img src={shopLogoUrl} alt="AI Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-indigo-500/20 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-indigo-400" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm">Kuwashii AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs text-emerald-500">ออนไลน์</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-zinc-700/50 rounded-xl text-zinc-400 hover:text-zinc-200 transition-colors"
                  title="ย่อหน้าต่าง"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => {
                      setMessages([{
                        role: 'model',
                        parts: [{ text: 'สวัสดีครับ ผมคือผู้ช่วย AI ของร้าน Kuwashii ยินดีให้บริการครับ! มีอะไรให้ผมช่วยแนะนำสินค้าไหมครับ?' }]
                      }]);
                    }, 300);
                  }}
                  className="p-2 hover:bg-red-500/20 rounded-xl text-zinc-400 hover:text-red-400 transition-colors"
                  title="ปิดและเริ่มใหม่"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden ${
                      msg.role === 'user' ? 'bg-zinc-800 border border-zinc-700' : 'border border-indigo-500/30'
                    }`}>
                      {msg.role === 'user' ? (
                        <User className="w-4 h-4 text-zinc-400" />
                      ) : shopLogoUrl ? (
                        <img src={shopLogoUrl} alt="AI Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-indigo-500/20 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-indigo-400" />
                        </div>
                      )}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-sm' 
                        : 'bg-zinc-800 text-zinc-200 rounded-bl-sm border border-zinc-700/50'
                    }`}>
                      {/* Simple markdown parsing for the AI responses */}
                      {msg.parts[0].text.split('\n').map((line, i) => (
                        <p key={i} className="mb-1 last:mb-0 break-words">
                          {line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-end gap-2 max-w-[85%] flex-row">
                    <div className="w-8 h-8 rounded-full border border-indigo-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                      {shopLogoUrl ? (
                        <img src={shopLogoUrl} alt="AI Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-indigo-500/20 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-indigo-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-800 border border-zinc-700/50 rounded-bl-sm">
                      <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-zinc-900 border-t border-zinc-800 shrink-0">
              {currentUser ? (
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="พิมพ์ข้อความถาม AI..."
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 rounded-xl text-white transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center p-2 text-center">
                  <p className="text-sm text-zinc-400 mb-3">กรุณาเข้าสู่ระบบเพื่อใช้งาน AI</p>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onLoginClick?.();
                    }}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-colors"
                  >
                    เข้าสู่ระบบ / สมัครสมาชิก
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
