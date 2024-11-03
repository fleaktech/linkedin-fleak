'use client'
import Image from "next/image";
import { FleakForm } from "./fleakForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 space-y-8 font-[family-name:var(--font-geist-sans)]">
      <div className="space-y-2">
        <div className="text-5xl flex flex-col items-center">
          <div className="flex items-start">
          LinkedinTune
            <Image
              src="/linkedin-logo.svg"
              alt="Linkedin Logo"
              className="mx-2"
              width={56}
              height={56}
            />
          </div>
        </div>
        <p className="flex justify-center items-center text-center max-w-[60ch]">
        Get LinkedIn Profile Update Recommendations for the Job.
        </p>
      </div>
      <FleakForm />
      <a
        href="https://fleak.ai"
        target="_blank"
        className="flex bottom-2 row-start-3 space-x-1 text-xs dark:text-black dark:bg-[#E5EBEE] border dark:border-0 py-2.5 px-4 rounded-md shadow-md"
      >
        Built with ❤️ using{" "}
        <Image
          src="/fleak-logo-title.svg"
          alt="Fleak Logo"
          className="ml-2"
          width={60}
          height={12}
          priority
        />
      </a>
    </div>
  );
}
