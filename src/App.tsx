import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  GraduationCap,
  Sparkles,
  Users,
  CheckCircle2,
  Bookmark,
  Calendar,
  Layers,
  Heart,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  UserCheck
} from 'lucide-react';

// Types
import { Job, JobApplication, JobType, ExperienceLevel } from './types';

// Constants
import { INITIAL_JOBS, INITIAL_APPLICATIONS } from './data';

// Components
import StatCard from './components/StatCard';
import JobCard from './components/JobCard';
import JobDetailView from './components/JobDetailView';
import ApplicationFormModal from './components/ApplicationFormModal';
import OfficerDashboardView from './components/OfficerDashboardView';

export default function App() {
  // Core database states (with standard localStorage persistence)
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('placement_portal_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('placement_portal_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('placement_portal_bookmarks');
    return saved ? JSON.parse(saved) : ['job-1', 'job-2', 'job-4']; // default bookmarked jobs
  });

  // Current active view tab
  // 'explore' | 'my-activity' | 'dashboard'
  const [activeTab, setActiveTab] = useState<'explore' | 'my-activity' | 'coordinator'>('explore');

  // Search & Filter state variables
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('All');
  const [sortBy, setSortBy] = useState<'deadline' | 'latest' | 'title'>('latest');

  // Interactive Sorter/Drawer state
  const [selectedJobId, setSelectedJobId] = useState<string | null>('job-1');
  const [isApplyingForJob, setIsApplyingForJob] = useState<Job | null>(null);
  
  // Mobile responsive helper - true when detail view overrides parent listing
  const [mobileShowDetail, setMobileShowDetail] = useState(false);

  // Synchronise state with localStorage
  useEffect(() => {
    localStorage.setItem('placement_portal_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('placement_portal_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('placement_portal_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Mock User profile info
  const studentProfile = {
    name: 'Janarthan M C',
    email: 'janarthan.26k24@kprcas.ac.in',
    roll: '26K24CSE045',
    dept: 'Computer Science & Engineering',
    gpa: '8.95',
    college: 'KPR College Academy of Sciences'
  };

  // Callback implementations
  const handleToggleBookmark = (jobId: string) => {
    setBookmarks((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const handleSelectJob = (job: Job) => {
    setSelectedJobId(job.id);
    setMobileShowDetail(true);
  };

  const handleApplySubmit = (data: {
    studentName: string;
    studentEmail: string;
    studentRoll: string;
    gpa: string;
    phone: string;
    resumeName: string;
    coverLetter: string;
  }) => {
    if (!isApplyingForJob) return;

    const newApplication: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: isApplyingForJob.id,
      jobTitle: isApplyingForJob.title,
      company: isApplyingForJob.company,
      studentName: data.studentName,
      studentEmail: data.studentEmail,
      studentRoll: data.studentRoll,
      gpa: data.gpa,
      phone: data.phone,
      resumeName: data.resumeName,
      coverLetter: data.coverLetter,
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
    };

    setApplications((prev) => [newApplication, ...prev]);
    setIsApplyingForJob(null);
  };

  // Backends action for Coordinator Dashboard
  const handleAddNewJob = (newJob: Job) => {
    setJobs((prev) => [newJob, ...prev]);
    // Set newly created job as active selected entry
    setSelectedJobId(newJob.id);
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    if (selectedJobId === jobId) {
      setSelectedJobId(null);
    }
  };

  const handleUpdateApplicantStatus = (appId: string, newStatus: JobApplication['status']) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
    );
  };

  const handleDeleteApplication = (appId: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== appId));
  };

  // Derived filter options computed from real database listing
  const locationOptions = ['All', ...Array.from(new Set(jobs.map((j) => {
    // extract city name cleanly or leave literal
    return j.location.split(',')[0].trim();
  })))];

  const departmentOptions = ['All', 'CSE/IT', 'ECE / EEE', 'Mechanical', 'All Branches'];
  const typeOptions = ['All', 'Full-Time', 'Internship'];

  // Match and Filter Jobs
  const filteredJobs = jobs.filter((job) => {
    // 1. Search Query text check
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skillsNeeded.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Location filter
    const matchesLoc =
      selectedLocation === 'All' ||
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    // 3. Department constraint
    const matchesDept =
      selectedDepartment === 'All' || job.department === selectedDepartment;

    // 4. Job Type constraint
    const matchesType =
      selectedJobType === 'All' || job.type === selectedJobType;

    // 5. Compensation tier category checking
    let matchesCompensation = true;
    if (selectedSalaryRange !== 'All') {
      const isLpa = job.salary.includes('LPA');
      const isStipend = job.salary.toLowerCase().includes('month') || job.salary.includes('/');
      
      // Parse numerical package range roughly
      const numericVal = parseInt(job.salary.replace(/[^0-9]/g, ''), 10);

      if (selectedSalaryRange === 'high') {
        // ₹15+ LPA or high USD package
        matchesCompensation = isLpa && numericVal >= 15;
      } else if (selectedSalaryRange === 'mid') {
        // ₹10-15 LPA
        matchesCompensation = isLpa && numericVal >= 10 && numericVal < 15;
      } else if (selectedSalaryRange === 'entry') {
        // Below ₹10 LPA
        matchesCompensation = (isLpa && numericVal < 10) || isStipend;
      }
    }

    return matchesSearch && matchesLoc && matchesDept && matchesType && matchesCompensation;
  });

  // Sort matched results
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'deadline') {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    // Default Sorting: Latest elements (higher IDs/custom tag)
    return b.id.localeCompare(a.id);
  });

  // Calculate bookmark elements
  const bookmarkedJobsList = jobs.filter((j) => bookmarks.includes(j.id));

  // Determine active selected job object
  const activeSelectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0] || null;

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-700 font-sans antialiased selection:bg-indigo-600 selection:text-white pb-12">
      
      {/* Top Banner Institutional Header */}
      <header className="bg-slate-9 border-b border-slate-100 bg-white sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Brand Details */}
          <div className="flex items-center gap-3 self-start sm:self-center">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold tracking-tight shadow-md shadow-indigo-200">
              <Layers size={20} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider bg-indigo-50 px-1.5 py-0.5 rounded-sm">Campus Drive Portal</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="System Live"></span>
              </div>
              <h1 className="text-lg font-extrabold text-slate-800 font-display tracking-tight leading-none">
                Placement Cell Portal
              </h1>
              <span className="text-[11px] text-slate-400 font-medium">
                {studentProfile.college}
              </span>
            </div>
          </div>

          {/* Center Navigation Pillars */}
          <nav className="flex bg-slate-100 p-1 rounded-2xl gap-1 shrink-0 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => {
                setActiveTab('explore');
                setMobileShowDetail(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'explore'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Explore Job Drives
            </button>
            <button
              onClick={() => {
                setActiveTab('my-activity');
                setMobileShowDetail(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'my-activity'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              My Status & Saved
              {bookmarks.length > 0 && (
                <span className="bg-amber-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center text-center font-bold">
                  {bookmarks.length}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab('coordinator');
                setMobileShowDetail(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'coordinator'
                  ? 'bg-white text-indigo-700 shadow-sm animate-pulse'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Coordinator Hub
            </button>
          </nav>

          {/* Right profile component */}
          <div className="hidden lg:flex items-center gap-3 p-1.5 bg-slate-50 border border-slate-100/80 rounded-2xl text-xs pointer-events-none select-none">
            <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">
              {studentProfile.name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-slate-800 leading-none">{studentProfile.name}</p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{studentProfile.roll} • {studentProfile.gpa} CGPA</p>
            </div>
          </div>

        </div>
      </header>

      {/* Main Container Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Student welcome box if in explore page */}
        {activeTab === 'explore' && (
          <div className="bg-radial-at-l from-indigo-50 via-slate-50 to-white border border-slate-100/60 p-6 rounded-3xl mb-6 shadow-3xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-slate-800 tracking-tight flex items-center gap-2">
                Welcome back, <span className="text-indigo-600 font-extrabold">{studentProfile.name}</span>! 👋
              </h2>
              <p className="text-slate-500 text-xs md:text-sm mt-1 max-w-xl">
                Ready for continuous placements? Your eligible major is <span className="text-slate-700 font-semibold">{studentProfile.dept}</span>. Explore active corporate drives, filter by compensation packages, track interviews, and apply in 1-click.
              </p>
            </div>
            
            {/* Quick Micro Info metrics */}
            <div className="flex gap-3 text-xs w-full md:w-auto justify-end">
              <div className="p-3 bg-white border border-slate-100 rounded-2xl flex items-center gap-2 text-slate-600 shadow-3xs">
                <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
                  <UserCheck size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Registered ID</p>
                  <p className="font-bold font-mono text-slate-700">{studentProfile.roll}</p>
                </div>
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-2xl flex items-center gap-2 text-slate-600 shadow-3xs">
                <div className="p-1.5 bg-indigo-50 text-indigo-700 rounded-lg">
                  <GraduationCap size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Verified CGPA</p>
                  <p className="font-bold text-slate-700">{studentProfile.gpa} / 10.0</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 1: Explore Job Drives (Layout splits horizontally) */}
        {activeTab === 'explore' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Filter & Search Block (Grid Span 4/12) */}
            <div className="md:col-span-5 lg:col-span-4 space-y-4 flex flex-col">
              
              {/* Search text panel */}
              <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-3xs space-y-3">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Search active drives</h4>
                
                {/* Search query box */}
                <div className="relative">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search company, skills, SDE..."
                    className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2 text-xs rounded-xl focus:outline-hidden focus:border-indigo-500 focus:bg-white text-slate-800 font-medium transition-colors"
                  />
                </div>
              </div>

              {/* Filters Panel block */}
              <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-3xs space-y-4 flex-1">
                <div className="flex items-center justify-between border-b border-indigo-50 pb-2">
                  <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    Filter Directory
                  </h3>
                  {(searchQuery || selectedLocation !== 'All' || selectedDepartment !== 'All' || selectedJobType !== 'All' || selectedSalaryRange !== 'All') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedLocation('All');
                        setSelectedDepartment('All');
                        setSelectedJobType('All');
                        setSelectedSalaryRange('All');
                      }}
                      className="text-[10px] font-bold text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/50 px-2 py-0.5 rounded-lg transition-colors"
                    >
                      Reset All
                    </button>
                  )}
                </div>

                {/* Filter 1: Location */}
                <div className="space-y-1.5">
                  <label className="block text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-xs rounded-xl focus:outline-hidden focus:border-indigo-500 font-semibold text-slate-700"
                  >
                    <option value="All">All Regions (Remote / On-site)</option>
                    {locationOptions.filter(l => l !== 'All').map((loc, i) => (
                      <option key={i} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Filter 2: Eligible Branches / Majors */}
                <div className="space-y-1.5">
                  <label className="block text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">Target Majors</label>
                  <div className="flex flex-wrap gap-1.5">
                    {departmentOptions.map((dept, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedDepartment(dept)}
                        className={`px-2.5 py-1.5 text-[10px] font-bold rounded-xl border transition-all ${
                          selectedDepartment === dept
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-3xs'
                            : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter 3: Job Category Types */}
                <div className="space-y-1.5">
                  <label className="block text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">Job Type</label>
                  <select
                    value={selectedJobType}
                    onChange={(e) => setSelectedJobType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-xs rounded-xl focus:outline-hidden focus:border-indigo-500 font-semibold text-slate-700"
                  >
                    <option value="All">All (Full-Time & Internships)</option>
                    <option value="Full-Time">Full-Time Direct</option>
                    <option value="Internship">Internships Only</option>
                  </select>
                </div>

                {/* Filter 4: Compensation ranges */}
                <div className="space-y-1.5">
                  <label className="block text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">Compensation Packages</label>
                  <select
                    value={selectedSalaryRange}
                    onChange={(e) => setSelectedSalaryRange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-xs rounded-xl focus:outline-hidden focus:border-indigo-500 font-semibold text-slate-700"
                  >
                    <option value="All">All Packages & Stipends</option>
                    <option value="high">Elite Packages (₹15+ LPA)</option>
                    <option value="mid">Mid Tier (₹10 - ₹15 LPA)</option>
                    <option value="entry">Under ₹10 LPA / Intern Stipends</option>
                  </select>
                </div>

                {/* Filter 5: Sorters */}
                <div className="space-y-1.5">
                  <label className="block text-slate-400 font-extrabold uppercase text-[10px] tracking-wider font-mono">Sort Listings By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-xs rounded-xl focus:outline-hidden focus:border-indigo-500 font-semibold text-slate-700"
                  >
                    <option value="latest">Latest postings</option>
                    <option value="deadline">Deadline (soonest first)</option>
                    <option value="title">Alphabetical (Job Title)</option>
                  </select>
                </div>

              </div>

            </div>

            {/* Middle Section: Matched Directory List (Grid Span 4/12) */}
            <div className={`md:col-span-7 lg:col-span-4 space-y-3 ${mobileShowDetail ? 'hidden md:block' : 'block'}`}>
              <div className="flex items-center justify-between px-1">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Drives found: <strong className="text-indigo-600">{sortedJobs.length}</strong>
                </span>
                <span className="text-[10px] text-slate-450 text-slate-400">Showing filtered roles</span>
              </div>

              {sortedJobs.length === 0 ? (
                <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
                  <AlertCircle size={36} className="text-slate-350 text-slate-400 mb-2" />
                  <p className="font-bold text-slate-800 text-sm">No matched openings found</p>
                  <p className="text-slate-400 text-xs mt-1 max-w-[200px]">
                    Try loosening your search terms or picking another branch/salary filter combination.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedLocation('All');
                      setSelectedDepartment('All');
                      setSelectedJobType('All');
                      setSelectedSalaryRange('All');
                    }}
                    className="mt-4 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs transition-colors"
                  >
                    Enquire All Openings
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[800px] overflow-y-auto pr-1">
                  {sortedJobs.map((job) => {
                    const isBookmarked = bookmarks.includes(job.id);
                    const appliedRecord = applications.find((app) => app.jobId === job.id);
                    const isApplied = !!appliedRecord;

                    return (
                      <JobCard
                        key={job.id}
                        id={`job-card-${job.id}`}
                        job={job}
                        isSelected={selectedJobId === job.id}
                        isBookmarked={isBookmarked}
                        isApplied={isApplied}
                        applicationStatus={appliedRecord?.status}
                        onSelect={() => handleSelectJob(job)}
                        onToggleBookmark={() => handleToggleBookmark(job.id)}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Section: Core Expanded Detail View (Grid Span 4/12 or 5/12 on LG) */}
            <div className={`md:col-span-12 lg:col-span-4 h-full min-h-[600px] ${mobileShowDetail ? 'block' : 'hidden md:block'}`}>
              {activeSelectedJob ? (
                <JobDetailView
                  id="job-active-details"
                  job={activeSelectedJob}
                  isBookmarked={bookmarks.includes(activeSelectedJob.id)}
                  isApplied={applications.some((app) => app.jobId === activeSelectedJob.id)}
                  application={applications.find((app) => app.jobId === activeSelectedJob.id) || null}
                  onApplyClick={() => setIsApplyingForJob(activeSelectedJob)}
                  onToggleBookmark={() => handleToggleBookmark(activeSelectedJob.id)}
                  onBackToListing={() => setMobileShowDetail(false)}
                />
              ) : (
                <div className="bg-white border border-slate-100 rounded-3xl p-6 text-center text-slate-400 h-full flex flex-col justify-center items-center">
                  <span className="font-bold">No Job Selected</span>
                </div>
              )}
            </div>

          </div>
        )}

        {/* VIEW 2: My saved/bookmarks & Applied activity */}
        {activeTab === 'my-activity' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Top Overview Activity banner */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-3xs flex flex-col md:flex-row gap-6 items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800 font-display">Personal Application Dashboard</h3>
                <p className="text-slate-400 text-xs mt-1 max-w-lg">
                  Verify interview timelines and review active bookmark selections in real-time. Keep credentials updated on individual files.
                </p>
              </div>
              <div className="flex gap-4 shrink-0 text-center text-xs">
                <div className="px-5 py-3.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-2xl">
                  <p className="font-extrabold text-2xl leading-none font-display">
                    {applications.filter(app => app.studentRoll === studentProfile.roll).length}
                  </p>
                  <p className="text-[10px] text-indigo-500 font-semibold uppercase mt-1">Drives Applied</p>
                </div>
                <div className="px-5 py-3.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-2xl">
                  <p className="font-extrabold text-2xl leading-none font-display">
                    {bookmarks.length}
                  </p>
                  <p className="text-[10px] text-amber-500 font-semibold uppercase mt-1">Bookmarks</p>
                </div>
              </div>
            </div>

            {/* Split Saved List and Application Track List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Box 1: Applied Jobs State Trackers */}
              <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-3xs space-y-4">
                <div className="border-b border-indigo-50 pb-3 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800 font-display flex items-center gap-1.5 uppercase tracking-wide">
                    <CheckCircle2 className="text-emerald-500" size={16} /> Drive Application Pipeline
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">Total applied drives</span>
                </div>

                {applications.length === 0 ? (
                  <div className="py-12 text-center text-slate-450 text-slate-450 text-slate-450 text-slate-400 flex flex-col items-center justify-center">
                    <Users size={28} className="text-slate-200 mb-1.5" />
                    <p className="font-bold text-xs text-slate-550 text-slate-500">No application submissions filed</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Explore SDE/Tech drives to apply now</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {applications.map((app) => {
                      // Retrieve target job details to enable clicking
                      const matchedJob = jobs.find((j) => j.id === app.jobId);
                      
                      return (
                        <div
                          key={app.id}
                          className="bg-slate-50 border border-slate-100 hover:border-slate-250 transition-colors rounded-2xl p-4 flex flex-col gap-3 text-xs"
                        >
                          <div className="flex justify-between items-start gap-3">
                            <div>
                              <span className="text-[10px] uppercase font-bold text-indigo-600 block leading-tight">{app.company}</span>
                              <h4 className="font-bold text-slate-800 text-sm mt-0.5">{app.jobTitle}</h4>
                              <p className="text-slate-400 text-[10px] font-medium mt-0.5">Applied on: {app.appliedDate}</p>
                            </div>
                            
                            {/* Colorful pill based on status */}
                            <span className={`px-2 py-1 rounded-md text-[10px] font-semibold uppercase border ${
                              app.status === 'Selected'
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : app.status === 'Rejected'
                                ? 'bg-rose-50 border-rose-200 text-rose-700'
                                : app.status === 'Interviewing'
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-705 text-indigo-700'
                                : 'bg-amber-50 border-amber-200 text-amber-700'
                            }`}>
                              {app.status}
                            </span>
                          </div>

                          {/* Quick review and interactive click back to info */}
                          <div className="flex items-center justify-between text-[11px] pt-2.5 border-t border-slate-100 font-medium">
                            <span className="text-slate-400">Resume: <strong className="text-slate-600 truncate max-w-[150px] inline-block align-bottom font-mono">{app.resumeName}</strong></span>
                            
                            {matchedJob && (
                              <button
                                onClick={() => {
                                  setSelectedJobId(matchedJob.id);
                                  setActiveTab('explore');
                                  setMobileShowDetail(true);
                                }}
                                className="text-indigo-600 hover:underline flex items-center gap-0.5 font-bold"
                              >
                                View Guidelines <ChevronRight size={12} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Box 2: Bookmarks list */}
              <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-3xs space-y-4">
                <div className="border-b border-indigo-50 pb-3 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800 font-display flex items-center gap-1.5 uppercase tracking-wide">
                    <Heart className="text-rose-500 fill-rose-500" size={16} /> Saved Jobs / Drives
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">Target checklist</span>
                </div>

                {bookmarkedJobsList.length === 0 ? (
                  <div className="py-12 text-center text-slate-450 text-slate-400 flex flex-col items-center justify-center">
                    <Bookmark size={28} className="text-slate-200 mb-1.5" />
                    <p className="font-bold text-xs text-slate-500">No bookmarked opportunities</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Click the save icon on any job card to save criteria</p>
                  </div>
                ) : (
                  <div className="space-y-3.5 max-h-[500px] overflow-y-auto">
                    {bookmarkedJobsList.map((job) => {
                      const isApplied = applications.some((app) => app.jobId === job.id);
                      return (
                        <div
                          key={job.id}
                          className="p-4 bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-2xl transition-colors flex items-center justify-between gap-4 text-xs"
                        >
                          <div className="min-w-0">
                            <span className="text-[10px] uppercase font-bold text-slate-400">{job.company}</span>
                            <h4 className="font-bold text-slate-800 text-sm mt-0.5 truncate">{job.title}</h4>
                            <div className="flex items-center gap-2 text-slate-500 text-[10px] mt-1 font-medium">
                              <span>Compensation: <strong className="text-emerald-700">{job.salary}</strong></span>
                              <span>•</span>
                              <span>Deadline: <strong className="text-slate-700">{job.deadline}</strong></span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* Dismiss bookmarks */}
                            <button
                              onClick={() => handleToggleBookmark(job.id)}
                              className="p-1 px-2.5 bg-slate-100 hover:bg-slate-200 border text-slate-500 rounded-lg text-[10px] font-bold transition-all"
                            >
                              Remove
                            </button>
                            
                            {/* Explore buttons */}
                            <button
                              onClick={() => {
                                setSelectedJobId(job.id);
                                setActiveTab('explore');
                                setMobileShowDetail(true);
                              }}
                              className="p-1 px-2.5 bg-indigo-600 hover:bg-indigo-700 font-bold text-white rounded-lg text-[10px]"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* VIEW 3: Coordinator Hub / Placement Officer Dashboard */}
        {activeTab === 'coordinator' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Disclaimer notice bar */}
            <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 flex items-start gap-3 text-xs leading-normal font-medium">
              <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <p className="font-extrabold font-display">Authoritative Coordinator Mode</p>
                <p className="mt-0.5">
                  You are viewing the College Placement Cell Coordinator Panel. Here, you have supreme authority to post new core drive listings, discard outdated listings, and elevate/screen/schedule interviews for applicants. Any modifications made will update immediately!
                </p>
              </div>
            </div>

            <OfficerDashboardView
              id="placement-officer-dashboard"
              jobs={jobs}
              applications={applications}
              onAddNewJob={handleAddNewJob}
              onDeleteJob={handleDeleteJob}
              onUpdateApplicationStatus={handleUpdateApplicantStatus}
              onDeleteApplication={handleDeleteApplication}
            />
          </div>
        )}

      </main>

      {/* FOOTER BAR */}
      <footer className="mt-16 border-t border-slate-100 bg-white py-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="font-bold flex items-center justify-center gap-1">
            <Layers size={14} className="text-indigo-600" /> Placement Cell Job Portal • Student Advancement Center
          </p>
          <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 font-medium text-[11px] text-slate-400">
            <span>Faculty Dean Office: info-placement@kprcas.ac.in</span>
            <span>•</span>
            <span>National Drive Board ID: NPB-2026-987</span>
            <span>•</span>
            <span>Local Time: 2026-06-19</span>
          </div>
          <p className="text-[10px] text-slate-350">
            System powered entirely offline/client-side utilizing localStorage. Version 1.0.4 - All rights reserved.
          </p>
        </div>
      </footer>

      {/* RENDER DRIVE APPLICATION FORM MODAL SLIDE UP */}
      {isApplyingForJob && (
        <ApplicationFormModal
          id="active-apply-modal"
          job={isApplyingForJob}
          userEmail={studentProfile.email}
          onClose={() => setIsApplyingForJob(null)}
          onSubmit={handleApplySubmit}
        />
      )}

    </div>
  );
}
