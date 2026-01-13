import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import noxLogo from "../../public/assets/noxLogoTransparent.png";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Login() {
  const { dispatch } = useContext(AppContext); // burada bize AppContext içindeki providerdan hani state ve dispatch döndürüyoruz ya value kısmında burada istersem const {dispatch,state} = useContext(AppContext); de yazabilirim ama bana dispatch lazım çünkü LOGIN olma durumunda direkt bu eylemin yapılmaısnı istiyorum .

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();

        setUsers(data);
      } catch (error) {
        console.log("Data error:", error);
      }
    };

    fetchUsers();
  }, []);

  const decoding = (pass) => {
    pass =
      pass.substring(Math.floor(pass.length / 2), pass.length) +
      pass.substring(0, Math.floor(pass.length / 2));
    return pass;
  };

  const login = () => {
    if (!mail || !password) {
      // lütfen  şifre ve mail giriniz

      setError("Please fill all the blanks!");
      setMail("");
      setPassword("");
      return;
    }

    const currentUser = users.find((user) => user.mail === mail);

    if (!currentUser) {
      // bu kısım böyle bir mail bulunmuyor
      setError("This mail doesn't exist!");
      return;
    }

    if (currentUser.password !== decoding(password)) {
      // şifre yanlış
      setError("The password is incorrect!");
      return;
    }

    if (currentUser.password === decoding(password)) {
      dispatch({
        // login başarılıysa dispatch hangi işlemi yapacağını ayarlıyoruz
        type: "LOGIN",
        payload: currentUser,
      });

      localStorage.setItem(
        JSON.stringify(currentUser.mail),
        JSON.stringify(decoding(currentUser.password))
      );

      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    }

    // (currentUser.password === decoding(password)) && setSuccess(true); setTimeout(() => {navigate("/")}, 1000);  knk bunun içine entegre edemedim o yüzden aynısını daha açık yazdım
  };

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
            Log-in to your account
          </h1>
          <p className="text-sm text-neutral-400 text-left">
            Continue from where you left off with Nox.
          </p>
        </div>

        {/* FORM */}
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <input
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-100 focus:outline-none focus:border-black"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-100 focus:outline-none focus:border-black"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          {!success ? (
            <button
              type="submit"
              className="w-full rounded-full bg-black py-3 text-white text-sm font-medium hover:bg-neutral-700 transition"
            >
              Log in
            </button>
          ) : (
            <div className="w-full rounded-full py-3 bg-green-600 text-white text-sm font-medium text-center">
              Welcome 🎉
            </div>
          )}
        </form>

        {/* FOOTER */}
        <p className="mt-8 text-center text-sm text-neutral-400 float-right pr-1">
          You don't have an account?
          <a
            href="/signup"
            className="ml-1 text-neutral-100 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
