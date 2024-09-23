import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'assistant';
}

const Home: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const sendMessage = async () => {
        if (inputMessage.trim() === '' || isLoading) return;

        const userMessage: Message = {
            id: messages.length,
            text: inputMessage,
            sender: 'user',
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/api/chat', {
                message: inputMessage,
                conversation: messages.map(m => ({ role: m.sender, content: m.text }))
            });
            const aiMessage: Message = {
                id: messages.length + 1,
                text: response.data.response,
                sender: 'assistant',
            };

            setMessages(prevMessages => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            if (axios.isAxiosError(error)) {
                console.error('Axios error details:', error.response?.data, error.response?.status);
            }
            const errorMessage: Message = {
                id: messages.length + 1,
                text: 'Sorry, there was an error processing your request.',
                sender: 'assistant',
            };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                    >
                        <span
                            className={`inline-block p-2 rounded-lg ${
                                message.sender === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-black'
                            }`}
                        >
                            <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t">
                <div className="flex">
                    <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 border rounded-l-lg p-2 resize-none"
                        placeholder="Type your message..."
                        disabled={isLoading}
                        rows={3}
                    />
                    <button
                        onClick={sendMessage}
                        className={`px-4 py-2 rounded-r-lg ${
                            isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-700'
                        } text-white`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
