import TelegramBot from 'node-telegram-bot-api';
import { useState, useEffect } from 'react';
import { useTonWallet, useTonAddress, useIsConnectionRestored, TonConnectButton } from '@tonconnect/ui-react';
import { bear, coin, highVoltage, notcoin, rocket, trophy } from './images';
import Arrow from './icons/Arrow';

// Use your actual Telegram bot API key
const TELEGRAM_BOT_TOKEN = '7246266759:AAFg21RHSsRX2EEDsQUKoNxIGvhLJSqWzcg';
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

const App = () => {
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [clicks, setClicks] = useState([]);
  const pointsToAdd = 1;
  const energyToReduce = 1;

  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const wallet = useTonWallet();
  const connectionRestored = useIsConnectionRestored();

  const handleClick = (e) => {
    if (energy - energyToReduce < 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(Math.max(0, energy - energyToReduce));
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 10000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Handle /start command
    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const userName = msg.from.first_name || 'User';
      const welcomeMessage = `👋 Welcome, ${userName}, to MemeLord! 🚀\n\n🎮 Tap to earn and enjoy your journey to greatness! 🌟`;

      bot.sendMessage(chatId, welcomeMessage);
    });
  }, []);

  if (!connectionRestored) {
    return <div>Please wait...</div>;
  }

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
        <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
          <div className="w-full cursor-pointer">
            <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
              <TonConnectButton className="my-button-class" style={{ float: "right" }} />
            </div>
          </div>
          <div className="mt-12 text-5xl font-bold flex items-center">
            <img src={coin} width={44} height={44} />
            <span className="ml-2">{points.toLocaleString()}</span>
          </div>
          <div className="text-base mt-2 flex items-center">
            <img src={trophy} width={24} height={24} />
            <span className="ml-1">Gold <Arrow size={18} className="ml-0 mb-1 inline-block" /></span>
          </div>
        </div>

        {/* Other content goes here */}

        <div className="flex-grow flex items-center justify-center">
          <div className="relative mt-4" onClick={handleClick}>
            <img src={notcoin} width={256} height={256} alt="notcoin" />
            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-0"
                style={{
                  top: `${click.y - 42}px`,
                  left: `${click.x - 28}px`,
                  animation: `float 1s ease-out`
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                +1
              </div>
            ))}
          </div>
        </div>

        {/* Display wallet address */}
        {userFriendlyAddress && (
          <div>
            <span>User-friendly address: {userFriendlyAddress}</span>
            <span>Raw address: {rawAddress}</span>
          </div>
        )}

        {/* Display connected wallet info */}
        {wallet && (
          <div>
            <span>Connected wallet: {wallet.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
