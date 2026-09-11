"use client";

export default function NewsletterForm() {
  return (
    <form
      className="flex w-full max-w-sm gap-2 sm:w-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="you@example.com"
        className="w-full rounded-full border-2 border-white/20 bg-transparent px-4 py-3 text-sm placeholder:text-white/40 focus:border-white focus:outline-none"
      />
      <button
        type="submit"
        className="whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
      >
        Subscribe
      </button>
    </form>
  );
}
