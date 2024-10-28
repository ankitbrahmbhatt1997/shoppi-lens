// components/Header.tsx
export default function Header() {
  return (
    <header className="w-full flex justify-end items-center p-4 text-[1.4rem] text-gray-200">
      <nav className="space-x-8">
        <a href="#" className="hover:underline">
          About
        </a>
        <a href="#" className="hover:underline">
          Store
        </a>
      </nav>
      <div className="ml-auto space-x-8 flex items-center">
        <a href="#" className="hover:underline">
          Gmail
        </a>
        <a href="#" className="hover:underline">
          Images
        </a>
        <div className="cursor-pointer">
          <svg
            className="gb_E"
            focusable="false"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path
              d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"
              fill="white"
            />
            <image
              href="https://ssl.gstatic.com/gb/images/bar/al-icon.png"
              style={{ display: "none" }}
            />
          </svg>
        </div>
      </div>
      <button className="ml-6 w-8 h-8 bg-gray-700 rounded-full"></button>
    </header>
  );
}
