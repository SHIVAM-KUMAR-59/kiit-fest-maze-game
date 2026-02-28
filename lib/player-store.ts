export interface PlayerInfo {
  id: string; // DB user id
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
    const parsed = JSON.parse(raw) as PlayerInfo;
    // Stale entry from before backend integration — force re-registration
    if (!parsed.id) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearPlayer(): void {
  if (globalThis.window === undefined) return;
  localStorage.removeItem(STORAGE_KEY);
}
