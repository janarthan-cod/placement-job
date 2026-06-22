import React, { useState } from 'react';
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Users,
  Mail,
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  Building,
  GraduationCap,
  ShieldAlert,
  Clock
} from 'lucide-react';
import { Job, JobApplication } from '../types';

interface JobDetailViewProps {
  id: string;
  job: Job | null;
  isBookmarked: boolean;
  isApplied: boolean;
  application: JobApplication | null;
  onApplyClick: () => void;
  onToggleBookmark: () => void;
  onBackToListing?: () => void; // for responsive mobile view toggle
}

type DetailTab = 'overview' | 'requirements' | 'benefits';

export default function JobDetailView({
  id,
  job,
  isBookmarked,
  isApplied,
  application,
  onApplyClick,
  onToggleBookmark,
  onBackToListing,
}: JobDetailViewProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');

  if (!job) {
    return (
      <div id={id} className="h-full bg-slate-50 border border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 animate-bounce">
          <Building size={28} />
        </div>
        <h3 className="text-lg font-bold text-slate-700 font-display">Select standard job drive</h3>
        <p className="text-slate-500 text-sm mt-1 max-w-xs">
          Click on any of the active job opportunities listed on the left panel to examine eligibility, roles, salary structure, and apply.
        </p>
      </div>
    );
  }

  // Application tracker timeline steps helper
  const renderStatusTimeline = (status: JobApplication['status']) => {
    const steps: { name: string; label: string; desc: string }[] = [
      { name: 'Applied', label: '1. Application Filed', desc: 'CV submitted' },
      { name: 'Screening', label: '2. Profile Screening', desc: 'GPA & branch evaluation' },
      { name: 'Interviewing', label: '3. Technical Interviews', desc: 'Panel tests scheduled' },
      { name: 'Selected', label: '4. Continuous Decision', desc: 'Final placement state' },
    ];

    // Determine current index
    let activeIdx = 0;
    if (status === 'Screening') activeIdx = 1;
    else if (status === 'Interviewing') activeIdx = 2;
    else if (status === 'Selected' || status === 'Rejected') activeIdx = 3;

    return (
      <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100/60 mt-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={16} className="text-indigo-600 animate-pulse" />
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Placement Drive Status tracker</h4>
        </div>
        
        {/* Step line layout */}
        <div className="grid grid-cols-4 relative gap-2 mt-4 text-center">
          {steps.map((step, idx) => {
            const isCompleted = idx <= activeIdx;
            const isCurrent = idx === activeIdx;
            const isFinalRejected = status === 'Rejected' && idx === 3;
            
            return (
              <div key={idx} className="flex flex-col items-center relative z-10">
                {/* Visual Circle */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                    isFinalRejected
                      ? 'bg-rose-100 text-rose-600 border-rose-500'
                      : isCurrent
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-4 ring-indigo-100'
                      : isCompleted
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'bg-white text-slate-400 border-slate-200'
                  }`}
                >
                  {isFinalRejected ? '✕' : isCompleted ? '✓' : idx + 1}
                </div>
                
                {/* Labels */}
                <p className={`text-[11px] font-bold mt-2 leading-tight ${
                  isFinalRejected && idx === 3
                    ? 'text-rose-600 font-extrabold'
                    : isCurrent
                    ? 'text-indigo-600 font-extrabold'
                    : isCompleted
                    ? 'text-emerald-700 font-semibold'
                    : 'text-slate-400'
                }`}>
                  {isFinalRejected ? 'Rejected' : step.name}
                </p>
                <p className="text-[9px] text-slate-400 font-light mt-0.5 max-w-[80px] line-clamp-1 truncate">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Warning or Success Text */}
        <div className="mt-4 pt-3 border-t border-indigo-100 flex items-center gap-2 text-xs">
          {status === 'Selected' ? (
            <div className="text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-100 font-medium w-full flex items-center gap-1.5">
              <CheckCircle2 size={14} /> Congratulations! You have received an elite offer from this recruitment drive.
            </div>
          ) : status === 'Rejected' ? (
            <div className="text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-100 font-medium w-full flex items-center gap-1.5">
              <ShieldAlert size={14} /> Drive completed. The committee regrets to inform that you are not moving forward. Keep going!
            </div>
          ) : (
            <div className="text-slate-700 font-medium w-full bg-white p-2 border border-slate-100 rounded-lg">
              Next Step: <span className="text-indigo-600 font-bold">{steps[activeIdx]?.label || 'Reviewing info'}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div id={id} className="bg-white border border-slate-100 rounded-3xl shadow-xs overflow-hidden h-full flex flex-col justify-between">
      {/* Top Header Controls (includes mobile back control) */}
      <div className="p-6 pb-4 border-b border-slate-50 shrink-0">
        <div className="flex justify-between items-center gap-4 mb-4">
          {onBackToListing && (
            <button
              onClick={onBackToListing}
              className="md:hidden flex items-center gap-1 text-xs text-slate-500 bg-slate-100 py-1.5 px-3 rounded-xl hover:bg-slate-200 transition-colors"
            >
              <ChevronLeft size={14} /> Back to Listings
            </button>
          )}

          <div className="flex gap-2 ml-auto">
            <button
              onClick={onToggleBookmark}
              className={`p-2 rounded-xl transition-all border flex items-center gap-1.5 text-xs font-semibold ${
                isBookmarked
                  ? 'bg-amber-50 border-amber-200 text-amber-600'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <Bookmark size={15} fill={isBookmarked ? 'currentColor' : 'none'} />
              {isBookmarked ? 'Bookmarked' : 'Save Drive'}
            </button>
          </div>
        </div>

        {/* Company Title Meta section */}
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl text-white flex items-center justify-center font-bold text-xl tracking-wider select-none shrink-0 ${job.logoColor}`}>
            {job.company.substring(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-slate-400 tracking-wide uppercase">{job.company}</span>
            <h2 className="text-xl md:text-2xl font-bold font-display text-slate-800 tracking-tight leading-tight mt-0.5">
              {job.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-2 font-medium">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-indigo-500" /> {job.location}
              </span>
              <span className="text-slate-200">•</span>
              <span className="flex items-center gap-1">
                <Briefcase size={12} className="text-indigo-500" /> {job.type}
              </span>
              <span className="text-slate-200">•</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                {job.salary}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Drive Meta Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5 p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white rounded-lg text-indigo-600 shadow-3xs">
              <GraduationCap size={14} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Targ. Majors</p>
              <p className="font-bold text-slate-700">{job.department}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white rounded-lg text-indigo-600 shadow-3xs">
              <Users size={14} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Eligibility</p>
              <p className="font-bold text-slate-700">{job.batch}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
            <div className="p-1.5 bg-white rounded-lg text-indigo-600 shadow-3xs">
              <Calendar size={14} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Apply Before</p>
              <p className="font-bold text-rose-600">{job.deadline}</p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-100 mt-5 gap-4">
          {(['overview', 'requirements', 'benefits'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2.5 text-xs font-bold tracking-wide uppercase border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'overview' ? 'Role Highlights' : tab === 'requirements' ? 'Requirements' : 'Benefits / Perks'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Content - Scrollable Box */}
      <div className="p-6 md:p-8 overflow-y-auto flex-1 text-sm text-slate-600">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2">Job Description</h3>
              <p className="leading-relaxed text-slate-600">{job.description}</p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2 mt-4">Key Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skillsNeeded.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-lg text-xs border border-indigo-100/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mt-4 text-xs font-normal space-y-2">
              <p className="font-bold text-slate-700">Placement Cell Coordinator Memo:</p>
              <p>1. Make sure you clear any existing academic backlog values before the final verification week.</p>
              <p>2. Keep your Placement Resume updated. The resume filename should mention your Roll Number clearly.</p>
            </div>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="space-y-5">
            <div>
              <h4 className="font-bold text-slate-800 text-xs mb-3 flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> Candidate Requirements
              </h4>
              <ul className="space-y-2.5">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-xs text-slate-600 leading-relaxed">
                    <span className="rounded-full bg-emerald-100 text-emerald-700 p-0.5 mt-0.5">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 text-xs mb-3 flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> Principal Responsibilities
              </h4>
              <ul className="space-y-2.5">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-xs text-slate-600 leading-relaxed">
                    <span className="text-slate-400 font-bold shrink-0 mt-0.5">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-slate-800 text-xs mb-3 flex items-center gap-1.5 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> Compensation & Perks
              </h4>
              <ul className="space-y-2.5">
                {job.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-xs text-slate-600 leading-relaxed">
                    <span className="text-indigo-600 shrink-0 mt-0.5">✦</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-5 mt-5">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide mb-2">Corporate Inquiries</h4>
              <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600">
                <Mail size={14} className="text-slate-400 shrink-0" />
                <span className="font-medium text-slate-500">Recruiter Email:</span>
                <a href={`mailto:${job.contactEmail}`} className="text-indigo-600 hover:underline font-bold font-mono">
                  {job.contactEmail}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Applied State Timeline Tracking OR Call to Action Apply Button Footer */}
      <div className="p-6 border-t border-slate-100 bg-slate-50/60 shrink-0">
        {isApplied && application ? (
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Applied on: <strong className="text-slate-700">{application.appliedDate}</strong></span>
              <span>Register ID: <strong className="text-slate-700 font-mono">{application.studentRoll}</strong></span>
            </div>
            {renderStatusTimeline(application.status)}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <p className="text-xs text-slate-400 leading-normal max-w-sm">
              By applying to this drive, you agree to submit your GPA metrics and curriculum vitae details directly with {job.company}'s campus talent division.
            </p>
            <button
              onClick={onApplyClick}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-200 shrink-0"
            >
              Apply for Drive
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
