import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, XCircle, Clock, TrendingUp, Target, Zap, ChevronLeft, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';

// Top 50 countries by GDP + Southeast Asian countries, alphabetically ordered
const countries = [
  "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil", "Brunei", 
  "Cambodia", "Canada", "Chile", "China", "Colombia", "Czech Republic", "Denmark", 
  "Egypt", "Finland", "France", "Germany", "Hong Kong", "India", "Indonesia", 
  "Iran", "Ireland", "Israel", "Italy", "Japan", "Laos", "Malaysia", "Mexico", 
  "Myanmar", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", 
  "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", 
  "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain", "Sweden", 
  "Switzerland", "Taiwan", "Thailand", "Turkey", "United Arab Emirates", 
  "United Kingdom", "United States", "Vietnam", "Other"
];

const questions = [
  // Section 1: High-Impact Pain Discovery (4 questions)
  {
    id: 1,
    section: "High-Impact Pain Discovery",
    question: "What's your most painful, boring, and repetitive task that you wish would just disappear?",
    type: "textarea",
    placeholder: "Describe in 2-3 sentences..."
  },
  {
    id: 2,
    section: "High-Impact Pain Discovery",
    question: "What is going to break when your business grows 100%?",
    type: "textarea",
    placeholder: "Describe in 2-3 sentences..."
  },
  {
    id: 3,
    section: "High-Impact Pain Discovery",
    question: "What inefficiency are you currently accepting as 'normal' because 'that's just how things work'?",
    type: "textarea",
    placeholder: "Describe in 2-3 sentences..."
  },
  {
    id: 4,
    section: "High-Impact Pain Discovery",
    question: "How many hours per week does your team spend on tasks that feel like 'busywork' rather than value creation?",
    type: "select",
    options: [
      "Less than 5 hours",
      "5-10 hours",
      "10-20 hours",
      "20-40 hours",
      "More than 40 hours"
    ]
  },
  
  // Section 2: Back Office & Operational Inefficiencies (5 questions)
  {
    id: 5,
    section: "Back Office & Operational Inefficiencies",
    question: "Do you still enter data manually into systems?",
    type: "select",
    options: [
      "Yes, daily",
      "Yes, weekly",
      "Occasionally",
      "No"
    ]
  },
  {
    id: 6,
    section: "Back Office & Operational Inefficiencies",
    question: "Do you copy-paste data between different applications?",
    type: "select",
    options: [
      "Yes, constantly",
      "Yes, regularly",
      "Sometimes",
      "No"
    ]
  },
  {
    id: 7,
    section: "Back Office & Operational Inefficiencies",
    question: "Do you still use Excel as a primary database or workflow tool?",
    type: "select",
    options: [
      "Yes, for most processes",
      "Yes, for some processes",
      "Rarely",
      "No"
    ]
  },
  {
    id: 8,
    section: "Back Office & Operational Inefficiencies",
    question: "How many different software tools does your team use daily to get work done?",
    type: "select",
    options: [
      "1-3",
      "4-6",
      "7-10",
      "More than 10"
    ]
  },
  {
    id: 9,
    section: "Back Office & Operational Inefficiencies",
    question: "What percentage of your team's time is spent on administrative tasks vs. strategic work?",
    type: "select",
    options: [
      "10-25% admin",
      "25-50% admin",
      "50-75% admin",
      "Over 75% admin"
    ]
  },
  
  // Section 3: Revenue Growth & Customer Experience Levers (4 questions)
  {
    id: 10,
    section: "Revenue Growth & Customer Experience",
    question: "How do you currently process and follow up on leads?",
    type: "textarea",
    placeholder: "Describe in 2-3 sentences..."
  },
  {
    id: 11,
    section: "Revenue Growth & Customer Experience",
    question: "What percentage of qualified leads do you estimate fall through the cracks due to slow or inconsistent follow-up?",
    type: "select",
    options: [
      "Less than 10%",
      "10-25%",
      "25-50%",
      "More than 50%",
      "I don't know"
    ]
  },
  {
    id: 12,
    section: "Revenue Growth & Customer Experience",
    question: "What documents or information do customers/partners consistently get wrong or submit incorrectly?",
    type: "textarea",
    placeholder: "Describe in 2-3 sentences..."
  },
  {
    id: 13,
    section: "Revenue Growth & Customer Experience",
    question: "How long does it typically take from first customer contact to contract signature?",
    type: "select",
    options: [
      "Less than 1 week",
      "1-2 weeks",
      "2-4 weeks",
      "1-3 months",
      "More than 3 months"
    ]
  },
  
  // Section 4: Knowledge Management & Decision-Making (3 questions)
  {
    id: 14,
    section: "Knowledge Management & Decision-Making",
    question: "Do you have a centralized knowledge base where team members can quickly find company information, processes, or answers?",
    type: "select",
    options: [
      "Yes, and it's well-maintained",
      "Yes, but it's outdated",
      "No, information is scattered",
      "No, knowledge lives in people's heads"
    ]
  },
  {
    id: 15,
    section: "Knowledge Management & Decision-Making",
    question: "How often do team members ask the same questions or 'reinvent the wheel' for recurring tasks?",
    type: "select",
    options: [
      "Daily",
      "Weekly",
      "Monthly",
      "Rarely"
    ]
  },
  {
    id: 16,
    section: "Knowledge Management & Decision-Making",
    question: "What critical business decision do you wish you had better data for?",
    type: "textarea",
    placeholder: "Describe in 1-2 sentences..."
  },
  
  // Section 5: Urgency & AI Readiness (2 questions)
  {
    id: 17,
    section: "Urgency & AI Readiness",
    question: "What is your primary motivation for exploring AI automation right now?",
    type: "select",
    options: [
      "Reduce costs/overhead",
      "Scale without proportionally increasing headcount",
      "Improve customer experience/speed",
      "Reduce human errors",
      "Increase employee satisfaction",
      "Free up team for strategic work",
      "Other"
    ]
  },
  {
    id: 18,
    section: "Urgency & AI Readiness",
    question: "If you could automate ONE business process tomorrow, what would have the biggest impact?",
    type: "textarea",
    placeholder: "Describe in 1-2 sentences..."
  },
  
  // Section 6: Business Profile (8 questions)
  {
    id: 19,
    section: "Business Profile",
    question: "Organization's Name",
    type: "text",
    placeholder: "Enter your organization name"
  },
  {
    id: 20,
    section: "Business Profile",
    question: "Country",
    type: "dropdown",
    options: countries
  },
  {
    id: 21,
    section: "Business Profile",
    question: "Industry Sector",
    type: "select",
    options: [
      "Technology",
      "Professional Services",
      "Healthcare",
      "Manufacturing",
      "Retail/E-commerce",
      "Financial Services",
      "Education",
      "Real Estate",
      "Marketing/Agency",
      "Other"
    ]
  },
  {
    id: 22,
    section: "Business Profile",
    question: "Number of Employees",
    type: "select",
    options: [
      "1-10",
      "11-50",
      "51-100",
      "101-500",
      "501-1,000",
      "1,001-5,000",
      "5,001-10,000",
      "Over 10,000"
    ]
  },
  {
    id: 23,
    section: "Business Profile",
    question: "Annual Turnover (USD)",
    type: "select",
    options: [
      "Under $100K",
      "$100K - $500K",
      "$500K - $1M",
      "$1M - $10M",
      "$10M - $100M",
      "$100M - $1B",
      "Over $1B"
    ]
  },
  {
    id: 24,
    section: "Business Profile",
    question: "First Name",
    type: "text",
    placeholder: "Enter your first name"
  },
  {
    id: 25,
    section: "Business Profile",
    question: "Last Name",
    type: "text",
    placeholder: "Enter your last name"
  },
  {
    id: 26,
    section: "Business Profile",
    question: "Email Address",
    type: "email",
    placeholder: "Enter your email address"
  }
];

export default function JanaAILanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [aiScore, setAiScore] = useState(null);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const startAssessment = () => {
    setShowQuestionnaire(true);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setEmailError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const previewResults = () => {
    // Use sample data for preview
    const sampleAnswers = {
      1: "Data entry from customer forms and managing spreadsheets takes up most of my team's time. We manually input information from PDFs and emails into our CRM system.",
      2: "Our manual approval process and document handling would completely break. We're already struggling with the current volume.",
      3: "We accept that following up with leads takes 2-3 days because we have to manually check multiple systems and create personalized emails.",
      4: "20-40 hours",
      5: "Yes, daily",
      6: "Yes, constantly",
      7: "Yes, for most processes",
      8: "7-10",
      9: "50-75% admin",
      10: "We track leads in a spreadsheet and manually send follow-up emails. Our sales team has to check the sheet daily and update it themselves.",
      11: "25-50%",
      12: "Customers often submit incomplete forms and provide inconsistent information about their requirements. Contract details are frequently missing key fields.",
      13: "1-3 months",
      14: "No, information is scattered",
      15: "Daily",
      16: "Which marketing channels actually drive qualified leads vs just traffic.",
      17: "Scale without proportionally increasing headcount",
      18: "Automating lead qualification and initial follow-up would free up our sales team to focus on high-value conversations.",
      19: "Sample Company Inc",
      20: "United States",
      21: "Professional Services",
      22: "11-50",
      23: "$1M - $10M",
      24: "John",
      25: "Doe",
      26: "preview@example.com"
    };
    
    setAnswers(sampleAnswers);
    calculateResultsFromAnswers(sampleAnswers);
  };

  const sendToGoogleSheets = async (answersData, finalScore) => {
    // Get score band
    const scoreBand = getScoreBand(finalScore);
    
    // Get top 3 opportunities with full details
    const opportunities = getTopOpportunitiesFromAnswers(answersData);
    
    // Prepare complete data payload
    const payload = {
      // Results
      aiScore: finalScore,
      scoreBand: scoreBand.level,
      
      // Top 3 Opportunities (full details for future PDF generation)
      opportunity1: opportunities[0] ? {
        title: opportunities[0].title,
        impact: opportunities[0].impact,
        timeframe: opportunities[0].timeframe,
        description: opportunities[0].description,
        subScore: opportunities[0].subScore
      } : null,
      opportunity2: opportunities[1] ? {
        title: opportunities[1].title,
        impact: opportunities[1].impact,
        timeframe: opportunities[1].timeframe,
        description: opportunities[1].description,
        subScore: opportunities[1].subScore
      } : null,
      opportunity3: opportunities[2] ? {
        title: opportunities[2].title,
        impact: opportunities[2].impact,
        timeframe: opportunities[2].timeframe,
        description: opportunities[2].description,
        subScore: opportunities[2].subScore
      } : null,
      
      // Top opportunity title only (for CRM)
      topOpportunity: opportunities[0] ? opportunities[0].title : '',
      
      // All 26 Question Answers
      q1: answersData[1] || '',
      q2: answersData[2] || '',
      q3: answersData[3] || '',
      q4: answersData[4] || '',
      q5: answersData[5] || '',
      q6: answersData[6] || '',
      q7: answersData[7] || '',
      q8: answersData[8] || '',
      q9: answersData[9] || '',
      q10: answersData[10] || '',
      q11: answersData[11] || '',
      q12: answersData[12] || '',
      q13: answersData[13] || '',
      q14: answersData[14] || '',
      q15: answersData[15] || '',
      q16: answersData[16] || '',
      q17: answersData[17] || '',
      q18: answersData[18] || '',
      q19: answersData[19] || '',
      q20: answersData[20] || '',
      q21: answersData[21] || '',
      q22: answersData[22] || '',
      q23: answersData[23] || '',
      q24: answersData[24] || '',
      q25: answersData[25] || '',
      q26: answersData[26] || '',
      
      // Business Profile (extracted for convenience)
      organization: answersData[19] || '',
      country: answersData[20] || '',
      industry: answersData[21] || '',
      employees: answersData[22] || '',
      revenue: answersData[23] || '',
      firstName: answersData[24] || '',
      lastName: answersData[25] || '',
      email: answersData[26] || ''
    };
    
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbybWkU2NRVQBDgfDdcFoX927Tab3LvecGh25O0rcRLmAKQBt1wG0Vz5swQLDkLs6BNN/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      // Note: no-cors mode means we can't read the response, but the data is sent
      console.log('Data sent to Google Sheets');
    } catch (error) {
      console.error('Error sending to Google Sheets:', error);
      // Don't show error to user - results page still displays
    }
  };

  const getTopOpportunitiesFromAnswers = (answersData) => {
    // Same logic as getTopOpportunities but uses answersData parameter
    if (!answersData || Object.keys(answersData).length === 0) {
      return [];
    }
    
    const allOpportunities = [
      {
        id: 1,
        title: "Automated Data Entry & Integration",
        impact: "High",
        timeframe: "2-4 weeks",
        description: "Eliminate manual data entry and copy-paste workflows with intelligent automation and system integrations.",
        subScore: (() => {
          let score = 0;
          const q5Map = { "Yes, daily": 15, "Yes, weekly": 10, "Occasionally": 5, "No": 0 };
          score += q5Map[answersData[5]] || 0;
          const q6Map = { "Yes, constantly": 15, "Yes, regularly": 10, "Sometimes": 5, "No": 0 };
          score += q6Map[answersData[6]] || 0;
          const q7Map = { "Yes, for most processes": 5, "Yes, for some processes": 3, "Rarely": 1, "No": 0 };
          score += q7Map[answersData[7]] || 0;
          return score;
        })()
      },
      {
        id: 2,
        title: "AI-Powered Lead Management",
        impact: "High",
        timeframe: "3-6 weeks",
        description: "Automate lead qualification, follow-ups, and nurturing to capture more revenue opportunities.",
        subScore: (() => {
          let score = 0;
          const q11Map = { "More than 50%": 20, "25-50%": 15, "10-25%": 10, "Less than 10%": 5, "I don't know": 12 };
          score += q11Map[answersData[11]] || 0;
          const q10Text = (answersData[10] || "").toLowerCase();
          if (q10Text.includes("spreadsheet") || q10Text.includes("excel") || q10Text.includes("manual")) score += 10;
          else if (q10Text.includes("email")) score += 5;
          else if (q10Text.includes("crm") || q10Text.includes("automated")) score += 2;
          const q13Map = { "More than 3 months": 10, "1-3 months": 7, "2-4 weeks": 4, "1-2 weeks": 2, "Less than 1 week": 0 };
          score += q13Map[answersData[13]] || 0;
          return score;
        })()
      },
      {
        id: 3,
        title: "AI Knowledge Management System",
        impact: "Medium-High",
        timeframe: "4-6 weeks",
        description: "Create an intelligent knowledge base that learns and provides instant answers to team questions.",
        subScore: (() => {
          let score = 0;
          const q14Map = { 
            "No, knowledge lives in people's heads": 15, 
            "No, information is scattered": 15, 
            "Yes, but it's outdated": 8, 
            "Yes, and it's well-maintained": 0 
          };
          score += q14Map[answersData[14]] || 0;
          const q15Map = { "Daily": 10, "Weekly": 7, "Monthly": 4, "Rarely": 0 };
          score += q15Map[answersData[15]] || 0;
          const q16Text = answersData[16] || "";
          if (q16Text.length > 100) score += 5;
          else if (q16Text.length > 50) score += 3;
          else if (q16Text.length > 20) score += 1;
          return score;
        })()
      },
      {
        id: 4,
        title: "Administrative Task Automation",
        impact: "High",
        timeframe: "2-3 weeks",
        description: "Free your team from busywork with intelligent automation of routine administrative tasks.",
        subScore: (() => {
          let score = 0;
          const q9Map = { "Over 75% admin": 20, "50-75% admin": 15, "25-50% admin": 10, "10-25% admin": 5 };
          score += q9Map[answersData[9]] || 0;
          const q4Map = { "More than 40 hours": 15, "20-40 hours": 12, "10-20 hours": 8, "5-10 hours": 4, "Less than 5 hours": 0 };
          score += q4Map[answersData[4]] || 0;
          const q8Map = { "More than 10": 5, "7-10": 3, "4-6": 1, "1-3": 0 };
          score += q8Map[answersData[8]] || 0;
          return score;
        })()
      },
      {
        id: 5,
        title: "Sales Process Acceleration",
        impact: "High",
        timeframe: "4-8 weeks",
        description: "Compress your sales cycle with automated document generation, approvals, and communications.",
        subScore: (() => {
          let score = 0;
          const q13Map = { "More than 3 months": 20, "1-3 months": 15, "2-4 weeks": 10, "1-2 weeks": 5, "Less than 1 week": 0 };
          score += q13Map[answersData[13]] || 0;
          const q12Text = answersData[12] || "";
          if (q12Text.length > 100) score += 10;
          else if (q12Text.length > 50) score += 7;
          else if (q12Text.length > 20) score += 4;
          const q11Map = { "More than 50%": 5, "25-50%": 3, "10-25%": 1, "I don't know": 1, "Less than 10%": 0 };
          score += q11Map[answersData[11]] || 0;
          return score;
        })()
      }
    ];
    
    const sorted = allOpportunities.sort((a, b) => {
      if (b.subScore !== a.subScore) return b.subScore - a.subScore;
      return a.id - b.id;
    });
    
    return sorted.slice(0, 3);
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    if (questionId === 26) {
      setEmailError('');
    }
  };

  const nextQuestion = () => {
    if (currentQ.id === 26) {
      const email = answers[26] || '';
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address');
        return;
      }
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setEmailError('');
    }
  };

  const analyzeTextForKeywords = (text, keywords) => {
    if (!text) return 0;
    const lowerText = text.toLowerCase();
    return keywords.filter(keyword => lowerText.includes(keyword)).length;
  };

  const calculateResultsFromAnswers = (answersData) => {
    let score = 0;
    
    // Section 1: High-Impact Pain Discovery (30 points)
    const q1Text = answersData[1] || "";
    const q1Keywords = {
      high: ["data entry", "document", "reporting", "manual", "spreadsheet"],
      medium: ["email", "scheduling", "communication", "calendar"],
      low: ["customer service", "follow-up", "support"]
    };
    if (analyzeTextForKeywords(q1Text, q1Keywords.high) > 0) score += 5;
    else if (analyzeTextForKeywords(q1Text, q1Keywords.medium) > 0) score += 4;
    else if (analyzeTextForKeywords(q1Text, q1Keywords.low) > 0) score += 3;
    else if (q1Text.length > 20) score += 2;
    
    const q2Text = answersData[2] || "";
    const q2Keywords = {
      processes: ["process", "system", "workflow", "infrastructure"],
      people: ["team", "people", "staff", "capacity"],
      customer: ["customer service", "response time", "support"]
    };
    if (analyzeTextForKeywords(q2Text, q2Keywords.processes) > 0) score += 5;
    else if (analyzeTextForKeywords(q2Text, q2Keywords.people) > 0) score += 4;
    else if (analyzeTextForKeywords(q2Text, q2Keywords.customer) > 0) score += 3;
    else if (q2Text.length > 20) score += 2;
    
    const q3Text = answersData[3] || "";
    if (q3Text.length > 50) score += 5;
    else if (q3Text.length > 20) score += 3;
    else if (q3Text.length > 0) score += 1;
    
    const busyworkMap = {
      "Less than 5 hours": 3,
      "5-10 hours": 6,
      "10-20 hours": 9,
      "20-40 hours": 12,
      "More than 40 hours": 15
    };
    score += busyworkMap[answersData[4]] || 0;
    
    // Section 2: Back Office & Operational Inefficiencies (25 points)
    const dataEntryMap = {
      "Yes, daily": 5,
      "Yes, weekly": 4,
      "Occasionally": 2,
      "No": 0
    };
    score += dataEntryMap[answersData[5]] || 0;
    
    const copyPasteMap = {
      "Yes, constantly": 5,
      "Yes, regularly": 4,
      "Sometimes": 2,
      "No": 0
    };
    score += copyPasteMap[answersData[6]] || 0;
    
    const excelMap = {
      "Yes, for most processes": 5,
      "Yes, for some processes": 3,
      "Rarely": 1,
      "No": 0
    };
    score += excelMap[answersData[7]] || 0;
    
    const toolsMap = {
      "More than 10": 5,
      "7-10": 4,
      "4-6": 2,
      "1-3": 1
    };
    score += toolsMap[answersData[8]] || 0;
    
    const adminMap = {
      "Over 75% admin": 5,
      "50-75% admin": 4,
      "25-50% admin": 3,
      "10-25% admin": 1
    };
    score += adminMap[answersData[9]] || 0;
    
    // Section 3: Revenue Growth & Customer Experience (25 points)
    const q10Text = answersData[10] || "";
    const leadKeywords = {
      manual: ["spreadsheet", "excel", "email", "manual"],
      basicCRM: ["crm", "salesforce", "hubspot"],
      automated: ["automated", "automation", "ai"]
    };
    if (analyzeTextForKeywords(q10Text, leadKeywords.manual) > 0) score += 7;
    else if (analyzeTextForKeywords(q10Text, leadKeywords.basicCRM) > 0) score += 5;
    else if (analyzeTextForKeywords(q10Text, leadKeywords.automated) > 0) score += 3;
    else if (q10Text.length > 20) score += 4;
    
    const fallthroughMap = {
      "More than 50%": 6,
      "25-50%": 5,
      "10-25%": 3,
      "Less than 10%": 1,
      "I don't know": 4
    };
    score += fallthroughMap[answersData[11]] || 0;
    
    const q12Text = answersData[12] || "";
    if (q12Text.length > 100) score += 6;
    else if (q12Text.length > 50) score += 4;
    else if (q12Text.length > 20) score += 2;
    
    const timelineMap = {
      "More than 3 months": 6,
      "1-3 months": 5,
      "2-4 weeks": 3,
      "1-2 weeks": 2,
      "Less than 1 week": 1
    };
    score += timelineMap[answersData[13]] || 0;
    
    // Section 4: Knowledge Management (10 points)
    const knowledgeMap = {
      "No, knowledge lives in people's heads": 4,
      "No, information is scattered": 4,
      "Yes, but it's outdated": 2,
      "Yes, and it's well-maintained": 0
    };
    score += knowledgeMap[answersData[14]] || 0;
    
    const reinventMap = {
      "Daily": 3,
      "Weekly": 2,
      "Monthly": 1,
      "Rarely": 0
    };
    score += reinventMap[answersData[15]] || 0;
    
    const q16Text = answersData[16] || "";
    if (q16Text.length > 50) score += 3;
    else if (q16Text.length > 20) score += 2;
    else if (q16Text.length > 0) score += 1;
    
    // Section 5: Urgency & AI Readiness (10 points)
    const motivationMap = {
      "Scale without proportionally increasing headcount": 5,
      "Reduce costs/overhead": 5,
      "Reduce human errors": 4,
      "Improve customer experience/speed": 4,
      "Free up team for strategic work": 3,
      "Increase employee satisfaction": 3,
      "Other": 3
    };
    score += motivationMap[answersData[17]] || 0;
    
    const q18Text = answersData[18] || "";
    if (q18Text.length > 50) score += 5;
    else if (q18Text.length > 20) score += 3;
    else if (q18Text.length > 0) score += 1;
    
    // Apply multipliers
    const sizeMultiplierMap = {
      "1-10": 0.9,
      "11-50": 1.0,
      "51-100": 1.0,
      "101-500": 1.1,
      "501-1,000": 1.15,
      "1,001-5,000": 1.2,
      "5,001-10,000": 1.25,
      "Over 10,000": 1.25
    };
    const sizeMultiplier = sizeMultiplierMap[answersData[22]] || 1.0;
    
    const revenueMultiplierMap = {
      "Under $100K": 0.9,
      "$100K - $500K": 0.9,
      "$500K - $1M": 1.0,
      "$1M - $10M": 1.0,
      "$10M - $100M": 1.1,
      "$100M - $1B": 1.15,
      "Over $1B": 1.2
    };
    const revenueMultiplier = revenueMultiplierMap[answersData[23]] || 1.0;
    
    let finalScore = Math.round(score * sizeMultiplier * revenueMultiplier);
    finalScore = Math.min(100, Math.max(0, finalScore));
    
    setAiScore(finalScore);
    setShowResults(true);
    
    // Send data to Google Sheets
    sendToGoogleSheets(answersData, finalScore);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sendToGoogleSheets = async (answersData, calculatedScore) => {
    try {
      // Get top 3 opportunities with full details
      const opportunities = getTopOpportunitiesForSheet(answersData);
      
      // Get score band
      const scoreBand = getScoreBand(calculatedScore);
      
      // Prepare comprehensive data payload
      const payload = {
        // Calculated Results
        aiScore: calculatedScore,
        scoreBand: scoreBand.level,
        
        // Top 3 Opportunities (full details)
        opportunity1: opportunities[0] || null,
        opportunity2: opportunities[1] || null,
        opportunity3: opportunities[2] || null,
        
        // All 26 Question Answers
        q1: answersData[1] || '',
        q2: answersData[2] || '',
        q3: answersData[3] || '',
        q4: answersData[4] || '',
        q5: answersData[5] || '',
        q6: answersData[6] || '',
        q7: answersData[7] || '',
        q8: answersData[8] || '',
        q9: answersData[9] || '',
        q10: answersData[10] || '',
        q11: answersData[11] || '',
        q12: answersData[12] || '',
        q13: answersData[13] || '',
        q14: answersData[14] || '',
        q15: answersData[15] || '',
        q16: answersData[16] || '',
        q17: answersData[17] || '',
        q18: answersData[18] || '',
        q19: answersData[19] || '',
        q20: answersData[20] || '',
        q21: answersData[21] || '',
        q22: answersData[22] || '',
        q23: answersData[23] || '',
        q24: answersData[24] || '',
        q25: answersData[25] || '',
        q26: answersData[26] || '',
        
        // Business Profile (extracted for convenience)
        organization: answersData[19] || '',
        country: answersData[20] || '',
        industry: answersData[21] || '',
        employees: answersData[22] || '',
        revenue: answersData[23] || '',
        firstName: answersData[24] || '',
        lastName: answersData[25] || '',
        email: answersData[26] || '',
        
        // Top opportunity title only (for CRM column)
        topOpportunity: opportunities[0]?.title || ''
      };
      
      // Send to Google Apps Script
      const response = await fetch('https://script.google.com/macros/s/AKfycbybWkU2NRVQBDgfDdcFoX927Tab3LvecGh25O0rcRLmAKQBt1wG0Vz5swQLDkLs6BNN/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      // Note: no-cors mode doesn't allow reading response, but data is sent
      console.log('Data sent to Google Sheets');
      
    } catch (error) {
      console.error('Error sending to Google Sheets:', error);
      // Don't show error to user - results page still displays normally
    }
  };

  const getTopOpportunitiesForSheet = (answersData) => {
    // Safety check
    if (!answersData || Object.keys(answersData).length === 0) {
      return [];
    }
    
    // Calculate opportunities with sub-scores (same logic as getTopOpportunities)
    const allOpportunities = [
      {
        id: 1,
        title: "Automated Data Entry & Integration",
        impact: "High",
        timeframe: "2-4 weeks",
        description: "Eliminate manual data entry and copy-paste workflows with intelligent automation and system integrations.",
        subScore: (() => {
          let score = 0;
          const q5Map = { "Yes, daily": 15, "Yes, weekly": 10, "Occasionally": 5, "No": 0 };
          score += q5Map[answersData[5]] || 0;
          const q6Map = { "Yes, constantly": 15, "Yes, regularly": 10, "Sometimes": 5, "No": 0 };
          score += q6Map[answersData[6]] || 0;
          const q7Map = { "Yes, for most processes": 5, "Yes, for some processes": 3, "Rarely": 1, "No": 0 };
          score += q7Map[answersData[7]] || 0;
          return score;
        })()
      },
      {
        id: 2,
        title: "AI-Powered Lead Management",
        impact: "High",
        timeframe: "3-6 weeks",
        description: "Automate lead qualification, follow-ups, and nurturing to capture more revenue opportunities.",
        subScore: (() => {
          let score = 0;
          const q11Map = { "More than 50%": 20, "25-50%": 15, "10-25%": 10, "Less than 10%": 5, "I don't know": 12 };
          score += q11Map[answersData[11]] || 0;
          const q10Text = (answersData[10] || "").toLowerCase();
          if (q10Text.includes("spreadsheet") || q10Text.includes("excel") || q10Text.includes("manual")) score += 10;
          else if (q10Text.includes("email")) score += 5;
          else if (q10Text.includes("crm") || q10Text.includes("automated")) score += 2;
          const q13Map = { "More than 3 months": 10, "1-3 months": 7, "2-4 weeks": 4, "1-2 weeks": 2, "Less than 1 week": 0 };
          score += q13Map[answersData[13]] || 0;
          return score;
        })()
      },
      {
        id: 3,
        title: "AI Knowledge Management System",
        impact: "Medium-High",
        timeframe: "4-6 weeks",
        description: "Create an intelligent knowledge base that learns and provides instant answers to team questions.",
        subScore: (() => {
          let score = 0;
          const q14Map = { 
            "No, knowledge lives in people's heads": 15, 
            "No, information is scattered": 15, 
            "Yes, but it's outdated": 8, 
            "Yes, and it's well-maintained": 0 
          };
          score += q14Map[answersData[14]] || 0;
          const q15Map = { "Daily": 10, "Weekly": 7, "Monthly": 4, "Rarely": 0 };
          score += q15Map[answersData[15]] || 0;
          const q16Text = answersData[16] || "";
          if (q16Text.length > 100) score += 5;
          else if (q16Text.length > 50) score += 3;
          else if (q16Text.length > 20) score += 1;
          return score;
        })()
      },
      {
        id: 4,
        title: "Administrative Task Automation",
        impact: "High",
        timeframe: "2-3 weeks",
        description: "Free your team from busywork with intelligent automation of routine administrative tasks.",
        subScore: (() => {
          let score = 0;
          const q9Map = { "Over 75% admin": 20, "50-75% admin": 15, "25-50% admin": 10, "10-25% admin": 5 };
          score += q9Map[answersData[9]] || 0;
          const q4Map = { "More than 40 hours": 15, "20-40 hours": 12, "10-20 hours": 8, "5-10 hours": 4, "Less than 5 hours": 0 };
          score += q4Map[answersData[4]] || 0;
          const q8Map = { "More than 10": 5, "7-10": 3, "4-6": 1, "1-3": 0 };
          score += q8Map[answersData[8]] || 0;
          return score;
        })()
      },
      {
        id: 5,
        title: "Sales Process Acceleration",
        impact: "High",
        timeframe: "4-8 weeks",
        description: "Compress your sales cycle with automated document generation, approvals, and communications.",
        subScore: (() => {
          let score = 0;
          const q13Map = { "More than 3 months": 20, "1-3 months": 15, "2-4 weeks": 10, "1-2 weeks": 5, "Less than 1 week": 0 };
          score += q13Map[answersData[13]] || 0;
          const q12Text = answersData[12] || "";
          if (q12Text.length > 100) score += 10;
          else if (q12Text.length > 50) score += 7;
          else if (q12Text.length > 20) score += 4;
          const q11Map = { "More than 50%": 5, "25-50%": 3, "10-25%": 1, "I don't know": 1, "Less than 10%": 0 };
          score += q11Map[answersData[11]] || 0;
          return score;
        })()
      }
    ];
    
    // Sort and return top 3
    const sorted = allOpportunities.sort((a, b) => {
      if (b.subScore !== a.subScore) return b.subScore - a.subScore;
      return a.id - b.id;
    });
    
    return sorted.slice(0, 3);
  };

  const calculateResults = () => {
    calculateResultsFromAnswers(answers);
  };

  const getScoreBand = (score) => {
    if (score >= 90) return {
      level: "Critical Opportunity",
      description: "Immediate, high-impact automation potential across multiple processes.",
      color: "from-green-500 to-emerald-500"
    };
    if (score >= 70) return {
      level: "Very High Opportunity",
      description: "Significant automation potential with clear pain points and defined solutions.",
      color: "from-green-500 to-emerald-500"
    };
    if (score >= 50) return {
      level: "High Opportunity",
      description: "Good automation potential in specific areas with quick wins available.",
      color: "from-green-500 to-emerald-500"
    };
    if (score >= 30) return {
      level: "Moderate Opportunity",
      description: "Selective automation opportunities that may benefit from targeted solutions.",
      color: "from-green-500 to-emerald-500"
    };
    return {
      level: "Emerging Opportunity",
      description: "Already well-optimized or limited automation needs.",
      color: "from-green-500 to-emerald-500"
    };
  };

  const getTopOpportunities = () => {
    // Safety check - return empty array if answers is not populated
    if (!answers || Object.keys(answers).length === 0) {
      return [];
    }
    
    // Define all 5 opportunities with their sub-score calculations
    const allOpportunities = [
      {
        id: 1,
        title: "Automated Data Entry & Integration",
        impact: "High",
        timeframe: "2-4 weeks",
        description: "Eliminate manual data entry and copy-paste workflows with intelligent automation and system integrations.",
        subScore: (() => {
          let score = 0;
          // Q5 - Manual data entry
          const q5Map = { "Yes, daily": 15, "Yes, weekly": 10, "Occasionally": 5, "No": 0 };
          score += q5Map[answers[5]] || 0;
          // Q6 - Copy-paste
          const q6Map = { "Yes, constantly": 15, "Yes, regularly": 10, "Sometimes": 5, "No": 0 };
          score += q6Map[answers[6]] || 0;
          // Q7 - Excel usage
          const q7Map = { "Yes, for most processes": 5, "Yes, for some processes": 3, "Rarely": 1, "No": 0 };
          score += q7Map[answers[7]] || 0;
          return score;
        })()
      },
      {
        id: 2,
        title: "AI-Powered Lead Management",
        impact: "High",
        timeframe: "3-6 weeks",
        description: "Automate lead qualification, follow-ups, and nurturing to capture more revenue opportunities.",
        subScore: (() => {
          let score = 0;
          // Q11 - Lead fallthrough
          const q11Map = { "More than 50%": 20, "25-50%": 15, "10-25%": 10, "Less than 10%": 5, "I don't know": 12 };
          score += q11Map[answers[11]] || 0;
          // Q10 - Lead processing keywords
          const q10Text = (answers[10] || "").toLowerCase();
          if (q10Text.includes("spreadsheet") || q10Text.includes("excel") || q10Text.includes("manual")) score += 10;
          else if (q10Text.includes("email")) score += 5;
          else if (q10Text.includes("crm") || q10Text.includes("automated")) score += 2;
          // Q13 - Sales cycle
          const q13Map = { "More than 3 months": 10, "1-3 months": 7, "2-4 weeks": 4, "1-2 weeks": 2, "Less than 1 week": 0 };
          score += q13Map[answers[13]] || 0;
          return score;
        })()
      },
      {
        id: 3,
        title: "AI Knowledge Management System",
        impact: "Medium-High",
        timeframe: "4-6 weeks",
        description: "Create an intelligent knowledge base that learns and provides instant answers to team questions.",
        subScore: (() => {
          let score = 0;
          // Q14 - Knowledge base status
          const q14Map = { 
            "No, knowledge lives in people's heads": 15, 
            "No, information is scattered": 15, 
            "Yes, but it's outdated": 8, 
            "Yes, and it's well-maintained": 0 
          };
          score += q14Map[answers[14]] || 0;
          // Q15 - Reinventing wheel
          const q15Map = { "Daily": 10, "Weekly": 7, "Monthly": 4, "Rarely": 0 };
          score += q15Map[answers[15]] || 0;
          // Q16 - Text length
          const q16Text = answers[16] || "";
          if (q16Text.length > 100) score += 5;
          else if (q16Text.length > 50) score += 3;
          else if (q16Text.length > 20) score += 1;
          return score;
        })()
      },
      {
        id: 4,
        title: "Administrative Task Automation",
        impact: "High",
        timeframe: "2-3 weeks",
        description: "Free your team from busywork with intelligent automation of routine administrative tasks.",
        subScore: (() => {
          let score = 0;
          // Q9 - Admin time
          const q9Map = { "Over 75% admin": 20, "50-75% admin": 15, "25-50% admin": 10, "10-25% admin": 5 };
          score += q9Map[answers[9]] || 0;
          // Q4 - Busywork hours
          const q4Map = { "More than 40 hours": 15, "20-40 hours": 12, "10-20 hours": 8, "5-10 hours": 4, "Less than 5 hours": 0 };
          score += q4Map[answers[4]] || 0;
          // Q8 - Number of tools
          const q8Map = { "More than 10": 5, "7-10": 3, "4-6": 1, "1-3": 0 };
          score += q8Map[answers[8]] || 0;
          return score;
        })()
      },
      {
        id: 5,
        title: "Sales Process Acceleration",
        impact: "High",
        timeframe: "4-8 weeks",
        description: "Compress your sales cycle with automated document generation, approvals, and communications.",
        subScore: (() => {
          let score = 0;
          // Q13 - Contract timeline
          const q13Map = { "More than 3 months": 20, "1-3 months": 15, "2-4 weeks": 10, "1-2 weeks": 5, "Less than 1 week": 0 };
          score += q13Map[answers[13]] || 0;
          // Q12 - Text length
          const q12Text = answers[12] || "";
          if (q12Text.length > 100) score += 10;
          else if (q12Text.length > 50) score += 7;
          else if (q12Text.length > 20) score += 4;
          // Q11 - Lead fallthrough
          const q11Map = { "More than 50%": 5, "25-50%": 3, "10-25%": 1, "I don't know": 1, "Less than 10%": 0 };
          score += q11Map[answers[11]] || 0;
          return score;
        })()
      }
    ];
    
    // Sort by subScore (descending), use id as tiebreaker
    const sorted = allOpportunities.sort((a, b) => {
      if (b.subScore !== a.subScore) return b.subScore - a.subScore;
      return a.id - b.id;
    });
    
    // Return top 3
    return sorted.slice(0, 3);
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = answers[currentQ?.id] && 
    (currentQ.type === 'textarea' || currentQ.type === 'text' || currentQ.type === 'email' || currentQ.type === 'dropdown'
      ? answers[currentQ.id].length > 0
      : answers[currentQ.id]);

  if (showResults) {
    const scoreBand = getScoreBand(aiScore);
    const opportunities = getTopOpportunities();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" style={{animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" style={{animation: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10">
          <header className="container mx-auto px-4 py-6">
            <button 
              onClick={() => {
                setShowResults(false);
                setShowQuestionnaire(false);
              }}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">
                J
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-tight">
                Jana<span className="text-blue-400">AI</span>
              </span>
            </button>
          </header>

          <div className="container mx-auto px-4 py-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Your AI Opportunity Report
                </h1>
                <p className="text-xl text-slate-300">
                  Thank you, {answers[24]}! Here's your personalized assessment.
                </p>
              </div>

              {/* AI Score Card */}
              <div className="bg-gradient-to-br from-blue-900/50 to-slate-900/50 backdrop-blur border border-blue-500/50 rounded-3xl p-8 md:p-12 mb-8">
                <div className="text-center">
                  <p className="text-lg text-slate-400 mb-6">Your AI Opportunity Score</p>
                  <div className="flex items-center justify-center mb-6">
                    <div className={`text-8xl font-bold bg-gradient-to-r ${scoreBand.color} bg-clip-text text-transparent`}>
                      {aiScore}
                    </div>
                    <div className="text-4xl text-slate-400 ml-2">/100</div>
                  </div>
                  <div className={`inline-block px-6 py-3 bg-gradient-to-r ${scoreBand.color} rounded-full mb-6`}>
                    <p className="text-xl font-bold text-white">{scoreBand.level}</p>
                  </div>
                  <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                    {scoreBand.description}
                  </p>
                </div>
              </div>

              {/* Top Opportunities */}
              {opportunities.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-6 flex items-center">
                    <Zap className="mr-3 text-amber-400" size={32} />
                    Your Top {opportunities.length} AI Opportunities
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {opportunities.map((opp, index) => (
                      <div key={index} className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all">
                        <div className="text-sm font-semibold text-blue-400 mb-2">#{index + 1} Priority</div>
                        <h3 className="text-xl font-bold mb-4">{opp.title}</h3>
                        <div className="space-y-2 text-sm text-slate-400 mb-4">
                          <div className="flex items-center">
                            <TrendingUp size={16} className="mr-2 text-green-400" />
                            Impact: <span className="text-white ml-1">{opp.impact}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-2 text-amber-400" />
                            Timeline: <span className="text-white ml-1">{opp.timeframe}</span>
                          </div>
                        </div>
                        <p className="text-slate-300 text-sm">{opp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Next Steps */}
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur border border-blue-500/50 rounded-2xl p-8 mb-8">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <Target className="mr-3 text-blue-400" size={32} />
                  Recommended Next Steps
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="text-xl font-bold mb-2">1. Schedule a Strategy Call</h3>
                      <p className="text-slate-300">Let's discuss your specific opportunities and create a custom automation roadmap.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="text-xl font-bold mb-2">2. Process Deep Dive</h3>
                      <p className="text-slate-300">We'll analyze your top priority process to identify quick wins and high-impact opportunities.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="text-xl font-bold mb-2">3. Pilot Implementation</h3>
                      <p className="text-slate-300">Start with a focused pilot to demonstrate value and build momentum for broader transformation.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8">
                {/* Limited Time Offer Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4 animate-pulse">
                  <Sparkles size={18} className="mr-2" />
                  <span className="font-bold text-sm">Limited Time Offer</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
                <p className="text-slate-300 mb-6">Book a free 45-minute consultation to discuss your AI automation strategy</p>
                
                <a 
                  href="https://calendly.com/stephane-janaai/45-minute-meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 mb-4"
                >
                  Schedule Free Consultation
                </a>
                
                <p className="text-sm text-slate-500">
                  We'll send a detailed PDF report to {answers[26]}
                </p>
                <button 
                  onClick={() => {
                    setShowResults(false);
                    setShowQuestionnaire(false);
                  }}
                  className="block mx-auto mt-4 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showQuestionnaire) {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const currentSection = currentQ.section;
    const sectionQuestions = questions.filter(q => q.section === currentSection);
    const sectionIndex = sectionQuestions.findIndex(q => q.id === currentQ.id);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" style={{animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" style={{animation: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10">
          <header className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setShowQuestionnaire(false)}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">
                  J
                </div>
                <span className="text-xl md:text-2xl font-bold tracking-tight">
                  Jana<span className="text-blue-400">AI</span>
                </span>
              </button>
              <button 
                onClick={() => setShowQuestionnaire(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                Exit
              </button>
            </div>
          </header>

          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8 md:p-12 mb-6">
                <div className="mb-6">
                  <div className="text-sm font-semibold text-blue-400 mb-3">
                    {currentSection} - Question {sectionIndex + 1}/{sectionQuestions.length}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-8">{currentQ.question}</h2>
                </div>

                {/* Answer Input */}
                {currentQ.type === 'textarea' ? (
                  <textarea
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                    placeholder={currentQ.placeholder}
                    rows={4}
                    className="w-full p-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                ) : currentQ.type === 'text' ? (
                  <input
                    type="text"
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                    placeholder={currentQ.placeholder}
                    className="w-full p-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                ) : currentQ.type === 'email' ? (
                  <div>
                    <input
                      type="email"
                      value={answers[currentQ.id] || ''}
                      onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                      placeholder={currentQ.placeholder}
                      className={`w-full p-4 bg-slate-800/50 border-2 rounded-xl text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        emailError ? 'border-red-500' : 'border-slate-700 focus:border-blue-500'
                      }`}
                    />
                    {emailError && (
                      <div className="flex items-center mt-2 text-red-400 text-sm">
                        <AlertCircle size={16} className="mr-2" />
                        {emailError}
                      </div>
                    )}
                  </div>
                ) : currentQ.type === 'dropdown' ? (
                  <select
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                    className="w-full p-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select a country...</option>
                    {currentQ.options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <div className="space-y-3">
                    {currentQ.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(currentQ.id, option)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          answers[currentQ.id] === option
                            ? 'border-blue-500 bg-blue-500/20'
                            : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            answers[currentQ.id] === option
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-slate-600'
                          }`}>
                            {answers[currentQ.id] === option && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <span className="text-lg">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className={`px-6 py-3 rounded-lg font-semibold flex items-center transition-all ${
                    currentQuestion === 0
                      ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  <ChevronLeft size={20} className="mr-2" />
                  Previous
                </button>

                <button
                  onClick={nextQuestion}
                  disabled={!isAnswered}
                  className={`px-6 py-3 rounded-lg font-semibold flex items-center transition-all ${
                    !isAnswered
                      ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-xl hover:shadow-blue-500/50'
                  }`}
                >
                  {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
                  <ChevronRight size={20} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Landing Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" style={{animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" style={{animation: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">
                J
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-tight">
                Jana<span className="text-blue-400">AI</span>
              </span>
            </div>
            <div className="flex flex-col items-end">
              <div className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-sm text-blue-300">
                ✨ Free Assessment
              </div>
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 pt-8 md:pt-12 pb-12 md:pb-16">
          <div className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 md:mb-8">
              What's Your{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-blue-400 animate-shimmer bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-[length:200%_100%] bg-clip-text">
                  AI Opportunity Score?
                </span>
              </span>
            </h1>
            
            <style jsx>{`
              @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
              }
              .animate-shimmer {
                animation: shimmer 8s ease-in-out infinite;
              }
            `}</style>
            
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-10 max-w-3xl">
              Get a clear, practical view of where AI can actually help your business<br />in just a few minutes.
            </p>
            
            <p className="text-lg md:text-xl text-slate-400 mb-12">
              No complicated tools, jargon, or commitment needed.
            </p>

            <div className="flex flex-col items-center gap-4">
              <button 
                onClick={startAssessment}
                className="group relative px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-gradient-shift"></div>
                <span className="relative z-10">Start the Assessment</span>
                <ArrowRight className="relative z-10 ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <div className="text-sm text-slate-400 flex items-center justify-center">
                <Clock size={16} className="mr-2" />
                Takes 3-5 minutes · Immediate results
              </div>
            </div>

            <style jsx>{`
              @keyframes gradient-shift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .animate-gradient-shift {
                background-size: 200% 200%;
                animation: gradient-shift 3s ease infinite;
              }
            `}</style>

            <p className="mt-6 text-sm text-slate-500 italic text-center">
              Used by SME owners and agency leaders who want to work smarter—without breaking what already works.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
              What You Will Get
            </h2>
            <p className="text-lg text-slate-400 text-center mb-12 md:mb-16">
              After a short assessment, you'll receive:
            </p>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: "Your AI Opportunity Score (0–100)",
                  description: "A simple indicator of how much practical AI upside you actually have.",
                  gradient: "from-blue-600 to-blue-400",
                  circleColors: { left: "#93c5fd", right: "#60a5fa", overlap: "#3b82f6" }
                },
                {
                  title: "Your Top 3 AI Opportunities",
                  description: "Specific processes where automation would deliver the fastest return.",
                  gradient: "from-orange-600 to-orange-400",
                  circleColors: { left: "#fdba74", right: "#fb923c", overlap: "#f97316" }
                },
                {
                  title: "Do This First Recommendation",
                  description: "So you stop guessing and start acting with confidence.",
                  gradient: "from-green-600 to-green-400",
                  circleColors: { left: "#86efac", right: "#4ade80", overlap: "#22c55e" }
                }
              ].map((item, index) => {
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`group relative p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl transition-all duration-300 hover:border-slate-700 hover:shadow-lg cursor-pointer ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{
                      transitionDelay: `${index * 150}ms`
                    }}
                  >
                    {/* Icon and Title in flex layout */}
                    <div className="flex items-center gap-4 mb-1">
                      {/* Interconnected circles icon */}
                      <div className={`flex-shrink-0 inline-flex p-3 rounded-xl bg-gradient-to-br ${item.gradient} group-hover:scale-105 transition-transform duration-300`}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Left circle */}
                          <circle cx="10" cy="14" r="8" stroke={item.circleColors.left} strokeWidth="2" fill="none" opacity="1"/>
                          {/* Right circle */}
                          <circle cx="18" cy="14" r="8" stroke={item.circleColors.right} strokeWidth="2" fill="none" opacity="1"/>
                          {/* Overlap section - using clip path for the intersection */}
                          <path d="M 14 6 A 8 8 0 0 1 14 22 A 8 8 0 0 1 14 6" fill={item.circleColors.overlap} opacity="0.6"/>
                        </svg>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    
                    <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300" style={{ marginLeft: '68px' }}>
                      {item.description}
                    </p>
                    
                    {/* Subtle hover glow effect */}
                    {hoveredCard === index && (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl pointer-events-none"></div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-slate-300 font-medium">
                No tools to install. No technical knowledge required.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16 bg-gradient-to-r from-slate-900/50 to-blue-900/30 backdrop-blur">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-center leading-tight">
              The Problem Isn't AI.
              <br />
              <span className="text-blue-400">It's Where to Start.</span>
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-slate-300 leading-relaxed">
              <p>
                Most business owners aren't "anti-AI." They hesitate because the technology is new, a little intimidating, and the possibilities are endless.
              </p>
              
              <p className="text-amber-400 font-medium">
                Hesitating turns into procrastination because guessing is expensive.
              </p>
              
              <p>
                However, those who act early and make the right calls will benefit tremendously while their competitors remain stuck in the past.
              </p>

              <div className="my-12 p-8 bg-blue-500/10 border-l-4 border-blue-400 rounded-r-xl">
                <p className="text-2xl md:text-3xl font-bold text-blue-300 mb-4">
                  That's why the AI Opportunity Score exists.
                </p>
              </div>

              <p>
                It doesn't assume your business is ready for AI everywhere. It evaluates where AI actually makes sense, based on how your work is done today.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">No hype.</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">Just clarity.</div>
                </div>
              </div>

              <div className="bg-slate-900/80 rounded-2xl p-8 space-y-4">
                <p className="font-semibold text-white text-xl mb-4">A clear, grounded view of:</p>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={24} />
                  <p>Where AI would deliver fast, low-risk wins</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="text-amber-400 flex-shrink-0 mt-1" size={24} />
                  <p>Where it would be premature</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="text-blue-400 flex-shrink-0 mt-1" size={24} />
                  <p>And where you should simply leave things alone</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="bg-slate-900/50 backdrop-blur border border-green-500/30 rounded-2xl p-8 md:p-10">
                <div className="flex items-center mb-6">
                  <CheckCircle2 className="text-green-400 mr-3" size={32} />
                  <h2 className="text-2xl md:text-3xl font-bold">Who This Is For</h2>
                </div>
                <p className="text-slate-300 mb-6">This is for you if:</p>
                <ul className="space-y-4">
                  {[
                    "You run an SME or an agency",
                    "Admin, data entry, or lead handling feels heavier every month",
                    "You're curious about AI—but skeptical of hype",
                    "You want clarity, not another platform demo"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900/50 backdrop-blur border border-red-500/30 rounded-2xl p-8 md:p-10">
                <div className="flex items-center mb-6">
                  <XCircle className="text-red-400 mr-3" size={32} />
                  <h2 className="text-2xl md:text-3xl font-bold">What This Is NOT</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    "Not a generic AI checklist",
                    "Not a hidden software pitch",
                    "Not AI will replace your team nonsense"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <XCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-slate-700">
                  <p className="text-lg text-white font-medium">
                    It's a decision tool, built to help you make smarter calls—fast.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-blue-900/50 to-slate-900/50 backdrop-blur border border-blue-500/50 rounded-3xl p-10 md:p-16 shadow-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Get Your AI Opportunity Score
              </h2>
              
              <div className="flex flex-wrap justify-center gap-6 mb-10 text-slate-300">
                <div className="flex items-center">
                  <Clock className="mr-2 text-blue-400" size={20} />
                  <span>Takes 3-5 minutes</span>
                </div>
                <div className="flex items-center">
                  <Zap className="mr-2 text-amber-400" size={20} />
                  <span>Immediate results</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="mr-2 text-green-400" size={20} />
                  <span>No obligation</span>
                </div>
              </div>

              <button 
                onClick={startAssessment}
                className="group relative px-10 py-5 rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center mx-auto overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-gradient-shift"></div>
                <span className="relative z-10">Start the Assessment</span>
                <ArrowRight className="relative z-10 ml-3 group-hover:translate-x-2 transition-transform" size={24} />
              </button>

              <style jsx>{`
                @keyframes gradient-shift {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
                .animate-gradient-shift {
                  background-size: 200% 200%;
                  animation: gradient-shift 3s ease infinite;
                }
              `}</style>

              <p className="mt-8 text-sm text-slate-400 italic max-w-2xl mx-auto text-center">
                Used by SME owners and agency leaders who want to work smarter
                <br />
                —without breaking what already works.
              </p>
            </div>
          </div>
        </section>

        <footer className="container mx-auto px-4 py-12 border-t border-slate-800">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center font-bold">
                  J
                </div>
                <span className="text-lg font-bold">
                  Jana<span className="text-blue-400">AI</span>
                </span>
              </div>

              <div className="flex items-center gap-6">
                <a 
                  href="mailto:support@janaai.io" 
                  className="text-sm text-slate-400 hover:text-blue-300 hover:underline transition-all duration-200"
                >
                  Contact Us
                </a>
                <div className="text-sm text-slate-500">
                  © 2026 JanaAI. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
