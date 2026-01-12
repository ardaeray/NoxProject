
import noxLogo from "../../public/assets/noxLogoTransparent.png";

export default function Signup() {
  return (
    <main className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black px-6">
      <div className="w-full max-w-md bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-900 border border-neutral-800 rounded-2xl p-10 shadow-xl">
        {/* LOGO */}
        <div className="flex mx-auto left mb-6 pl-1">
          <img
            src={noxLogo}
            alt="Nox Logo"
            className="h-10 w-auto opacity-90"
          />
        </div>

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white mb-2 text-left">
            Start your Nox experience
          </h1>
          <p className="text-sm text-neutral-400 text-left">
            Join Nox and experience intentional technology.
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-100 focus:outline-none focus:border-black"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-100 focus:outline-none focus:border-black"
          />

          <button
            type="submit"
            className="w-full rounded-full bg-black py-3 text-white text-sm font-medium hover:bg-neutral-500 transition"
          >
            Sign Up
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-8 text-center text-sm text-neutral-400 float-right pr-1">
          Already have an account?
          <a
            href="/login"
            className="ml-1 text-neutral-100 font-medium hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
