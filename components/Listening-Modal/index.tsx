import { useEffect, useState } from "react";

interface ListeningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ListeningModal: React.FC<ListeningModalProps> = ({ isOpen, onClose }) => {
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setListening((prev) => !prev);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
      <div className="flex  items-center justify-between space-y-6 w-[44%] max-w-[582px]">
        <h2 className="text-[4rem] text-white">Listening...</h2>
        <div
          className={`flex items-center justify-center w-[167px] h-[167px] rounded-full bg-white animate-pulse transition-transform duration-500 ${
            listening ? "scale-102" : "scale-100"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill="red"
              d="M17 11.998c0 2.76-2.23 5-4.99 5l-.002.002a4.994 4.994 0 0 1-4.979-5h-2c0 3.52 2.59 6.433 5.98 6.92v3.078h.01V22h2v-3.08h-.01A6.982 6.982 0 0 0 19 11.998z"
            />
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 15c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v7c0 1.66 1.34 3 3 3z"
              fill="red"
            />
          </svg>
        </div>
      </div>
      <button
        onClick={onClose}
        className="px-4 py-2 text-[2rem]  text-gray-300 rounded-md hover:bg-gray-600 absolute right-0 top-0"
      >
        <svg
          className="block"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path
            fill="#fff"
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default ListeningModal;
