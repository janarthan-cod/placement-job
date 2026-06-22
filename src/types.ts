export type JobType = 'Full-Time' | 'Internship' | 'Contract';
export type ExperienceLevel = 'Entry' | 'Mid' | 'Senior' | 'No Experience';

export interface Job {
  id: string;
  title: string;
  company: string;
  logoColor: string; // Tailwind color class for company circle (e.g. 'bg-indigo-600')
  location: string;
  type: JobType;
  role: string;
  salary: string;
  experience: ExperienceLevel;
  deadline: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  isFeatured?: boolean;
  postedDate: string;
  skillsNeeded: string[];
  contactEmail: string;
  batch: string;
  department: string; // e.g., 'CSE/IT', 'ECE', 'Mechanical', 'All Branches'
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  studentName: string;
  studentEmail: string;
  studentRoll: string;
  gpa: string;
  phone: string;
  resumeName: string;
  coverLetter: string;
  status: 'Applied' | 'Screening' | 'Interviewing' | 'Selected' | 'Rejected';
  appliedDate: string;
}

export interface NewJobInput {
  title: string;
  company: string;
  location: string;
  type: JobType;
  role: string;
  salary: string;
  experience: ExperienceLevel;
  deadline: string;
  description: string;
  requirements: string; // string representation for input split by newline
  responsibilities: string; // string representation split by newline
  benefits: string; // string representation split by newline
  skillsNeeded: string; // comma-separated strings
  contactEmail: string;
  batch: string;
  department: string;
}
