import React, { useState, useRef } from 'react';
import { X, Upload, FileText, CheckCircle } from 'lucide-react';
import { Job } from '../types';

interface ApplicationFormModalProps {
  id: string;
  job: Job | null;
  userEmail: string;
  onClose: () => void;
  onSubmit: (data: {
    studentName: string;
    studentEmail: string;
    studentRoll: string;
    gpa: string;
    phone: string;
    resumeName: string;
    coverLetter: string;
  }) => void;
}

export default function ApplicationFormModal({
  id,
  job,
  userEmail,
  onClose,
  onSubmit,
}: ApplicationFormModalProps) {
  // Local states
  const [studentName, setStudentName] = useState('Janarthan M C');
  const [studentEmail, setStudentEmail] = useState(userEmail || 'janarthan.26k24@kprcas.ac.in');
  const [studentRoll, setStudentRoll] = useState('26K24CSE045');
  const [gpa, setGpa] = useState('8.95');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [resumeName, setResumeName] = useState('Janarthan_MC_CSE_Resume.pdf');
  const [coverLetter, setCoverLetter] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!job) return null;

  // Handles drag & drop behavior
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setResumeName(file.name);
        setErrorMessage('');
      } else {
        setErrorMessage('Only PDF resumes are accepted for placement verification.');
      }
    }
  };

  // Handles manual file selection Click events
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setResumeName(file.name);
      setErrorMessage('');
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Preset resumes for frictionless testing
  const presetResumes = [
    'Janarthan_MC_CSE_Resume.pdf',
    'Tech_Development_Portfolio.pdf',
    'General_Business_Analyst.pdf'
  ];

  // Submit action
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentRoll || !gpa || !phone || !resumeName) {
      setErrorMessage('Please fill out all required fields and upload your resume PDF.');
      return;
    }
    
    // Clear check
    const gpaFloat = parseFloat(gpa);
    if (isNaN(gpaFloat) || gpaFloat < 0 || gpaFloat > 10) {
      setErrorMessage('CGPA must be a valid number between 0.0 and 10.0.');
      return;
    }

    onSubmit({
      studentName,
      studentEmail,
      studentRoll,
      gpa,
      phone,
      resumeName,
      coverLetter
    });
  };

  return (
    <div
      id={id + "-backdrop"}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id={id}
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative border border-slate-100 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-bold text-lg font-display text-slate-800">Campus Drive Application</h3>
            <p className="text-slate-400 text-xs mt-0.5">
              Apply to <span className="font-bold text-indigo-600">{job.title}</span> at {job.company}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-medium">
              {errorMessage}
            </div>
          )}

          {/* Core Profile Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Full Name *</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 font-medium focus:border-indigo-500 focus:outline-hidden transition-colors"
                placeholder="Janarthan M C"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Student Email *</label>
              <input
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 font-medium focus:border-indigo-500 focus:outline-hidden transition-colors"
                placeholder="janarthan.26k24@kprcas.ac.in"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Roll No. / Register ID *</label>
              <input
                type="text"
                value={studentRoll}
                onChange={(e) => setStudentRoll(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 font-medium font-mono focus:border-indigo-500 focus:outline-hidden transition-colors uppercase"
                placeholder="26K24CSE045"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Current CGPA *</label>
              <input
                type="text"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-700 font-bold focus:border-indigo-500 focus:outline-hidden transition-colors"
                placeholder="8.95"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Contact Phone Number *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 font-medium focus:border-indigo-500 focus:outline-hidden transition-colors"
              placeholder="+91 98765 43210"
            />
          </div>

          {/* Interactive Resume File Upload Box */}
          <div>
            <label className="block text-slate-500 font-semibold uppercase tracking-wider mb-1.5">
              Placement Resume (PDF only) *
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,application/pdf"
              className="hidden"
            />
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileSelect}
              className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                isDragOver
                  ? 'border-indigo-500 bg-indigo-50/70'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
              }`}
            >
              <div className="p-2.5 rounded-full bg-indigo-100 text-indigo-600">
                <Upload size={18} />
              </div>
              <div>
                <p className="font-bold text-slate-700 text-xs text-indigo-600">Drag your PDF Resume here, or Click to select</p>
                <p className="text-[10px] text-slate-400 mt-1">Accepts maximum 5MB verification documents</p>
              </div>

              {resumeName && (
                <div className="mt-2.5 py-1.5 px-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg flex items-center gap-1.5 font-bold text-[11px] animate-in fade-in">
                  <FileText size={13} className="shrink-0 text-emerald-600" />
                  <span className="truncate max-w-[200px]">{resumeName}</span>
                  <CheckCircle size={12} className="text-emerald-500 shrink-0" />
                </div>
              )}
            </div>

            {/* Quick-Autofill Resumes helper */}
            <div className="mt-2 text-[10px] text-slate-400 flex items-center flex-wrap gap-2">
              <span className="font-medium">Or choose quick resume mock-ups:</span>
              <div className="flex gap-1.5 flex-wrap">
                {presetResumes.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setResumeName(p);
                      setErrorMessage('');
                    }}
                    className={`px-2 py-0.5 rounded-md border text-[9px] font-medium transition-colors ${
                      resumeName === p
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {p.split('_')[2] || p.split('_')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Motivation Letter text area */}
          <div>
            <label className="block text-slate-500 font-semibold uppercase tracking-wider mb-1.5">
              Statement of Purpose / Cover Letter (Optional)
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={3}
              className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 font-medium focus:border-indigo-500 focus:outline-hidden transition-colors resize-none"
              placeholder="Tell the committee why you qualify for this recruitment drive, your relevant experience etc."
            />
          </div>

          {/* Action buttons footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold rounded-xl transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-100"
            >
              Verify & Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
