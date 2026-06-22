import React from 'react';

interface StatCardProps {
  id: string;
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
}

export default function StatCard({ id, title, value, description, icon, colorClass }: StatCardProps) {
  return (
    <div id={id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4 hover:shadow-md transition-shadow duration-200">
      <div className={`p-3 rounded-xl ${colorClass} text-white shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-bold font-display text-slate-800 mt-1 leading-tight">{value}</p>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      </div>
    </div>
  );
}
