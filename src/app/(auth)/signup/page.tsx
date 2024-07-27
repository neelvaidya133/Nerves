import { Metadata } from "next";
import Image from "next/image";
import signupImage from "@/assets/signup-image.jpg";
import Link from "next/link";
import Signupform from "./SignUpform";

export const metadata: Metadata = {
  title: "Signup",
};

export default function Page() {
  return (
    <main className="flex h-screen justify-center items-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden  bg-card shadow-2xl rounded-2xl">
        <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold ">Sign Up to NervesPluse</h1>
            <p className="text-muted-foreground">
              start pulsing with nerve today by creating an account on
              NervesPluse.
            </p>
          </div>

          <div className="space-y-5">
            <Signupform />
            <Link href="/login" className="block text-center hover:underline">
              Already have an account? Login here
            </Link>
          </div>
        </div>
        <Image
          src={signupImage}
          alt="signup image"
          className="w-1/2 hidden md:block object-cover"
        />
      </div>
    </main>
  );
}
