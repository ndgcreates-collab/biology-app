"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { useSurvivalStore } from "@/lib/store/useSurvivalStore";
import { avatarColors, avatarColorOptions, characterOptions } from "@/components/survival/avatarTheme";

export default function AvatarPage() {
  const router = useRouter();
  const existing = useSurvivalStore((s) => s.avatar);
  const setAvatar = useSurvivalStore((s) => s.setAvatar);

  const [name, setName] = useState(existing?.name ?? "");
  const [emoji, setEmoji] = useState(existing?.emoji ?? characterOptions[0]);
  const [color, setColor] = useState(existing?.color ?? "emerald");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length === 0) return;
    setAvatar({ name: name.trim(), emoji, color });
    router.push("/survival");
  }

  const theme = avatarColors[color];

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-gray-900">
        {existing ? "Edit your survivor" : "Create your survivor"}
      </h1>
      <p className="mt-1 text-sm text-gray-600">
        Your avatar will face escalating ecosystem crises. Customize it, then enter the forest.
      </p>

      <div className="mt-6 flex justify-center">
        <div className={`flex h-28 w-28 items-center justify-center rounded-full ${theme.bg} text-6xl ring-4 ${theme.ring}`}>
          {emoji}
        </div>
      </div>

      <form onSubmit={handleSave} className="mx-auto mt-6 max-w-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={24}
            required
            placeholder="e.g. Ranger Ade"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700">Character</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {characterOptions.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setEmoji(c)}
                className={`flex h-12 w-12 items-center justify-center rounded-lg text-2xl ring-2 ${
                  emoji === c ? "ring-emerald-500 bg-emerald-50" : "ring-gray-200 hover:ring-gray-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700">Color</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {avatarColorOptions.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={c}
                onClick={() => setColor(c)}
                className={`h-9 w-9 rounded-full ${avatarColors[c].chip} ring-2 ${
                  color === c ? "ring-gray-800 ring-offset-2" : "ring-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={name.trim().length === 0}
          className="w-full rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-40 hover:bg-emerald-700"
        >
          {existing ? "Save survivor" : "Start surviving →"}
        </button>
      </form>
    </PageContainer>
  );
}
