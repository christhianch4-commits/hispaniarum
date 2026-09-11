"use client";

import { useState } from "react";
import type { Module } from "@/app/data/courses";

export default function CurriculumAccordion({ modules }: { modules: Module[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y-2 divide-black/10 border-y-2 border-black/10">
      {modules.map((module, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={module.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="font-bold">
                {i + 1}. {module.title}
              </span>
              <span className="flex items-center gap-3 text-sm text-black/50">
                {module.lessons.length}{" "}
                {module.lessons.length === 1 ? "clase" : "clases"}
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 10 6"
                  fill="none"
                  className={isOpen ? "rotate-180" : ""}
                >
                  <path
                    d="M1 1l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            {isOpen && (
              <ul className="pb-4">
                {module.lessons.map((lesson) => (
                  <li
                    key={lesson.title}
                    className="flex items-center justify-between gap-4 rounded-xl px-3 py-2 text-sm hover:bg-black/5"
                  >
                    <span className="flex items-center gap-2">
                      <span aria-hidden>▶</span>
                      {lesson.title}
                      {lesson.free && (
                        <span className="rounded-md bg-black px-1.5 py-0.5 text-[10px] font-semibold text-white">
                          Vista previa
                        </span>
                      )}
                    </span>
                    <span className="text-black/40">{lesson.duration}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
