import React, { useState } from 'react';
import { Job, JobApplication, JobType, ExperienceLevel, NewJobInput } from '../types';
import {
  Plus,
  Users,
  Briefcase,
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
  FileText,
  Search,
  CheckCircle,
  Clock,
  ExternalLink,
  MapPin,
  Trash2
} from 'lucide-react';
import StatCard from './StatCard';

interface OfficerDashboardViewProps {
  id: string;
  jobs: Job[];
  applications: JobApplication[];
  onAddNewJob: (newJob: Job) => void;
  onDeleteJob: (jobId: string) => void;
  onUpdateApplicationStatus: (id: string, newStatus: JobApplication['status']) => void;
  onDeleteApplication: (id: string) => void;
}

export default function OfficerDashboardView({
  id,
  jobs,
  applications,
  onAddNewJob,
  onDeleteJob,
  onUpdateApplicationStatus,
  onDeleteApplication,
}: OfficerDashboardViewProps) {
  // Local Form state
  const [formData, setFormData] = useState<NewJobInput>({
    title: 'Associate Cloud Engineer',
    company: 'Microsoft',
    location: 'Hyderabad, India (Hybrid)',
    type: 'Full-Time',
    role: 'Cloud Engineering',
    salary: '₹14 - ₹18 LPA',
    experience: 'Entry',
    deadline: '2026-07-28',
    description: 'Microsoft Active Azure solutions help build reliable distributed clusters for our global enterprise audience. Looking for proactive students to align with our Core Azure Kubernetes infrastructure division.',
    requirements: 'B.Tech/BE in CSE, IT, or ECE\nFamiliarity with cloud models (AWS, GCP, Azure)\nExcellent Python or Bash scripting\nDocker or Kubernetes basic knowledge',
    responsibilities: 'Monitor service performance across regional node clusters\nHelp automate container replication scripts\nTroubleshoot API load failures in dev environments\nCollaborate on software infrastructure playbooks',
    benefits: 'Flexible cloud research budget ($1000/year)\nFull wellness health insurance\nRelocation allowance and housing support\nFree shuttle services and on-campus meals',
    skillsNeeded: 'Azure, Kubernetes, Docker, Python, Bash',
    contactEmail: 'campus-azure@microsoft.com',
    batch: '2026 Batch',
    department: 'CSE/IT'
  });

  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [applicantFilterCompany, setApplicantFilterCompany] = useState<string>('All');

  // Calculates stats
  const totalPostings = jobs.length;
  const totalApplicants = applications.length;
  const selectedCount = applications.filter(a => a.status === 'Selected').length;
  const interviewCount = applications.filter(a => a.status === 'Interviewing').length;

  // Handles submitting the new job posting
  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.company || !formData.salary || !formData.contactEmail) {
      setFormError('Please fill out essential fields: Title, Company, Compensation, and Contact Email.');
      return;
    }

    // Split listings logic by newlines
    const parseList = (str: string) => str.split('\n').map(l => l.trim()).filter(Boolean);
    const parseSkills = (str: string) => str.split(',').map(s => s.trim()).filter(Boolean);

    // Randomize a premium logo bg color class
    const colors = ['bg-indigo-600', 'bg-emerald-600', 'bg-amber-600', 'bg-purple-600', 'bg-sky-600', 'bg-rose-600', 'bg-lime-600', 'bg-indigo-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const createdJob: Job = {
      id: `job-${Date.now()}`,
      title: formData.title,
      company: formData.company,
      location: formData.location,
      type: formData.type,
      role: formData.role,
      salary: formData.salary,
      experience: formData.experience,
      deadline: formData.deadline,
      description: formData.description,
      requirements: parseList(formData.requirements),
      responsibilities: parseList(formData.responsibilities),
      benefits: parseList(formData.benefits),
      skillsNeeded: parseSkills(formData.skillsNeeded),
      contactEmail: formData.contactEmail,
      batch: formData.batch,
      department: formData.department,
      logoColor: randomColor,
      postedDate: 'Just posted',
      isFeatured: false,
    };

    onAddNewJob(createdJob);
    setFormSuccess(true);
    setFormError('');

    // Highlight brief indicator then reset some fields
    setTimeout(() => {
      setFormSuccess(false);
      // Reset only with dummy text standard placeholder
      setFormData({
        title: '',
        company: '',
        location: 'Bangalore, India',
        type: 'Full-Time',
        role: 'Software Engineering',
        salary: '₹12 - ₹15 LPA',
        experience: 'Entry',
        deadline: '2026-08-15',
        description: 'Provide an exciting overview...',
        requirements: 'Add bullet requirements (one per line)',
        responsibilities: 'Add key responsibilities (one per line)',
        benefits: 'Add competitive perks (one per line)',
        skillsNeeded: 'React, Java, SQL',
        contactEmail: 'careers@company-recruiting.com',
        batch: '2026 Batch',
        department: 'CSE/IT'
      });
    }, 2500);
  };

  // Get status class
  const getStatusColorClass = (status: JobApplication['status']) => {
    switch (status) {
      case 'Selected': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Rejected': return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Interviewing': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Screening': return 'bg-amber-100 text-amber-800 border-amber-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  // Unique list of active companies for applicant directory filtering
  const activeCompanies = ['All', ...Array.from(new Set(applications.map(app => app.company)))];

  // Filtered applicants list
  const filteredApplicants = applicantFilterCompany === 'All'
    ? applications
    : applications.filter(app => app.company === applicantFilterCompany);

  return (
    <div id={id} className="space-y-6">
      
      {/* Top Coordinator Stats Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          id="officer-stat-1"
          title="Drive Postings"
          value={totalPostings}
          description="Active recruiting companies"
          icon={<Briefcase size={20} />}
          colorClass="bg-indigo-600 shadow-indigo-200"
        />
        <StatCard
          id="officer-stat-2"
          title="Total Registered Applications"
          value={totalApplicants}
          description="Awaiting feedback or stages"
          icon={<Users size={20} />}
          colorClass="bg-indigo-500 shadow-indigo-200"
        />
        <StatCard
          id="officer-stat-3"
          title="In Progress Interviews"
          value={interviewCount}
          description="Interviews on active stages"
          icon={<Clock size={20} />}
          colorClass="bg-amber-500 shadow-amber-200"
        />
        <StatCard
          id="officer-stat-4"
          title="Campus Offeree (Selected)"
          value={selectedCount}
          description="Placement rate goal met"
          icon={<CheckCircle size={20} />}
          colorClass="bg-emerald-600 shadow-emerald-200"
        />
      </div>

      {/* Main Split Interface Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Column 1: Post a New Job Drive (Grid 5/12) */}
        <div className="lg:col-span-5 bg-white border border-slate-100 p-6 rounded-3xl shadow-3xs flex flex-col gap-5 height-fit">
          <div className="border-b border-slate-50 pb-3">
            <h3 className="font-bold text-base text-slate-800 font-display flex items-center gap-1.5">
              <Plus className="text-indigo-600" size={18} /> Add New Campus Job Drive
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Add a recruitment drive immediately. Students can see, apply, and upload details for this opening.
            </p>
          </div>

          {formSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-bounce">
              <CheckCircle size={15} /> Campus recruitment drive published successfully!
            </div>
          )}

          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold">
              {formError}
            </div>
          )}

          <form onSubmit={handleJobSubmit} className="space-y-3 pb-3 text-xs text-slate-600">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-bold uppercase tracking-wide mb-1">Company *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Google"
                  className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 focus:border-indigo-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-bold uppercase tracking-wide mb-1">Role Type / Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. SDE-1"
                  className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 focus:border-indigo-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-bold uppercase tracking-wide mb-1 font-sans">Compensation *</label>
                <input
                  type="text"
                  required
                  value={formData.salary}
                  onChange={e => setFormData({ ...formData, salary: e.target.value })}
                  placeholder="e.g. ₹15 - ₹18 LPA"
                  className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 focus:border-indigo-500 focus:outline-hidden font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-bold uppercase tracking-wide mb-1">Target Majors *</label>
                <select
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 focus:border-indigo-500 focus:outline-hidden"
                >
                  <option value="CSE/IT">CSE/IT</option>
                  <option value="ECE / EEE">ECE / EEE</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="All Branches">All Branches</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-bold uppercase tracking-wide mb-1">Eligible batch *</label>
                <input
                  type="text"
                  required
                  value={formData.batch}
                  onChange={e => setFormData({ ...formData, batch: e.target.value })}
                  placeholder="e.g. 2026 Batch"
                  className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 focus:border-indigo-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-bold uppercase tracking-wide mb-1">Apply Deadline *</label>
                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 focus:border-indigo-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-bold uppercase tracking-wide mb-1">Job Type *</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value as JobType })}
                  className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 focus:border-indigo-500 focus:outline-hidden"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 font-bold uppercase tracking-wide mb-1">HR Email Contact *</label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="e.g. hrhiring@google.com"
                  className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 focus:border-indigo-500 focus:outline-hidden font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase tracking-wide mb-1">Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="Bangalore, India"
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 focus:border-indigo-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase tracking-wide mb-1">Key Required Skills (Comma separated) *</label>
              <input
                type="text"
                required
                value={formData.skillsNeeded}
                onChange={e => setFormData({ ...formData, skillsNeeded: e.target.value })}
                placeholder="e.g., Python, SQL, Cloud, Docker"
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 focus:border-indigo-50 border-slate-200 focus:border-indigo-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase tracking-wide mb-1">Role Description *</label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 focus:border-indigo-500 focus:outline-hidden resize-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase tracking-wide mb-1">Requirements (one bullet per line)</label>
              <textarea
                rows={2}
                value={formData.requirements}
                onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 focus:border-indigo-500 focus:outline-hidden font-mono text-[10px]"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase tracking-wide mb-1">Responsibilities (one bullet per line)</label>
              <textarea
                rows={2}
                value={formData.responsibilities}
                onChange={e => setFormData({ ...formData, responsibilities: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 focus:border-indigo-500 focus:outline-hidden font-mono text-[10px]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-100 uppercase tracking-wider"
            >
              Confirm & Post Drive
            </button>
          </form>
        </div>

        {/* Column 2: Manage Applicant Submissions (Grid 7/12) */}
        <div className="lg:col-span-7 bg-white border border-slate-100 p-6 rounded-3xl shadow-3xs flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-50 pb-3 gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-800 font-display flex items-center gap-1.5">
                <Users className="text-indigo-600" size={18} /> Student Applicants Pipeline
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                A total of {filteredApplicants.length} registered candidates found. Direct actions apply status.
              </p>
            </div>

            {/* Quick company filter select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Filter Company:</span>
              <select
                value={applicantFilterCompany}
                onChange={e => setApplicantFilterCompany(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-2.5 py-1.5 focus:outline-hidden"
              >
                {activeCompanies.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table List of applicants */}
          {filteredApplicants.length === 0 ? (
            <div className="flex-1 py-12 text-center text-slate-400 border border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center">
              <Users size={32} className="text-slate-200 mb-2" />
              <p className="font-bold text-xs text-slate-500">No applicants registered</p>
              <p className="text-[10px] text-slate-400 mt-0.5 max-w-xs">
                No students have chosen {applicantFilterCompany === 'All' ? 'any live drive openings' : `the ${applicantFilterCompany} drive`} yet. Mock apply on the Student View to test real-status funnels!
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[750px] overflow-y-auto pr-1">
              {filteredApplicants.map((app) => (
                <div
                  key={app.id}
                  className="bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-2xl p-4 transition-all hover:shadow-2xs flex flex-col gap-3 text-xs"
                >
                  {/* Top line candidate details */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2 gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong className="text-slate-800 text-sm">{app.studentName}</strong>
                        <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded-sm">
                          {app.studentRoll}
                        </span>
                        <span className="bg-emerald-50 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded-sm">
                          CGPA: {app.gpa}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[10px] mt-0.5 font-medium">
                        Applied to: <span className="text-slate-700 font-bold">{app.jobTitle}</span> ({app.company})
                      </p>
                    </div>

                    {/* Status Select action list */}
                    <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-center">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Status:</span>
                      <select
                        value={app.status}
                        onChange={(e) => onUpdateApplicationStatus(app.id, e.target.value as any)}
                        className={`text-[11px] font-bold rounded-lg border px-2 py-1 focus:outline-hidden ${getStatusColorClass(app.status)}`}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Screening">Screening</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact detail flags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-500 font-medium">
                    <div className="flex items-center gap-1">
                      <Phone size={12} className="text-slate-400 shrink-0" />
                      <span>{app.phone}</span>
                    </div>
                    <div className="flex items-center gap-1 min-w-0">
                      <Mail size={12} className="text-slate-400 shrink-0" />
                      <span className="truncate">{app.studentEmail}</span>
                    </div>
                  </div>

                  {/* Resume Name */}
                  <div className="flex items-center gap-2 p-2 bg-white border border-slate-100 rounded-xl">
                    <FileText size={14} className="text-emerald-500 shrink-0" />
                    <span className="font-semibold text-slate-700 truncate flex-1">{app.resumeName}</span>
                    <span className="text-[9px] text-slate-400 bg-slate-50 border px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
                      Verified <ExternalLink size={8} />
                    </span>
                  </div>

                  {/* Cover Letter block (if present) */}
                  {app.coverLetter && (
                    <div className="bg-indigo-50/20 text-slate-600 p-2.5 border border-indigo-100/30 rounded-xl leading-relaxed text-[11px] italic">
                      &ldquo;{app.coverLetter}&rdquo;
                    </div>
                  )}

                  {/* Footer item tracker info & Delete */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium border-t border-slate-100 pt-2 shrink-0">
                    <span>Applied on: {app.appliedDate}</span>
                    <button
                      onClick={() => onDeleteApplication(app.id)}
                      className="text-rose-500 hover:text-rose-700 flex items-center gap-0.5 transition-colors font-bold"
                      aria-label="Delete Submission"
                    >
                      <Trash2 size={12} /> Discard Student
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Delete Active Careers Section */}
          <div className="border-t border-slate-100 pt-5 mt-2">
            <h4 className="font-bold text-xs text-slate-800 mb-3 uppercase tracking-wider">Active Drive Administration</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[170px] overflow-y-auto pr-1">
              {jobs.map(job => (
                <div key={job.id} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 truncate">{job.title}</p>
                    <p className="text-[10px] text-slate-400 truncate">{job.company} • {job.location}</p>
                  </div>
                  <button
                    onClick={() => onDeleteJob(job.id)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                    title="Delete Job"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
