import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Logo } from "@/components/svg/logo";

export default function Home() {
  return (
    <div className="max-w-xs md:h-screen flex flex-col justify-center mx-auto">
      <div className="w-full flex flex-col items-center justify-center space-y-6 mb-10">
        <Logo />
        <h1 className="font-bold text-xl">Sign in to your account</h1>
      </div>
      <div className="space-y-6">
        <Input label={"Username"} />
        <Input type="password" label={"Password"} />
        <Button loading>Sign in</Button>
      </div>
    </div>
  );
}
