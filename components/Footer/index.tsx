// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full bg-[#171717] text-gray-200 text-[1.5rem] py-[1.5rem] px-[3rem]">
      <div className="flex justify-between  mx-auto">
        <div>India</div>
      </div>

      <hr className="my-[1.5rem] mx-[-3rem] border-gray-800" />
      <div className="flex items-center justify-between">
        <div className="space-x-4">
          <a href="#" className="hover:underline">
            Advertising
          </a>
          <a href="#" className="hover:underline">
            Business
          </a>
          <a href="#" className="hover:underline">
            How Search works
          </a>
        </div>
        <div className="space-x-4">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Settings
          </a>
        </div>
      </div>
    </footer>
  );
}
