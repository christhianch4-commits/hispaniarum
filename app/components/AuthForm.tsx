"use client";

import { useState } from "react";
import Link from "next/link";

export default function AuthForm({ mode }: { mode: "login" | "registro" }) {
  const [submitted, setSubmitted] = useState(false);
  const isLogin = mode === "login";

  if (submitted) {
    return (
      <div className="paper-card p-8 text-center">
        <p className="text-2xl">👋</p>
        <p className="mt-2 font-bold">
          {isLogin ? "¡Bienvenido de vuelta!" : "¡Cuenta creada!"}
        </p>
        <p className="mt-1 text-sm text-black/60">
          Esta es una demo visual: en producción aquí se validaría tu acceso.
        </p>
        <Link
          href="/dashboard"
          className="paper-btn mt-5 inline-block bg-black px-6 py-3 text-sm text-white"
        >
          Ir a mi panel
        </Link>
      </div>
    );
  }

  return (
    <form
      className="paper-card p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <h1 className="text-2xl font-extrabold">
        {isLogin ? "Ingresa a tu cuenta" : "Crea tu cuenta gratis"}
      </h1>
      <p className="mt-2 text-sm text-black/60">
        {isLogin
          ? "Continúa tu aprendizaje donde lo dejaste."
          : "Empieza a capacitarte hoy mismo, sin tarjeta de crédito."}
      </p>

      <div className="mt-6 grid gap-3">
        {!isLogin && (
          <input
            required
            type="text"
            placeholder="Nombre completo"
            className="rounded-2xl border-2 border-black/10 px-4 py-3 text-sm focus:border-black focus:outline-none"
          />
        )}
        <input
          required
          type="email"
          placeholder="Correo electrónico"
          className="rounded-2xl border-2 border-black/10 px-4 py-3 text-sm focus:border-black focus:outline-none"
        />
        <input
          required
          type="password"
          placeholder="Contraseña"
          className="rounded-2xl border-2 border-black/10 px-4 py-3 text-sm focus:border-black focus:outline-none"
        />
        <button
          type="submit"
          className="paper-btn mt-2 bg-black px-6 py-3 text-sm text-white"
        >
          {isLogin ? "Ingresar" : "Crear cuenta"}
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
