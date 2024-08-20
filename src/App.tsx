import { useState, useEffect } from 'react';
import { useTonWallet, useTonAddress, useIsConnectionRestored, TonConnectButton } from '@tonconnect/ui-react';
import { WalletInfo } from '@tonconnect/ui-react';
import { bear, coin, highVoltage, notcoin, rocket, trophy } from './images';
import Arrow from './icons/Arrow';

const App = () => {
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const [currentPage, setCurrentPage] = useState('home'); // State to handle page navigation
  const pointsToAdd = 1;
  const energyToReduce = 1;

  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const wallet = useTonWallet();
  const connectionRestored = useIsConnectionRestored();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 10000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!connectionRestored) {
    return <div>Please wait...</div>;
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case 'tasks':
        return (
          <div className="flex flex-col items-center text-white">
            <h1 className="text-3xl font-bold mb-4">Tasks</h1>
            <ul className="list-disc">
              <li>Follow us on Twitter</li>
              <li>Tweet about us</li>
              <li>Share with your friends</li>
              <li>Join our Telegram group</li>
              {/* Add more tasks as needed */}
            </ul>
          </div>
        );
      case 'refer':
        return (
          <div className="flex flex-col items-center text-white">
            <h1 className="text-3xl font-bold mb-4">Refer a Friend</h1>
            <button
              className="bg-gold text-white py-2 px-4 rounded-xl"
              onClick={() => window.open(`https://t.me/your_bot_username?start=referral_code`, '_blank')}
            >
              Send Referral Link on Telegram
            </button>
          </div>
        );
      case 'home':
      default:
        return (
          <>
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
            {userFriendlyAddress && (
              <div>
                <span>User-friendly address: {userFriendlyAddress}</span>
                <span>Raw address: {rawAddress}</span>
              </div>
            )}
            {wallet && (
              <div>
                <span>Connected wallet: {(wallet as WalletInfo).name}</span>
              </div>
            )}
          </>
        );
    }
  };

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

        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <div className="w-full flex justify-between gap-2">
            <div className="w-1/3 flex items-center justify-start max-w-32">
              <div className="flex items-center justify-center">
                <img src={highVoltage} width={44} height={44} alt="High Voltage" />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">{energy}</span>
                  <span className="text-white text-large opacity-75">/ 10000</span>
                </div>
              </div>
            </div>
            <div className="flex-grow flex items-center max-w-60 text-sm">
              <div className="w-full bg-gold py-4 rounded-2xl flex justify-around">
                <button className="flex flex-col items-center gap-1" onClick={() => setCurrentPage('home')}>
                  <img src={bear} width={24} height={24} alt="High Voltage" />
                  <span>Frens</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1" onClick={() => setCurrentPage('tasks')}>
                  <img src={coin} width={24} height={24} alt="High Voltage" />
                  <span>Earn</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1" onClick={() => setCurrentPage('refer')}>
                  <img src={rocket} width={24} height={24} alt="High Voltage" />
                  <span>Refer</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#f9c035] rounded-full mt-4">
            <div className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full" style={{ width: `${(energy / 10000) * 100}%` }}></div>
          </div>
        </div>

        {renderPageContent()}
      </div>
    </div>
  );
};

export default App;
