import React from 'react';
import { Bookmark, MapPin, Briefcase, DollarSign, Calendar, Sparkles, CheckCircle } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  id: string;
  job: Job;
  isSelected: boolean;
  isBookmarked: boolean;
  isApplied: boolean;
  applicationStatus?: 'Applied' | 'Screening' | 'Interviewing' | 'Selected' | 'Rejected';
  onSelect: () => void;
  onToggleBookmark: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  job,
  isSelected,
  isBookmarked,
  isApplied,
  applicationStatus,
  onSelect,
  onToggleBookmark,
}) => {
  // Determine application status color helper
  const getStatusStyle = (status?: string) => {
    switch (status) {
      case 'Selected':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Interviewing':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Screening':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div
      id={id}
      onClick={onSelect}
      className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative flex flex-col gap-4 ${
        isSelected
          ? 'border-indigo-600 bg-indigo-50/40 shadow-xs'
          : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      {/* Top Section */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-center gap-3">
          {/* Logo container using styled colors with the company initializer */}
          <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center font-bold tracking-wider shrink-0 ${job.logoColor || 'bg-slate-500'}`}>
            {job.company.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{job.company}</span>
              {job.isFeatured && (
                <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded-sm font-semibold flex items-center gap-0.5">
                  <Sparkles size={8} /> Featured
                </span>
              )}
            </div>
            <h3 className="font-bold text-slate-800 text-base mt-0.5 line-clamp-1 group-hover:text-indigo-600">
              {job.title}
            </h3>
          </div>
        </div>

        {/* Bookmark toggle button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark();
          }}
          className={`p-2 rounded-lg transition-colors shrink-0 ${
            isBookmarked
              ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
              : 'text-slate-400 bg-slate-50 hover:bg-slate-100 hover:text-slate-600'
          }`}
          aria-label="Bookmark job"
        >
          <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Core details */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-slate-600">
        <div className="flex items-center gap-1.5 min-w-0">
          <MapPin size={13} className="text-slate-400 shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5 min-w-0">
          <Briefcase size={13} className="text-slate-400 shrink-0" />
          <span className="truncate">{job.type}</span>
        </div>
        <div className="flex items-center gap-1.5 min-w-0">
          <DollarSign size={13} className="text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-700 truncate">{job.salary}</span>
        </div>
        <div className="flex items-center gap-1.5 min-w-0">
          <Calendar size={13} className="text-slate-400 shrink-0" />
          <span className="truncate">Deadline: {job.deadline}</span>
        </div>
      </div>

      {/* Key Skills Tags list */}
      <div className="flex flex-wrap gap-1.5 mt-1">
        {job.skillsNeeded.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
          >
            {skill}
          </span>
        ))}
        {job.skillsNeeded.length > 3 && (
          <span className="text-[10px] font-medium text-slate-400 px-1 py-0.5">
            +{job.skillsNeeded.length - 3} more
          </span>
        )}
      </div>

      {/* Bottom Footer block - Eligible Batch and Applied Badge */}
      <div className="flex justify-between items-center pt-3 border-t border-slate-50 text-xs">
        <div className="text-slate-400 font-medium">
          Target: <span className="text-indigo-600 font-semibold">{job.batch}</span>
        </div>

        {isApplied ? (
          <div className={`px-2 py-1 rounded-md text-[11px] font-semibold border flex items-center gap-1 ${getStatusStyle(applicationStatus)}`}>
            <CheckCircle size={12} />
            {applicationStatus || 'Applied'}
          </div>
        ) : (
          <div className="text-slate-400 text-[10px]">{job.postedDate}</div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
