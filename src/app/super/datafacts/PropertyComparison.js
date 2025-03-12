import React, { useState } from 'react';
import { Check, X, ArrowUp, ArrowDown, Info, Star, StarHalf, Home, Building, MapPin } from 'lucide-react';

const PropertyComparison = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  
  // Helper function to render value with appropriate formatting
  const renderValue = (value, category) => {
    if (value === null || value === undefined) return '—';
    
    // For numeric values, format appropriately based on the category
    if (typeof value === 'number') {
      const lowerCategory = category.toLowerCase();
      
      // Format as price
      if (lowerCategory.includes('price') || 
          lowerCategory.includes('cost') || 
          lowerCategory.includes('value') ||
          lowerCategory.includes('investment')) {
        return `$${value.toLocaleString()}`;
      }
      
      // Format as percentage
      if (lowerCategory.includes('rate') || 
          lowerCategory.includes('percentage') ||
          lowerCategory.includes('growth') || 
          lowerCategory.includes('return')) {
        return `${value}%`;
      }
      
      // Format as rating
      if (lowerCategory.includes('rating') || lowerCategory.includes('score')) {
        return (
          <div className="flex items-center">
            {[...Array(Math.floor(value))].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
            ))}
            {value % 1 >= 0.5 && <StarHalf className="w-3 h-3 text-yellow-500 fill-current" />}
            <span className="ml-1 text-sm">{value.toFixed(1)}</span>
          </div>
        );
      }
      
      // Default number formatting
      return value.toLocaleString();
    }
    
    // For boolean values
    if (typeof value === 'boolean') {
      return value ? 
        <Check className="w-5 h-5 text-green-500 mx-auto" /> : 
        <X className="w-5 h-5 text-red-400 mx-auto" />;
    }
    
    // For arrays (features, amenities, etc.)
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((item, i) => (
            <span key={i} className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      );
    }
    
    // Default to returning the value as is
    return value;
  };
  
  // Determine if there's a comparison for property types
  const isPropertyTypeComparison = data.items && 
    data.items.some(item => item.type && (
      item.type.toLowerCase().includes('home') || 
      item.type.toLowerCase().includes('condo') || 
      item.type.toLowerCase().includes('family')
    ));
  
  // Get appropriate icon for property type
  const getPropertyIcon = (item) => {
    if (!item.type) return Home;
    
    const lowerType = item.type.toLowerCase();
    if (lowerType.includes('condo') || 
        lowerType.includes('apartment') || 
        lowerType.includes('multi')) {
      return Building;
    }
    
    return Home;
  };
  
  // Helper function to determine if a value is "better" than another
  const isBetter = (value1, value2, category) => {
    if (typeof value1 !== 'number' || typeof value2 !== 'number') return null;
    
    const lowerCategory = category.toLowerCase();
    
    // For metrics where higher is better
    if (lowerCategory.includes('score') || 
        lowerCategory.includes('rating') || 
        lowerCategory.includes('space') ||
        lowerCategory.includes('size') ||
        lowerCategory.includes('return') ||
        lowerCategory.includes('yield') ||
        lowerCategory.includes('income')) {
      return value1 > value2;
    }
    
    // For metrics where lower is better
    if (lowerCategory.includes('price') || 
        lowerCategory.includes('cost') || 
        lowerCategory.includes('payment') ||
        lowerCategory.includes('tax') ||
        lowerCategory.includes('risk') ||
        lowerCategory.includes('fees') ||
        lowerCategory.includes('commute')) {
      return value1 < value2;
    }
    
    // Default to higher is better
    return value1 > value2;
  };
  
  // For scenario comparison (like fixer-upper vs move-in ready)
  const renderScenarioComparison = () => {
    if (!data.scenario || !data.comparison) return null;
    
    return (
      <div className="space-y-4">
        {/* Scenario details */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-medium text-sm text-blue-800 mb-1">Scenario</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-medium">{data.scenario.neighborhoodExample}</p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm">{data.scenario.propertyDetails}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <p className="text-xs text-gray-500">Option 1 Cost</p>
              <p className="text-sm font-medium">{data.scenario.fixerUpperPrice}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Option 2 Cost</p>
              <p className="text-sm font-medium">{data.scenario.moveInReadyPrice}</p>
            </div>
          </div>
        </div>
        
        {/* Navigation tabs */}
        <div className="flex border-b border-gray-200">
          {data.comparison.map((section, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-sm font-medium ${
                selectedTab === index 
                  ? 'text-blue-600 border-b-2 border-blue-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedTab(index)}
            >
              {section.category}
            </button>
          ))}
        </div>
        
        {/* Comparison content */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
            <div className="p-3 font-medium text-sm text-gray-500 border-r border-gray-200">Feature</div>
            <div className="p-3 font-medium text-sm text-blue-600 border-r border-gray-200">Option 1</div>
            <div className="p-3 font-medium text-sm text-blue-600">Option 2</div>
          </div>
          
          {Object.entries(data.comparison[selectedTab].fixerUpper).map(([key, value], index) => {
            const readyValue = data.comparison[selectedTab].moveInReady[key];
            
            return (
              <div 
                key={index} 
                className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200 last:border-b-0`}
              >
                <div className="p-3 text-sm font-medium border-r border-gray-200">
                  {key.replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase())
                    .replace(/([A-Z])\s(?=[A-Z])/g, '$1')}
                </div>
                <div className="p-3 text-sm border-r border-gray-200">{value}</div>
                <div className="p-3 text-sm">{readyValue}</div>
              </div>
            );
          })}
        </div>
        
        {/* Best for section */}
        {data.bestFor && (
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium text-sm text-blue-700 mb-2">Best For: Option 1</h4>
              <ul className="space-y-1">
                {data.bestFor.fixerUpper.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium text-sm text-blue-700 mb-2">Best For: Option 2</h4>
              <ul className="space-y-1">
                {data.bestFor.moveInReady.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // For property type comparison (like single-family vs condo vs TIC)
  const renderPropertyTypeComparison = () => {
    if (!data.items) return null;
    
    return (
      <div>
        {/* Items cards in grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {data.items.map((item, index) => {
            const IconComponent = getPropertyIcon(item);
            
            return (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gray-50 p-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-blue-600" />
                    </div>
                    <h4 className="font-medium text-gray-900">{item.type}</h4>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-3 space-y-3">
                  {/* Pricing info */}
                  <div>
                    <p className="text-xs text-gray-500">Pricing</p>
                    <p className="font-medium">{item.pricing}</p>
                  </div>
                  
                  {/* Ownership */}
                  <div>
                    <p className="text-xs text-gray-500">Ownership Structure</p>
                    <p className="text-sm">{item.ownership}</p>
                  </div>
                  
                  {/* Financing */}
                  <div>
                    <p className="text-xs text-gray-500">Financing Options</p>
                    <p className="text-sm">{item.financing}</p>
                  </div>
                  
                  {/* Advantages */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Advantages</p>
                    <ul className="space-y-1">
                      {item.advantages.slice(0, 3).map((advantage, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{advantage}</span>
                        </li>
                      ))}
                      {item.advantages.length > 3 && (
                        <li className="text-xs text-blue-600">
                          +{item.advantages.length - 3} more advantages
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  {/* Disadvantages */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Considerations</p>
                    <ul className="space-y-1">
                      {item.disadvantages.slice(0, 2).map((disadvantage, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{disadvantage}</span>
                        </li>
                      ))}
                      {item.disadvantages.length > 2 && (
                        <li className="text-xs text-blue-600">
                          +{item.disadvantages.length - 2} more considerations
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  {/* Typical buyer */}
                  {item.typicalBuyer && (
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <p className="text-xs text-blue-700 font-medium">Typical Buyer</p>
                      <p className="text-sm">{item.typicalBuyer}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="w-full">
      <h3 className="font-medium text-gray-900 mb-3">{data.title}</h3>
      
      {/* Different comparison layouts based on data type */}
      {data.scenario ? renderScenarioComparison() : isPropertyTypeComparison ? renderPropertyTypeComparison() : (
        <table className="w-full border-collapse rounded-lg overflow-hidden border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200">Attribute</th>
              {data.items.map((item, index) => (
                <th key={index} className="p-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                  {item.type || item.name || `Option ${index + 1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Generate rows for each comparison attribute */}
            {Object.keys(data.items[0]).filter(key => key !== 'type' && key !== 'name').map((attribute, rowIndex) => {
              // Skip certain fields from table display
              if (['id', 'image', 'description'].includes(attribute)) return null;
              
              // Format attribute name for display
              const displayName = attribute
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase())
                .replace(/([A-Z])\s(?=[A-Z])/g, '$1');
              
              return (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-3 text-sm font-medium border-b border-gray-200 whitespace-nowrap">
                    {displayName}
                  </td>
                  
                  {data.items.map((item, colIndex) => {
                    const value = item[attribute];
                    
                    // Calculate if this value is better than others (for highlighting)
                    let isBestValue = false;
                    if (typeof value === 'number') {
                      isBestValue = data.items
                        .filter((_, i) => i !== colIndex)
                        .every(otherItem => 
                          isBetter(value, otherItem[attribute], attribute)
                        );
                    }
                    
                    return (
                      <td 
                        key={colIndex} 
                        className={`p-3 text-sm border-b border-gray-200 ${
                          isBestValue ? 'bg-green-50' : ''
                        }`}
                      >
                        {renderValue(value, attribute)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PropertyComparison;
