"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, registerAction } from "@/app/actions/auth";

export default function AuthForm({
  mode,
  callbackUrl = "/dashboard",
}: {
  mode: "login" | "registro";
  callbackUrl?: string;
}) {
  const isLogin = mode === "login";
  const [state, formAction, pending] = useActionState(
    isLogin ? loginAction : registerAction,
    undefined
  );

  return (
    <form action={formAction} className="paper-card p-8">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <h1 className="text-2xl font-extrabold">
        {isLogin ? "Ingresa a tu cuenta" : "Crea tu cuenta gratis"}
      </h1>
      <p className="mt-2 text-sm text-black/60">
        {isLogin
          ? "Continúa tu aprendizaje donde lo dejaste."
          : "Empieza a capacitarte hoy mismo, sin tarjeta de crédito."}
      </p>

      {state?.error && (
        <p className="mt-4 rounded-xl bg-[#FF4A60]/10 px-4 py-2 text-sm font-medium text-[#FF4A60]">
          {state.error}
        </p>
      )}

      <div className="mt-6 grid gap-3">
        {!isLogin && (
          <input
            required
            name="name"
            type="text"
            placeholder="Nombre completo"
            className="rounded-2xl border-2 border-black/10 px-4 py-3 text-sm focus:border-black focus:outline-none"
          />
        )}
        <input
          required
          name="email"
          type="email"
          placeholder="Correo electrónico"
          className="rounded-2xl border-2 border-black/10 px-4 py-3 text-sm focus:border-black focus:outline-none"
        />
        <input
          required
          name="password"
          type="password"
          minLength={isLogin ? undefined : 6}
          placeholder="Contraseña"
          className="rounded-2xl border-2 border-black/10 px-4 py-3 text-sm focus:border-black focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="paper-btn mt-2 bg-black px-6 py-3 text-sm text-white disabled:opacity-60"
        >
          {pending ? "Un momento..." : isLogin ? "Ingresar" : "Crear cuenta"}
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-black/60">
        {isLogin ? (
          <>
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="font-semibold underline">
              Regístrate
            </Link>
          </>
        ) : (
          <>
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="font-semibold underline">
              Ingresa
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
