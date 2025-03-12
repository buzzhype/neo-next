"use client";
import React, { useState } from "react";
import { CheckCircle, ChevronDown, ChevronRight } from "lucide-react";

/**
 * Enhanced Checklist Component
 *
 * Supports multiple data formats:
 * 1. Simple array of strings:
 *    { title: "My Checklist", items: ["Item 1", "Item 2", ...] }
 *
 * 2. Categorized items:
 *    {
 *      title: "My Checklist",
 *      categories: [
 *        {
 *          name: "Category 1",
 *          tasks: [
 *            { task: "Task 1", essential: true },
 *            { task: "Task 2", recommended: true }
 *          ]
 *        }
 *      ]
 *    }
 *
 * 3. Items with categories (alternative format):
 *    {
 *      title: "My Checklist",
 *      items: [
 *        { category: "Category 1", tasks: [...] }
 *      ]
 *    }
 */
export default function Checklist({ data }) {
  const [expandedCategories, setExpandedCategories] = useState({});

  // Toggle category expansion
  const toggleCategory = (categoryIndex) => {
    setExpandedCategories({
      ...expandedCategories,
      [categoryIndex]: !expandedCategories[categoryIndex],
    });
  };

  // If no data provided
  if (!data) {
    return (
      <div className="p-3 text-sm text-gray-500">
        No checklist data provided.
      </div>
    );
  }

  // Determine data structure format
  const hasCategories =
    Array.isArray(data.categories) && data.categories.length > 0;
  const hasCategorizedItems =
    Array.isArray(data.items) &&
    data.items.length > 0 &&
    typeof data.items[0] === "object" &&
    (data.items[0].category || data.items[0].tasks);
  const hasSimpleItems =
    Array.isArray(data.items) &&
    data.items.length > 0 &&
    typeof data.items[0] === "string";

  // No valid items found
  if (!hasCategories && !hasCategorizedItems && !hasSimpleItems) {
    return (
      <div className="p-3 text-sm text-gray-500">No checklist items found.</div>
    );
  }

  // Render a simple list of items (strings)
  const renderSimpleItems = (items) => (
    <ul className="space-y-1">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center gap-2">
          <input
            type="checkbox"
            className="form-checkbox text-blue-600 h-4 w-4"
          />
          <span className="text-sm text-gray-700 leading-tight">{item}</span>
        </li>
      ))}
    </ul>
  );

  // Render a task item with potential metadata
  const renderTask = (task, idx) => {
    // Handle when task is a string
    if (typeof task === "string") {
      return (
        <li key={idx} className="flex items-center gap-2">
          <input
            type="checkbox"
            className="form-checkbox text-blue-600 h-4 w-4"
          />
          <span className="text-sm text-gray-700 leading-tight">{task}</span>
        </li>
      );
    }

    // Handle when task is an object
    const taskText = task.task || task.text || task.item || "Unnamed task";
    const isEssential = task.essential || task.required || false;
    const isRecommended = task.recommended || false;

    return (
      <li key={idx} className="flex items-start gap-2">
        <input
          type="checkbox"
          className="form-checkbox text-blue-600 h-4 w-4 mt-0.5"
        />
        <div>
          <span className="text-sm text-gray-700 leading-tight">
            {taskText}
          </span>
          {(isEssential || isRecommended) && (
            <div className="flex gap-1 mt-1">
              {isEssential && (
                <span className="px-1.5 py-0.5 bg-red-50 text-red-700 text-xs rounded">
                  Essential
                </span>
              )}
              {isRecommended && (
                <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                  Recommended
                </span>
              )}
            </div>
          )}
          {task.description && (
            <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
          )}
        </div>
      </li>
    );
  };

  // Render a category with tasks
  const renderCategory = (category, categoryIndex) => {
    const categoryName =
      category.name || category.category || "Unnamed Category";
    const tasks = category.tasks || [];
    const isExpanded = expandedCategories[categoryIndex] !== false; // Default to expanded

    return (
      <div key={categoryIndex} className="mb-3 border border-gray-200 rounded">
        {/* Category Header */}
        <button
          onClick={() => toggleCategory(categoryIndex)}
          className="flex justify-between items-center w-full p-2 text-left bg-gray-50 hover:bg-gray-100 transition-colors rounded-t"
        >
          <span className="font-medium text-sm text-gray-800">
            {categoryName}
          </span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {/* Category Tasks */}
        {isExpanded && (
          <div className="p-2">
            <ul className="space-y-2">
              {tasks.map((task, taskIdx) => renderTask(task, taskIdx))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-3 border border-gray-200 rounded bg-white space-y-2">
      {/* Title */}
      {data.title && (
        <h3 className="text-base font-semibold text-gray-800">{data.title}</h3>
      )}

      {/* Render appropriate content based on data structure */}
      {hasSimpleItems && renderSimpleItems(data.items)}

      {hasCategories && (
        <div className="space-y-3">
          {data.categories.map((category, idx) =>
            renderCategory(category, idx),
          )}
        </div>
      )}

      {hasCategorizedItems && (
        <div className="space-y-3">
          {data.items.map((item, idx) => renderCategory(item, idx))}
        </div>
      )}
    </div>
  );
}
