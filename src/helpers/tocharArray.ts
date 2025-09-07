const toStringArray = (v: unknown): string[] => {
  if (Array.isArray(v)) return v.map((s) => String(s).trim()).filter(Boolean);
  if (typeof v === "string")
    return v
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
};
