import React, { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, ChevronRight, ChevronDown, FileText, User, DollarSign, Home, Key } from 'lucide-react';

const Timeline = ({ data }) => {
  const [expandedStep, setExpandedStep] = useState(null);
  
  // Toggle expanded step
  const toggleStep = (day) => {
    setExpandedStep(expandedStep === day ? null : day);
  };
  
  // Get icon based on event type
  const getEventIcon = (event) => {
    const lowerEvent = event.toLowerCase();
    
    if (lowerEvent.includes('inspection')) return AlertCircle;
    if (lowerEvent.includes('document') || lowerEvent.includes('disclosure')) return FileText;
    if (lowerEvent.includes('appraisal')) return Home;
    if (lowerEvent.includes('approval') || lowerEvent.includes('final')) return CheckCircle;
    if (lowerEvent.includes('sign')) return FileText;
    if (lowerEvent.includes('loan') || lowerEvent.includes('mortgage')) return DollarSign;
    if (lowerEvent.includes('agent') || lowerEvent.includes('buyer') || lowerEvent.includes('seller')) return User;
    if (lowerEvent.includes('keys') || lowerEvent.includes('possession')) return Key;
    
    return Clock;
  };
  
  // Group steps by week for better visualization
  const groupStepsByWeek = () => {
    if (!data.steps || data.steps.length === 0) return [];
    
    const groups = [];
    let currentGroup = { week: 1, steps: [] };
    
    data.steps.forEach(step => {
      const week = Math.ceil(step.day / 7);
      
      if (week !== currentGroup.week && currentGroup.steps.length > 0) {
        groups.push(currentGroup);
        currentGroup = { week, steps: [step] };
      } else {
        currentGroup.steps.push(step);
      }
    });
    
    // Add the last group
    if (currentGroup.steps.length > 0) {
      groups.push(currentGroup);
    }
    
    return groups;
  };
  
  const weeklyGroups = groupStepsByWeek();
  
  return (
    <div className="w-full">
      <h3 className="font-medium text-gray-900 mb-4">{data.title}</h3>
      
      <div className="space-y-6">
        {weeklyGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h4 className="font-medium text-gray-700">Week {group.week}</h4>
              <p className="text-xs text-gray-500">
                Days {(group.week - 1) * 7 + 1} - {Math.min(group.week * 7, data.steps[data.steps.length - 1].day)}
              </p>
            </div>
            
            <div className="p-2">
              {group.steps.map((step, stepIndex) => {
                const IconComponent = getEventIcon(step.event);
                const isExpanded = expandedStep === step.day;
                const isLastInGroup = stepIndex === group.steps.length - 1;
                
                return (
                  <div 
                    key={stepIndex} 
                    className={`relative ${!isLastInGroup ? 'pb-4' : ''}`}
                  >
                    {/* Connecting line */}
                    {!isLastInGroup && (
                      <div 
                        className="absolute left-6 top-6 bottom-0 w-0.5 bg-gray-200"
                        style={{ marginLeft: '-1px' }}
                      ></div>
                    )}
                    
                    <div 
                      className={`flex items-start p-2 rounded-lg cursor-pointer transition-colors ${isExpanded ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                      onClick={() => toggleStep(step.day)}
                    >
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center z-10 ${isExpanded ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        <IconComponent className={`w-5 h-5 ${isExpanded ? 'text-blue-600' : 'text-gray-600'}`} />
                      </div>
                      
                      {/* Content */}
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                              Day {step.day}
                            </span>
                            <h4 className="font-medium text-gray-900 mt-1">{step.event}</h4>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        
                        {/* Expanded content */}
                        {isExpanded && step.description && (
                          <div className="mt-2 text-sm text-gray-600">
                            {step.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Overall timeline stats */}
      <div className="mt-6 flex justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
        <div>
          <p className="text-xs text-gray-500">Start</p>
          <p className="font-medium">Day 1</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Expected Closing</p>
          <p className="font-medium">Day {data.steps[data.steps.length - 1].day}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Total Duration</p>
          <p className="font-medium">{data.steps[data.steps.length - 1].day} Days</p>
        </div>
      </div>
      
      {/* Notes or tips */}
      {data.notes && (
        <div className="mt-4 bg-blue-50 rounded-lg p-3 text-sm text-blue-700">
          <p className="font-medium mb-1">Notes:</p>
          <p>{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export default Timeline;
