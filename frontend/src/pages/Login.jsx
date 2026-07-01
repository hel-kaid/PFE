import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema } from "../schemas/auth";
import { useAuth } from "../hooks/useAuth";
import { User, Lock, Gamepad2, AlertCircle } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setGlobalError("");
    setErrors({});

    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = {};

      result.error.errors.forEach((e) => {
        fieldErrors[e.path[0]] = e.message;
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      setIsLoading(true);
      await login(result.data);
      navigate("/");
    } catch (err) {
      const backendErrors = err.response?.data?.errors;
      const backendMessage = err.response?.data?.message;

      if (backendErrors) {
        const formattedErrors = {};

        Object.keys(backendErrors).forEach((key) => {
          formattedErrors[key] = backendErrors[key][0];
        });

        setErrors(formattedErrors);
      } else if (backendMessage) {
        setGlobalError(backendMessage);
      } else {
        setGlobalError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white shadow-2xl border border-slate-200">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg">
            <Gamepad2 className="text-white w-7 h-7" />
          </div>

          <h1 className="text-2xl font-black mt-4">
            Welcome Back
          </h1>

          <p className="text-slate-500 text-sm">
            Sign in to continue your coding adventure.
          </p>
        </div>

        {/* GLOBAL ERROR */}
        {globalError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />

            <div>
              <p className="text-red-800 text-sm font-semibold">
                Error
              </p>

              <p className="text-red-700 text-sm mt-1">
                {globalError}
              </p>
            </div>
          </div>
        )}

        {/* FORM */}
        <div className="space-y-4">

          {/* USERNAME */}
          <div>
            <label className="text-sm text-slate-600 font-semibold">
              Username
            </label>

            <div
              className={`flex items-center gap-2 border rounded-xl px-3 py-2 focus-within:border-orange-400 transition ${
                errors.username
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200"
              }`}
            >
              <User className="w-4 h-4 text-slate-400" />

              <input
                className="w-full outline-none text-sm bg-transparent"
                placeholder="Enter your username"
                value={form.username}
                onChange={(e) => {
                  setForm({ ...form, username: e.target.value });

                  if (errors.username)
                    setErrors({ ...errors, username: "" });
                }}
              />
            </div>

            {errors.username && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.username}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-slate-600 font-semibold">
              Password
            </label>

            <div
              className={`flex items-center gap-2 border rounded-xl px-3 py-2 focus-within:border-orange-400 transition ${
                errors.password
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200"
              }`}
            >
              <Lock className="w-4 h-4 text-slate-400" />

              <input
                type="password"
                className="w-full outline-none text-sm bg-transparent"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });

                  if (errors.password)
                    setErrors({ ...errors, password: "" });
                }}
              />
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.password}
              </p>
            )}
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full mt-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}