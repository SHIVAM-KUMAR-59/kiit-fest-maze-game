export interface PlayerInfo {
  name: string;
  email: string;
  kfid: string;
}

const STORAGE_KEY = "kiitfest_player";

export function savePlayer(info: PlayerInfo): void {
  if (globalThis.window === undefined) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
}

export function loadPlayer(): PlayerInfo | null {
  if (globalThis.window === undefined) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PlayerInfo;
  } catch {
    return null;
  }
}

export function clearPlayer(): void {
  if (globalThis.window === undefined) return;
  localStorage.removeItem(STORAGE_KEY);
}
