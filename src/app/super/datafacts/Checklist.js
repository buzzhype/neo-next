"use client";
import React from "react";

/**
 * Checklist
 *
 * Expects `data` to have a shape like:
 * {
 *   title?: string,
 *   items: string[]   // or array of objects if you prefer
 * }
 *
 * If you want check-state, you can store it in local component state,
 * or handle it in the parent. This example is read-only by default.
 */
export default function Checklist({ data }) {
  // If `data` is missing or has no items array, handle gracefully
  if (!data || !Array.isArray(data.items)) {
    return (
      <div className="p-3 text-sm text-gray-500">No checklist items found.</div>
    );
  }

  return (
    <div className="p-3 border border-gray-200 rounded bg-white space-y-2">
      {/* Optional title */}
      {data.title && (
        <h3 className="text-base font-semibold text-gray-800">{data.title}</h3>
      )}

      <ul className="space-y-1">
        {data.items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="form-checkbox text-blue-600 h-4 w-4"
              // If you want dynamic check-state, handle in parent or local state
            />
            <span className="text-sm text-gray-700 leading-tight">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
