// src/app/api/preferences/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Force usage of Node.js runtime (so we can use "fs").
export const runtime = "nodejs";

// Optional: export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data");
const PREFS_FILE = path.join(DATA_DIR, "preferences.json");

/**
 * Ensures the data folder + preferences file exist.
 */
async function ensureDataStructure() {
  try {
    // Check if data/ folder exists, if not, create it
    try {
      await fs.access(DATA_DIR);
    } catch {
      await fs.mkdir(DATA_DIR, { recursive: true });
      console.log("Created data directory:", DATA_DIR);
    }

    // Check if preferences.json exists, if not, create empty
    try {
      await fs.access(PREFS_FILE);
    } catch {
      await fs.writeFile(PREFS_FILE, JSON.stringify({}, null, 2), "utf8");
      console.log("Created empty preferences.json at:", PREFS_FILE);
    }
  } catch (error) {
    console.error("Error ensuring data structure:", error);
    throw error;
  }
}

/**
 * GET /api/preferences => Return the JSON from preferences.json
 */
export async function GET() {
  try {
    await ensureDataStructure();
    const data = await fs.readFile(PREFS_FILE, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to read preferences" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/preferences => Save the posted data into preferences.json
 */
export async function POST(request: Request) {
  try {
    await ensureDataStructure();
    const postedData = await request.json();

    // Attach a timestamp
    const dataToSave = {
      ...postedData,
      lastUpdated: new Date().toISOString(),
    };

    await fs.writeFile(PREFS_FILE, JSON.stringify(dataToSave, null, 2), "utf8");
    console.log("Saved preferences to:", PREFS_FILE);

    return NextResponse.json({
      success: true,
      lastUpdated: dataToSave.lastUpdated,
    });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to save preferences" },
      { status: 500 },
    );
  }
}
