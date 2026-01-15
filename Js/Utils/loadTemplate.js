export async function loadTemplate(path) {
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error("Failed to load template");
        return await res.text();
    } catch (err) {
        console.error("Template load error:", err);
        return null;
    }
}
