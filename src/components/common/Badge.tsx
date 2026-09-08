import React from 'react';
import { CheckCircle2, AlertCircle, Clock, Sparkles, AlertTriangle, BookOpen } from 'lucide-react';
import { CompetencyMasteryStatus, InterventionSeverity, InterventionStatus } from '../../types/mathsmart';

interface BadgeProps {
  status: CompetencyMasteryStatus | InterventionSeverity | InterventionStatus | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, size = 'md', showIcon = true }) => {
  let colorStyles = 'bg-slate-100 text-slate-700 border-slate-200';
  let IconComponent = Clock;

  switch (status) {
    case 'Mastered':
      colorStyles = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      IconComponent = CheckCircle2;
      break;
    case 'Improved':
      colorStyles = 'bg-teal-50 text-teal-800 border-teal-200';
      IconComponent = Sparkles;
      break;
    case 'Learning':
      colorStyles = 'bg-sky-50 text-sky-800 border-sky-200';
      IconComponent = BookOpen;
      break;
    case 'Developing':
      colorStyles = 'bg-amber-50 text-amber-800 border-amber-200';
      IconComponent = Clock;
      break;
    case 'Needs Improvement':
    case 'Needs Support':
      colorStyles = 'bg-rose-50 text-rose-800 border-rose-200';
      IconComponent = AlertCircle;
      break;
    case 'Recommended':
      colorStyles = 'bg-indigo-50 text-indigo-800 border-indigo-200';
      IconComponent = Sparkles;
      break;
    case 'Upcoming':
      colorStyles = 'bg-slate-100 text-slate-600 border-slate-200';
      IconComponent = Clock;
      break;
    // Intervention Severities
    case 'HIGH':
      colorStyles = 'bg-rose-100 text-rose-900 border-rose-300 font-semibold';
      IconComponent = AlertTriangle;
      break;
    case 'MEDIUM':
      colorStyles = 'bg-amber-100 text-amber-900 border-amber-300';
      IconComponent = AlertCircle;
      break;
    case 'LOW':
      colorStyles = 'bg-slate-100 text-slate-700 border-slate-300';
      IconComponent = Clock;
      break;
    // Intervention Status
    case 'Needs Intervention':
      colorStyles = 'bg-rose-50 text-rose-800 border-rose-200';
      IconComponent = AlertTriangle;
      break;
    case 'In Progress':
      colorStyles = 'bg-amber-50 text-amber-800 border-amber-200';
      IconComponent = Clock;
      break;
    case 'Resolved':
      colorStyles = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      IconComponent = CheckCircle2;
      break;
    default:
      colorStyles = 'bg-slate-100 text-slate-700 border-slate-200';
      IconComponent = Clock;
  }

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border ${sizeStyles} ${colorStyles} transition-colors whitespace-nowrap`}
    >
      {showIcon && <IconComponent className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      <span>{status}</span>
    </span>
  );
};
