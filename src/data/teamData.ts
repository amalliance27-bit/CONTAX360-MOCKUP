// Executive Leadership Team Data for Contax360 BPO Solutions
// Grounded in executive bios: Jacqueline Sutherland, Mario Ellington, Caray McKenzie, Ashley Martin, Talia Cooke-Johnson

export interface TeamMember {
  id: string;
  roomKey: string;
  name: string;
  role: string;
  subtitle: string;
  image: string;
  fallbackImage: string;
  initials: string;
  suiteNumber: string;
  officeTitle: string;
  shortBio: string;
  executiveOverview: string;
  tagline: string;
  scopeSection1: {
    title: string;
    items: { heading: string; description: string }[];
  };
  scopeSection2: {
    title: string;
    items: { heading: string; description: string }[];
  };
  credentials: string[];
  speechLong: string;
  speechShort: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'jacqueline-sutherland',
    roomKey: 'team_jackie',
    name: 'Jacqueline Sutherland',
    role: 'Founder, President & CEO',
    subtitle: 'Founder & Visionary Leader',
    image: '/team/jacqueline_sutherland.jpg',
    fallbackImage: 'https://raw.githubusercontent.com/amalliance27-bit/contAX360/aeb7d46700183313ff5c5db36c66fc43d74b47b6/contax360-jackie%20Sutheland.jpg',
    initials: 'JS',
    suiteNumber: 'Suite 100',
    officeTitle: 'OFFICE OF FOUNDER & CEO',
    tagline: '"Engineering precision and owner-operated dedication create transformative nearshore value."',
    shortBio: 'Pioneered woman and minority executive leadership in Caribbean BPO with engineering discipline and boutique client focus.',
    executiveOverview: 'Jacqueline Sutherland founded Contax360 in 2007 following an engineering career with Fortune 500 firms in the United States. Under her leadership, Contax360 evolved from traditional contact center operations into complex Knowledge Process Outsourcing (KPO), specialized legal and healthcare support, and multi-site delivery across Montego Bay, Kingston, and Florida. As a WBENC-certified woman and minority enterprise, she champions hands-on owner-managed agility and workforce advancement across the Caribbean.',
    scopeSection1: {
      title: "Vision & Strategic Evolution",
      items: [
        {
          heading: 'Establishment & Engineering Roots',
          description: 'Applying Fortune 500 engineering rigor, Jacqueline established Contax360 in 2007 to provide boutique, owner-operated contact center solutions with direct executive responsiveness.'
        },
        {
          heading: 'Expansion into High-Value KPO',
          description: 'Pioneered the transition into Knowledge Process Outsourcing, launching specialized practices in legal collections, healthcare processing, financial operations, and managed IT security.'
        },
        {
          heading: 'Multi-Site Delivery Network',
          description: 'Built resilient delivery centers in Montego Bay HQ and Kingston, Jamaica, complemented by Florida operations and secure global virtual work-from-home infrastructure.'
        }
      ]
    },
    scopeSection2: {
      title: 'Leadership & Workforce Advancement',
      items: [
        {
          heading: 'Certified Minority & Women-Owned Enterprise',
          description: 'A trailblazer for female executive leadership in Caribbean BPO. Contax360 holds WBENC and NMSDC certifications, with women comprising approximately 90% of the workforce.'
        },
        {
          heading: 'Direct Client Engagement',
          description: 'Maintains an agile, owner-operated structure where enterprise clients engage directly with principal executives rather than navigating layers of corporate bureaucracy.'
        },
        {
          heading: 'National Upskilling & Legal Training',
          description: 'Collaborates with the Global Services Sector (GSS) Project and embeds specialized client attorneys to upskill Jamaican agents into certified legal and data analysts.'
        }
      ]
    },
    credentials: ['WBENC Certified Woman-Owned', 'NMSDC MBE Certified', '17+ Years Executive Tenure', 'Fortune 500 Engineering Background'],
    speechLong: 'Jacqueline Sutherland, Founder, President and CEO. Jackie established Contax Three-Sixty in 2007 following an engineering career with Fortune Five Hundred firms. A pioneer for female leadership in the Caribbean, she spearheaded our evolution into complex Knowledge Process Outsourcing, legal and healthcare support, and owner-managed client partnerships.',
    speechShort: 'Jacqueline Sutherland. Founder, President and CEO.'
  },
  {
    id: 'mario-ellington',
    roomKey: 'team_mario',
    name: 'Mario Ellington',
    role: 'Director of Operations',
    subtitle: 'Operational Excellence & SLA Command',
    image: '/team/mario_ellington.jpg',
    fallbackImage: 'https://raw.githubusercontent.com/amalliance27-bit/contAX360/aeb7d46700183313ff5c5db36c66fc43d74b47b6/Mario%20Ellington%20Director%20of%20Operations.jpg',
    initials: 'ME',
    suiteNumber: 'Suite 301',
    officeTitle: 'OFFICE OF DIRECTOR OF OPERATIONS',
    tagline: '"Operational discipline and direct executive responsiveness ensure enterprise SLAs are exceeded every single day."',
    shortBio: 'Drives daily contact center execution, workforce management, multi-tiered SLA performance, and omnichannel delivery across Jamaica and Florida.',
    executiveOverview: 'Mario Ellington directs global operations across Contax360 delivery facilities in Montego Bay, Kingston, and Florida. He oversees workforce management, multi-tiered Service Level Agreements, and seamless omnichannel delivery across voice, digital chat, email, and back-office transaction workflows in regulated healthcare and finance sectors.',
    scopeSection1: {
      title: 'Operational Strategy & Execution',
      items: [
        {
          heading: 'Contact Center Execution & SLA Delivery',
          description: 'Drives daily operations and workforce management across Jamaican and Florida facilities, consistently beating enterprise Service Level Agreements.'
        },
        {
          heading: 'Omnichannel Command',
          description: 'Oversees synchronized customer touchpoints across telephony, live digital chat, email, and social care channels.'
        },
        {
          heading: 'Regulated BPO & KPO Processing',
          description: 'Manages rigorous operational workflows for HIPAA-compliant healthcare, legal transaction processing, and financial services.'
        }
      ]
    },
    scopeSection2: {
      title: 'Quality Governance & Client Partnership',
      items: [
        {
          heading: 'Direct Executive Responsiveness',
          description: 'Partners directly with enterprise decision-makers to rapidly configure operational workflows without account management friction.'
        },
        {
          heading: 'Quality Assurance & Security Compliance',
          description: 'Enforces strict QA monitoring, compliance benchmarks, and ISO/PCI security standards across all on-premise and remote teams.'
        }
      ]
    },
    credentials: ['24/7 SLA Execution', 'Omnichannel Command', 'Healthcare & Legal Compliance', 'Workforce Optimization'],
    speechLong: 'Mario Ellington, Director of Operations. Mario drives daily contact center execution, multi-tiered Service Level Agreements, and seamless omnichannel delivery across our Jamaica and Florida facilities. Working directly with client decision-makers, he ensures rigorous quality assurance, compliance, and custom operational excellence.',
    speechShort: 'Mario Ellington. Director of Operations.'
  },
  {
    id: 'caray-mckenzie',
    roomKey: 'team_caray',
    name: 'Caray McKenzie',
    role: 'Director of Information Technology',
    subtitle: 'Technology Strategy & Cybersecurity',
    image: '/team/caray_mckenzie.jpg',
    fallbackImage: 'https://raw.githubusercontent.com/amalliance27-bit/contAX360/aeb7d46700183313ff5c5db36c66fc43d74b47b6/Caray%20McKenzie.jpg',
    initials: 'CM',
    suiteNumber: 'Suite 401',
    officeTitle: 'OFFICE OF DIRECTOR OF IT',
    tagline: '"Technological automation empowers our people, creating high-value technical upskilling and career opportunities."',
    shortBio: 'Architects high-availability telecom infrastructure, network redundancy, cloud VDI systems, and 24/7 MSSP managed cybersecurity defense.',
    executiveOverview: 'Caray McKenzie architects Contax360 technology infrastructure, telecom connectivity, and cybersecurity operations. He led the technical migration into high-value Knowledge Process Outsourcing, establishing 24/7 Managed Security Services, zero-trust cloud VDI deployments, and data analytics capabilities across our nearshore and onshore footprint.',
    scopeSection1: {
      title: 'Technological Infrastructure & Architecture',
      items: [
        {
          heading: 'High-Availability Infrastructure',
          description: 'Architects carrier-grade telecom redundancy, dual subsea fiber connections, and 99.99% uptime for international voice and data circuits.'
        },
        {
          heading: '24/7 Managed Cybersecurity (MSSP)',
          description: 'Directs continuous security operations, endpoint detection, threat hunting, and strict adherence to SOC 2, HIPAA, and PCI DSS.'
        },
        {
          heading: 'Cloud VDI & Virtual Delivery',
          description: 'Deploys secure virtual desktop infrastructure (VDI) enabling compliant work-from-home capabilities globally.'
        }
      ]
    },
    scopeSection2: {
      title: 'Digital Enablement & Upskilling',
      items: [
        {
          heading: 'Automation & Analytics',
          description: 'Integrates intelligent routing and business intelligence analytics to elevate performance without displacing human empathy.'
        },
        {
          heading: 'Internal Tech Mentorship',
          description: 'Directs an internal mentorship academy training front-line staff into certified cybersecurity analysts and network technicians.'
        }
      ]
    },
    credentials: ['24/7 MSSP Cybersecurity', 'Cloud VDI & Zero-Trust', 'Telecom & Fiber Redundancy', 'GDS Technical Training'],
    speechLong: 'Caray McKenzie, Director of Information Technology. Caray oversees our global technology infrastructure, twenty-four-seven Managed Security defense, and cloud VDI systems. Under his leadership, automation empowers our workforce with advanced technical upskilling and career pathways.',
    speechShort: 'Caray McKenzie. Director of Information Technology.'
  },
  {
    id: 'ashley-martin',
    roomKey: 'team_ashley',
    name: 'Ashley Martin',
    role: 'Project Director',
    subtitle: 'Enterprise Onboarding & Client Migrations',
    image: '/team/ashley_martin.jpg',
    fallbackImage: 'https://raw.githubusercontent.com/amalliance27-bit/contAX360/aeb7d46700183313ff5c5db36c66fc43d74b47b6/contax360%20Ashley%20Martin.jpg',
    initials: 'AM',
    suiteNumber: 'Suite 501',
    officeTitle: 'OFFICE OF PROJECT DIRECTOR',
    tagline: '"Seamless enterprise migrations happen when operational rigor, compliance, and technology move in unison."',
    shortBio: 'Leads high-impact enterprise onboarding, omnichannel migrations, and complex customer journey transformations across global client accounts.',
    executiveOverview: 'Ashley Martin leads enterprise client onboarding and omnichannel migrations at Contax360. Coordinating across Operations, IT, and HR, she guarantees seamless knowledge transfer, SLA alignment, and compliance calibration during enterprise launch phases.',
    scopeSection1: {
      title: 'Enterprise Migrations & Project Governance',
      items: [
        {
          heading: 'Enterprise Onboarding Architecture',
          description: 'Orchestrates turn-key migration methodologies for complex BPO and KPO client engagements.'
        },
        {
          heading: 'Omnichannel Journey Transformation',
          description: 'Synchronizes voice, email, chat, and messaging workflows into unified agent desktops.'
        },
        {
          heading: 'Cross-Functional SLA Calibration',
          description: 'Aligns launch timelines with rigorous regulatory benchmarks including HIPAA, PCI DSS, and client SLAs.'
        }
      ]
    },
    scopeSection2: {
      title: 'Delivery Strategy & Account Governance',
      items: [
        {
          heading: 'Direct Executive Governance',
          description: 'Maintains open communication channels with enterprise leadership to accelerate approvals and adapt scopes swiftly.'
        },
        {
          heading: 'Multi-Facility Rollouts',
          description: 'Oversees simultaneous program deployment across Jamaican nearshore centers, US onshore teams, and remote workforces.'
        }
      ]
    },
    credentials: ['Complex Enterprise Onboarding', 'HIPAA & Legal Frameworks', 'Omnichannel Journey Mapping', 'Multi-Site Governance'],
    speechLong: 'Ashley Martin, Project Director. Ashley leads high-impact enterprise onboarding and customer journey transformations across phone, email, live chat, and messaging. Coordinating directly with corporate executives, she ensures swift migrations, strict compliance, and flawless multi-site execution.',
    speechShort: 'Ashley Martin. Project Director.'
  },
  {
    id: 'talia-cooke-johnson',
    roomKey: 'team_talia',
    name: 'Talia Cooke-Johnson',
    role: 'Human Resources Manager',
    subtitle: 'People, Culture & National Upskilling',
    image: '/team/talia_cooke_johnson.jpg',
    fallbackImage: 'https://raw.githubusercontent.com/amalliance27-bit/contAX360/aeb7d46700183313ff5c5db36c66fc43d74b47b6/Talia%20Cooke%20Johnson%20HR.jpg',
    initials: 'TC',
    suiteNumber: 'Suite 201',
    officeTitle: 'OFFICE OF HR MANAGER',
    tagline: '"Investing in our team with paid training, comprehensive welfare, and career paths creates industry-leading retention."',
    shortBio: 'Oversees talent acquisition, paid training programs, walk-in recruitment in Montego Bay, and staff welfare initiatives across our Jamaican facilities.',
    executiveOverview: 'Talia Cooke-Johnson heads Human Resources and Employee Welfare at Contax360. She manages our high-volume walk-in recruitment center in Montego Bay, directs comprehensive paid training curricula, and fosters industry-leading staff retention through robust welfare initiatives.',
    scopeSection1: {
      title: 'Talent Acquisition & Employee Development',
      items: [
        {
          heading: 'Walk-In Recruitment Center',
          description: 'Directs daily applicant processing, assessments, and onboarding at our Freeport, Montego Bay campus.'
        },
        {
          heading: 'Paid Professional Training',
          description: 'Oversees foundational and domain-specific training for customer care, technical support, and KPO analytical roles.'
        },
        {
          heading: 'National Workforce Alignment',
          description: 'Partners with Jamaica’s Global Services Sector (GSS) project to fast-track high-potential candidates into leadership.'
        }
      ]
    },
    scopeSection2: {
      title: 'Culture, Welfare & Career Pathways',
      items: [
        {
          heading: 'Comprehensive Welfare Programs',
          description: 'Champions employee well-being through free transportation shuttles, meal allowances, health insurance, and recognition clubs.'
        },
        {
          heading: 'Internal Advancement Pathways',
          description: 'Fosters a culture where over 70% of supervisory and managerial roles are promoted from within the organization.'
        }
      ]
    },
    credentials: ['GSS National Project Partner', 'Comprehensive Employee Welfare', 'Paid Training Programs', 'High Retention Benchmark'],
    speechLong: 'Talia Cooke-Johnson, Human Resources Manager. Talia champions talent acquisition, employee benefits, and structured paid training at our Freeport, Montego Bay facility. Aligned with Jamaica\'s Global Services Sector Project, she fosters an uplifting culture and internal leadership pathways.',
    speechShort: 'Talia Cooke-Johnson. Human Resources Manager.'
  }
];
