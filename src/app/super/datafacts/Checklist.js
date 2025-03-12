import React, { useState } from "react";
import {
  Check,
  CheckCircle,
  Circle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Checklist = ({ data }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  // Calculate completion percentage
  const calculateCompletion = (categoryItems) => {
    if (!categoryItems || categoryItems.length === 0) return 0;

    const checkedCount = categoryItems.filter(
      (item) => checkedItems[`${item.category}-${item.task}`],
    ).length;

    return Math.round((checkedCount / categoryItems.length) * 100);
  };

  // Toggle item checked state
  const toggleItem = (category, task) => {
    const key = `${category}-${task}`;
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="w-full">
      <h3 className="font-medium text-gray-900 mb-3">{data.title}</h3>

      {/* Categories */}
      <div className="space-y-4">
        {data.categories ? (
          // Render categories with items
          data.categories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Category header */}
              <div
                className="bg-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer"
                onClick={() => toggleCategory(category.name)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-800">
                      {calculateCompletion(category.items)}%
                    </span>
                  </div>
                  <h4 className="font-medium">{category.name}</h4>
                </div>
                {expandedCategories[category.name] ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {/* Category items */}
              {expandedCategories[category.name] !== false && (
                <div className="p-4 space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-start gap-3 pb-2 border-b border-gray-100 last:border-0"
                    >
                      <div
                        className="mt-0.5 cursor-pointer"
                        onClick={() => toggleItem(category.name, item.task)}
                      >
                        {checkedItems[`${category.name}-${item.task}`] ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <p
                            className={`text-sm ${
                              checkedItems[`${category.name}-${item.task}`]
                                ? "text-gray-500 line-through"
                                : "text-gray-900"
                            }`}
                          >
                            {item.task}

                            {/* Show tag for essential/recommended items */}
                            {item.essential && (
                              <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">
                                Essential
                              </span>
                            )}
                            {item.recommended && !item.essential && (
                              <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                Recommended
                              </span>
                            )}
                            {item.sfSpecific && (
                              <span className="ml-2 px-1.5 py-0.5 text-xs bg-purple-100 text-purple-800 rounded-full">
                                SF Specific
                              </span>
                            )}
                          </p>

                          {/* Show warning for critical items */}
                          {item.critical &&
                            !checkedItems[`${category.name}-${item.task}`] && (
                              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            )}
                        </div>

                        {/* Item details or description */}
                        {item.description && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          // Render simple items list
          <div className="border border-gray-200 rounded-lg overflow-hidden p-4 space-y-3">
            {data.items?.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 pb-2 border-b border-gray-100 last:border-0"
              >
                <div
                  className="mt-0.5 cursor-pointer"
                  onClick={() => toggleItem("main", item.task || item)}
                >
                  {checkedItems[`main-${item.task || item}`] ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </div>
                <div>
                  <p
                    className={`text-sm ${
                      checkedItems[`main-${item.task || item}`]
                        ? "text-gray-500 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {item.task || item}

                    {/* Show tag for essential/recommended items */}
                    {item.essential && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">
                        Essential
                      </span>
                    )}
                    {item.recommended && !item.essential && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                        Recommended
                      </span>
                    )}
                  </p>

                  {/* Item details or description */}
                  {item.description && (
                    <p className="text-xs text-gray-500 mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Note or instruction */}
      {data.note && (
        <p className="text-xs text-gray-500 mt-3 italic">{data.note}</p>
      )}
    </div>
  );
};

export default Checklist;
