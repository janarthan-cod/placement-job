import { Job } from './types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Software Development Engineer - I (SDE-1)',
    company: 'Google',
    logoColor: 'bg-emerald-600',
    location: 'Bangalore, India (Hybrid)',
    type: 'Full-Time',
    role: 'Software Engineering',
    salary: '₹18 - ₹24 LPA',
    experience: 'Entry',
    deadline: '2026-07-10',
    description: 'Google’s software engineers develop the next-generation technologies that change how billions of users connect, explore, and interact with information. We are looking for entry-level SDEs who have strong computer science fundamentals and a passion for building scalable, high-performance web systems.',
    requirements: [
      'B.Tech/B.E. in Computer Science, IT, or equivalent engineering disciplines.',
      'Proficiency in at least one modern language: Java, C++, Python, or Go.',
      'Strong knowledge of Data Structures, Algorithms, and Object-Oriented Programming.',
      'Familiarity with web technologies, REST APIs, or database systems.'
    ],
    responsibilities: [
      'Write clean, readable, secure, and production-ready code.',
      'Collaborate with product and UX teams to design and implement client-side or server-side solutions.',
      'Participate actively in code reviews and unit writing to ensure system reliability.',
      'Optimize application performance, scalability, and code maintainability.'
    ],
    benefits: [
      'Free gourmet meals, snacks, and high-quality beverages in campus cafes.',
      'Comprehensive medical insurance covering employee and dependents.',
      'Generous learning & development allowance for certifications and workshops.',
      'On-site wellness centers, gym memberships, and recreation areas.'
    ],
    isFeatured: true,
    postedDate: 'Today',
    skillsNeeded: ['Python', 'Java', 'Data Structures', 'Git', 'REST APIs'],
    contactEmail: 'campus-hiring@google.com',
    batch: '2026 Batch',
    department: 'CSE/IT'
  },
  {
    id: 'job-2',
    title: 'Data Science & Analytics Intern',
    company: 'JPMorgan Chase & Co.',
    logoColor: 'bg-indigo-600',
    location: 'Mumbai, India',
    type: 'Internship',
    role: 'Data Science',
    salary: '₹60,000 / Month',
    experience: 'No Experience',
    deadline: '2026-06-30',
    description: 'Join JPMorgan Chase’s quantitative analytics division as an intern. You will work on massive datasets to extract actionable insights, create risk validation metrics, and participate in deploying machine learning algorithms that protect financial transactions globally.',
    requirements: [
      'Pursuing B.Tech/Integrated Dual Degree in CSE, IT, Maths & Computing, or ECE.',
      'Solid skills in SQL and Python analytics stack (Pandas, NumPy, Scikit-Learn).',
      'Strong conceptual clarity in Probability, Statistics, and linear regression models.',
      'CGPA metric of 8.0 or above is strictly preferred.'
    ],
    responsibilities: [
      'Design, execute, and document data pipelines to preprocess multi-million row financial transaction datasets.',
      'Build dashboards with Tableau or Matplotlib to display anomalies and KPI trends.',
      'Present model evaluations and validation scores to the lead quantitative researchers during team standups.',
      'Contribute to productionizing existing ML models for fraud detection.'
    ],
    benefits: [
      'Direct PPI (Pre-Placement Interview) options based on stellar intern performance ratings.',
      'Guidance by Senior Analysts and Investment Directors.',
      'Slick Macbook Pro and dual monitors setup provided.',
      'Access to JPMorgan’s elite internal financial database and global training courses.'
    ],
    isFeatured: true,
    postedDate: 'Yesterday',
    skillsNeeded: ['SQL', 'Python', 'PowerBI', 'Statistics', 'Pandas'],
    contactEmail: 'apac.campus.recruiting@jpmorgan.com',
    batch: '2027 & 2026 Batches',
    department: 'CSE/IT'
  },
  {
    id: 'job-3',
    title: 'Associate Technology Consultant',
    company: 'Deloitte',
    logoColor: 'bg-lime-600',
    location: 'Hyderabad, India (On-Site)',
    type: 'Full-Time',
    role: 'Consulting',
    salary: '₹8.5 - ₹10 LPA',
    experience: 'Entry',
    deadline: '2026-07-25',
    description: 'Deloitte’s Technology Consulting practice help global enterprises harness systems to transform businesses. As an Associate Consultant, you’ll work at the convergence of business strategy and engineering, analyzing client legacy systems, gathering user data, and planning digital migrations.',
    requirements: [
      'B.Tech (All engineering branches) or MCA with zero backlogs.',
      'Outstanding communication, documentation, and client-facing presentation skills.',
      'Familiarity with ERP pipelines, DevOps principles, Cloud (AWS/Azure), or Salesforce is a major plus.',
      'Active leadership indicators (e.g., student clubs, hackathons organizer).'
    ],
    responsibilities: [
      'Interact directly with project stakeholders to document non-functional requirements and user personas.',
      'Facilitate system integration tests, custom configurations and assist with technical workshops.',
      'Generate visual diagrams and technical playbooks outlining deployment sequences for clients.',
      'Provide production-support telemetry oversight during post-launch go-live weeks.'
    ],
    benefits: [
      'Defined training bootcamp spanning 8 weeks in Deloitte US-India Academy.',
      'Yearly wellness subsidization (gym, sports equipment, health checks).',
      'Excellent performance bonuses and rapid track elevation plans.',
      'Global mobility program matching eligible professionals with US/Europe client opportunities.'
    ],
    isFeatured: false,
    postedDate: '3 days ago',
    skillsNeeded: ['SQL', 'SDLC', 'Cloud Basics', 'PowerPoint', 'Agile'],
    contactEmail: 'campus-deloitte@deloitte.com',
    batch: '2026 Batch',
    department: 'All Branches'
  },
  {
    id: 'job-4',
    title: 'UI/UX Visual Designer',
    company: 'Canva',
    logoColor: 'bg-purple-600',
    location: 'Sydney, Australia (Remote Welcome)',
    type: 'Full-Time',
    role: 'Design & Creative',
    salary: '₹14 - ₹18 LPA equivalent',
    experience: 'Mid',
    deadline: '2026-07-15',
    description: 'We are looking for an ambitious Visual Designer to join the core Canva ecosystem team during placement intake. You will help democratize design by sculpting stunning interface components, interactive canvas nodes, and fluid web experiences that millions love using.',
    requirements: [
      'Bachelor’s/Master’s in Design (B.Des, M.Des), Communication Design, or CSE with a strong design focus.',
      'A design portfolio highlighting refined Figma layouts, web typography, and component-driven microinteractions.',
      'Deep mastery of spatial layouts, color theories, grids, and Design Systems (Variables, Tokens).',
      'Basic knowledge of frontend layouts (Tailwind CSS, HTML/CSS) to collaborate with engineers.'
    ],
    responsibilities: [
      'Partner closely with Product Managers and engineers from product discovery up to final production signoff.',
      'Create high-fidelity interactive mockups and rapid prototypes matching canvas guidelines.',
      'Conduct interactive user testing sessions of pre-release workspace features.',
      'Participate in evolving the Canva unified core Design System.'
    ],
    benefits: [
      'Fully sponsored remote workspace budget ($1,500) or premium sit-stand desks.',
      'In-house chef and organic vegetable farm in physical campuses.',
      'Flexible working rhythms: choose your start time and home balances.',
      'Annual equity grants (options) and wellness stipend.'
    ],
    isFeatured: true,
    postedDate: '1 week ago',
    skillsNeeded: ['Figma', 'Wireframing', 'Typography', 'Prototyping', 'CSS'],
    contactEmail: 'hiring-nz@canva.com',
    batch: '2026 Batch',
    department: 'All Branches'
  },
  {
    id: 'job-5',
    title: 'Embedded Systems & Software Engineer',
    company: 'Tesla',
    logoColor: 'bg-red-600',
    location: 'Bangalore, India (On-Site)',
    type: 'Full-Time',
    role: 'Hardware / Embedded',
    salary: '₹22 - ₹28 LPA',
    experience: 'Entry',
    deadline: '2026-07-05',
    description: 'Tesla’s Autopilot and Drive Systems team seeks entry-level Embedded Engineers to code reliable, real-time micro-controller software. You will write firmware managing electric powertrain sensors, battery thermal states, and automotive bus systems (CAN, LIN, Ethernet).',
    requirements: [
      'B.Tech/M.Tech in ECE (Electronics & Communication), Electrical, Instrumentation or Robotics.',
      'Expert proficiency in Embedded C/C++ alongside assembly fundamentals.',
      'Hands-on experience with logic analyzers, oscilloscopes, and RTOS boards (FreeRTOS, Zephyr).',
      'Solid appreciation of physical constraints like hardware interrupts, memory, and wattage.'
    ],
    responsibilities: [
      'Design, code, and test low-level bootloaders and board support packages.',
      'Implement real-time hardware loop controllers ensuring fail-safe thresholds for motors.',
      'Perform hardware-in-the-loop (HIL) simulations validating signal margins of controllers.',
      'Partner with vehicle test technicians to resolve firmware faults recorded on prototype vehicles.'
    ],
    benefits: [
      'Premium Tesla Employee Equity share purchase programs.',
      'Relocation assistance package, including 30 days of temporary premium hotel stay.',
      'Fully equipped high-tech laboratories and active prototype racetracks for research.',
      'Sponsored certifications in automotive safety standards (ISO 26262, AUTOSAR).'
    ],
    isFeatured: true,
    postedDate: '4 days ago',
    skillsNeeded: ['Embedded C', 'RTOS', 'Microcontrollers', 'C++', 'CAN Bus'],
    contactEmail: 'embedded-india@tesla.com',
    batch: '2026 Batch',
    department: 'ECE / EEE'
  },
  {
    id: 'job-6',
    title: 'Frontend Engineer Intern',
    company: 'Adobe',
    logoColor: 'bg-rose-600',
    location: 'Noida, India (Hybrid)',
    type: 'Internship',
    role: 'Software Engineering',
    salary: '₹50,000 / Month',
    experience: 'Entry',
    deadline: '2026-06-28',
    description: 'Create premium user interfaces for Adobe Creative Cloud Web Apps. We seek a passionate Frontend Engineer Intern who is excited about modern React ecosystems, performance tuning, and crafting pixel-perfect, highly responsive interfaces tailored to creatives.',
    requirements: [
      'Enrolled in B.Tech Computer Science/IT or related degree with 7.5+ CGPA.',
      'Excellent JavaScript/TypeScript skill, paired with strong knowledge of CSS frameworks (Tailwind, Saas).',
      'Familiarity with state management like Redux, Zustand or Context API.',
      'Understanding of modern web metrics (LCP, FID) and lighthouse debugging is valued.'
    ],
    responsibilities: [
      'Implement modular, reuse-optimized UI components matching design specs.',
      'Address performance blocks in rendering complex vectors on browser screens.',
      'Collaborate on writing unit tests using Jest or Vitest to improve system coverage.',
      'Help build intuitive wizard pathways guiding users during initial software onboarding.'
    ],
    benefits: [
      'Direct PPI opportunity for high-caliber students with full conversion incentives.',
      'Free Adobe Creative Cloud All-Apps subscription for individual learning.',
      'Workshops hosted by worldwide software architects during initial intern bootcamps.',
      'Comprehensive on-site wellness and sports access.'
    ],
    isFeatured: false,
    postedDate: '3 days ago',
    skillsNeeded: ['React', 'TypeScript', 'Tailwind CSS', 'Redux', 'Jest'],
    contactEmail: 'india-hiring@adobe.com',
    batch: '2027 & 2026 Batches',
    department: 'CSE/IT'
  },
  {
    id: 'job-7',
    title: 'Graduate Mechanical Systems Analyst',
    company: 'L&T Technology Services',
    logoColor: 'bg-sky-600',
    location: 'Chennai, India',
    type: 'Full-Time',
    role: 'Core Engineering',
    salary: '₹6.5 - ₹8 LPA',
    experience: 'Entry',
    deadline: '2026-07-20',
    description: 'Join L&T’s engineering solutions group. You will carry out thermal, stress, and structural finite element analysis (FEA) on complex industrial equipment, including heavy machinery, pipeline assemblies, and aerospace components.',
    requirements: [
      'B.Tech/B.E. in Mechanical Engineering or Aerospace Engineering.',
      'Strong capabilities in finite element analysis tools (ANSYS, SolidWorks Simulation, or ABAQUS).',
      'Deep conceptual understanding of Strength of Materials, Thermodynamics, and Fluids.',
      'Familiarity with fabrication guidelines and GD&T standard symbols is highly beneficial.'
    ],
    responsibilities: [
      'Establish detailed 3D digital geometries and mesh grids for complex structural housings.',
      'Execute steady-state thermal and high-vibration stress analyses to calculate structural margins.',
      'Prepare technical engineering reports indicating fatigue cycles, margins, and stress concentrations.',
      'Consult with physical manufacturing teams to recommend fillet or plate adjustments.'
    ],
    benefits: [
      'Structured professional engineering path with mentorship by veteran industry designers.',
      'Subsidized staff transport routes, food courts, and medical care.',
      'Overtime allowance structure and performance-tied quarterly payouts.',
      'Paid memberships to professional bodies like ASME and SAE.'
    ],
    isFeatured: false,
    postedDate: '5 days ago',
    skillsNeeded: ['ANSYS', 'SolidWorks', 'FEA', 'GD&T', 'Material Science'],
    contactEmail: 'careers.mech@ltts.com',
    batch: '2026 Batch',
    department: 'Mechanical'
  },
  {
    id: 'job-8',
    title: 'Corporate Finance & Valuation Analyst',
    company: 'PwC',
    logoColor: 'bg-orange-600',
    location: 'Bangalore, India (On-Site)',
    type: 'Full-Time',
    role: 'Finance & Accounts',
    salary: '₹10 - ₹12 LPA',
    experience: 'Entry',
    deadline: '2026-07-18',
    description: 'PwC’s Deals practice advises corporate clients on mergers, acquisitions, and asset restructuring. As a Valuation Analyst, you’ll help construct multi-period discount cash flow models, evaluate peer company metrics, and participate in technical business evaluations.',
    requirements: [
      'B.Com, BBA (Finance), MBA, or Integrated Finance/Economics degrees.',
      'Outstanding expertise in MS Excel structure modeling (VBA, Pivot Tables, Scenario modeling).',
      'Knowledge of valuation methodologies (DCF, comparable company analysis, transaction multiples).',
      'Incredible written communication and report synthesis capabilities.'
    ],
    responsibilities: [
      'Construct financial models utilizing key client balance sheet forecasts and historical trend data.',
      'Analyze industry valuations, transaction parameters, and database metrics under lead guidance.',
      'Synthesize slide pitches describing competitive industry landscapes and cash balances.',
      'Provide detailed auditing support for corporate audit committees.'
    ],
    benefits: [
      'Comprehensive support (study material & leaves) for CFA/FRM credential pursuers.',
      'Excellent performance multipliers and annual team trip stipends.',
      'Modern, highly active downtown offices with game-rooms and relaxation hubs.',
      'Diverse peer structure and fast promotion lines.'
    ],
    isFeatured: false,
    postedDate: '6 days ago',
    skillsNeeded: ['Excel', 'Financial Modeling', 'DCF Valuation', 'PowerPoint', 'Accounting'],
    contactEmail: 'deals-hiring@pwc.com',
    batch: '2026 Batch',
    department: 'All Branches'
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Software Development Engineer - I (SDE-1)',
    company: 'Google',
    studentName: 'Janarthan M C',
    studentEmail: 'janarthan.26k24@kprcas.ac.in',
    studentRoll: '26K24CSE045',
    gpa: '8.9',
    phone: '+91 98765 43210',
    resumeName: 'Janarthan_MC_Resume.pdf',
    coverLetter: 'I am highly passionate about joining Google’s Software Engineering crew. I have built multiple full-stack React and Tailwind utility applications and have honed my analytical data structures capabilities over many hackathons.',
    status: 'Interviewing',
    appliedDate: '2026-06-18'
  },
  {
    id: 'app-2',
    jobId: 'job-3',
    jobTitle: 'Associate Technology Consultant',
    company: 'Deloitte',
    studentName: 'Ananya Sharma',
    studentEmail: 'ananya.sharma@kprcas.ac.in',
    studentRoll: '26K24IT012',
    gpa: '8.4',
    phone: '+91 94432 10987',
    resumeName: 'Ananya_Deloitte_Tech.pdf',
    coverLetter: 'Deloitte Consulting represents an ideal alignment of Tech and Strategy. I love hosting collaborative projects and have led the placement cell’s core student developer committee for a year.',
    status: 'Applied',
    appliedDate: '2026-06-19'
  }
];
