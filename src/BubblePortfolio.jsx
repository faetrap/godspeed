import React, { useState, useEffect } from 'react';

// Custom hook for responsive design
const useResponsive = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    windowWidth,
    isMobile: windowWidth < 768,
    isSmallMobile: windowWidth < 480,
    isVerySmallMobile: windowWidth < 360,
  };
};

// SKILLS - Transferrable connections (smaller bubbles)
// These are core skills that connect across multiple jobs
const SKILLS = [
  { id: 'skill1', label: 'Core Skill 1', emoji: '⭐', color: '#00D4FF' },
  { id: 'skill2', label: 'Core Skill 2', emoji: '⭐', color: '#A855F7' },
  { id: 'skill3', label: 'Core Skill 3', emoji: '⭐', color: '#4ECDC4' },
  { id: 'skill4', label: 'Core Skill 4', emoji: '⭐', color: '#FFE66D' },
  { id: 'skill5', label: 'Core Skill 5', emoji: '⭐', color: '#F97316' },
  { id: 'skill6', label: 'Core Skill 6', emoji: '⭐', color: '#22C55E' },
];

// JOBS - Main experiences (bigger bubbles) - repositioned to avoid overlap
// Each job connects to skills - skills that appear in multiple jobs show transferrable abilities
const JOBS = [
  {
    id: 'job1',
    title: 'Job Title 1',
    company: 'Company A',
    skills: ['skill1', 'skill2', 'skill3', 'skill4', 'skill5', 'skill6'],
    x: 0.15,
    y: 0.22,
    stories: {
      skill1: "Describe how you demonstrated this skill in this role. What did you do? What was the impact?",
      skill2: "Describe how you demonstrated this skill in this role. What did you do? What was the impact?",
      skill3: "Describe how you demonstrated this skill in this role. What did you do? What was the impact?",
      skill4: "Describe how you demonstrated this skill in this role. What did you do? What was the impact?",
      skill5: "Describe how you demonstrated this skill in this role. What did you do? What was the impact?",
      skill6: "Describe how you demonstrated this skill in this role. What did you do? What was the impact?",
    },
    process: [
      { step: 1, title: 'Step 1 Title', description: 'Describe what happens in this phase of your work process for this role.' },
      { step: 2, title: 'Step 2 Title', description: 'Describe what happens in this phase of your work process for this role.' },
      { step: 3, title: 'Step 3 Title', description: 'Describe what happens in this phase of your work process for this role.' },
      { step: 4, title: 'Step 4 Title', description: 'Describe what happens in this phase of your work process for this role.' },
      { step: 5, title: 'Step 5 Title', description: 'Describe what happens in this phase of your work process for this role.' },
    ],
  },
  {
    id: 'job2',
    title: 'Job Title 2',
    company: 'Company B',
    skills: ['skill1', 'skill2', 'skill6'],
    x: 0.85,
    y: 0.18,
    stories: {
      skill1: "Describe how you demonstrated this skill in this role.",
      skill2: "Describe how you demonstrated this skill in this role.",
      skill6: "Describe how you demonstrated this skill in this role.",
    },
    process: [
      { step: 1, title: 'Step 1 Title', description: 'Describe what happens in this phase of your work process for this role.' },
      { step: 2, title: 'Step 2 Title', description: 'Describe what happens in this phase of your work process for this role.' },
      { step: 3, title: 'Step 3 Title', description: 'Describe what happens in this phase of your work process for this role.' },
    ],
  },
  {
    id: 'job3',
    title: 'Job Title 3',
    company: 'Company C',
    skills: ['skill2', 'skill4'],
    x: 0.85,
    y: 0.78,
    stories: {
      skill2: "Describe how you demonstrated this skill in this role.",
      skill4: "Describe how you demonstrated this skill in this role.",
    },
    process: [
      { step: 1, title: 'Step 1 Title', description: 'Describe what happens in this phase of your work process for this role.' },
      { step: 2, title: 'Step 2 Title', description: 'Describe what happens in this phase of your work process for this role.' },
      { step: 3, title: 'Step 3 Title', description: 'Describe what happens in this phase of your work process for this role.' },
      { step: 4, title: 'Step 4 Title', description: 'Describe what happens in this phase of your work process for this role.' },
    ],
  },
  {
    id: 'job4',
    title: 'Job Title 4',
    company: 'Company D',
    skills: ['skill1', 'skill4', 'skill6'],
    x: 0.15,
    y: 0.78,
    stories: {
      skill1: "Describe how you demonstrated this skill in this role.",
      skill4: "Describe how you demonstrated this skill in this role.",
      skill6: "Describe how you demonstrated this skill in this role.",
    },
    process: [
      { step: 1, title: 'Step 1 Title', description: 'Describe what happens in this phase of your work process for this role.' },
      { step: 2, title: 'Step 2 Title', description: 'Describe what happens in this phase of your work process for this role.' },
      { step: 3, title: 'Step 3 Title', description: 'Describe what happens in this phase of your work process for this role.' },
      { step: 4, title: 'Step 4 Title', description: 'Describe what happens in this phase of your work process for this role.' },
      { step: 5, title: 'Step 5 Title', description: 'Describe what happens in this phase of your work process for this role.' },
    ],
  },
];

// Fixed skill positions to avoid overlap
const SKILL_POSITIONS = {
  skill1: { x: 0.32, y: 0.38 },
  skill2: { x: 0.68, y: 0.32 },
  skill3: { x: 0.50, y: 0.18 },
  skill4: { x: 0.50, y: 0.82 },
  skill5: { x: 0.32, y: 0.58 },
  skill6: { x: 0.68, y: 0.62 },
};

export default function BubblePortfolio() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredJob, setHoveredJob] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true); // Show tooltip hint until first click
  const [jobTab, setJobTab] = useState('skills'); // 'skills' | 'process'

  // Responsive breakpoints
  const { isMobile, isSmallMobile, isVerySmallMobile } = useResponsive();

  useEffect(() => {
    setMounted(true);
  }, []);

  const canvasWidth = 900;
  const canvasHeight = 560;
  const canvasTopPadding = 60;
  // Responsive bubble sizing for better mobile experience
  const jobRadius = isVerySmallMobile ? 50 : isSmallMobile ? 55 : isMobile ? 60 : 65;
  const skillRadius = isVerySmallMobile ? 24 : isSmallMobile ? 26 : isMobile ? 27 : 28;

  const getSkillPosition = (skill) => {
    const pos = SKILL_POSITIONS[skill.id];
    return {
      x: pos.x * canvasWidth,
      y: pos.y * canvasHeight,
    };
  };

  const getJobPosition = (job) => ({
    x: job.x * canvasWidth,
    y: job.y * canvasHeight,
  });

  // Check if a job and skill are related
  const areRelated = (jobId, skillId) => {
    const job = JOBS.find(j => j.id === jobId);
    return job?.skills.includes(skillId);
  };

  const isJobHighlighted = (job) => {
    // If both job and skill are selected
    if (selectedJob && selectedSkill) {
      // Only highlight if this is the selected job AND it has the selected skill
      return job.id === selectedJob && areRelated(selectedJob, selectedSkill);
    }
    // If only a job is selected, only that job should be highlighted
    if (selectedJob) return job.id === selectedJob;
    // If only a skill is selected, highlight jobs that have that skill
    if (selectedSkill) return job.skills.includes(selectedSkill);
    // Hover behavior
    if (hoveredJob) return job.id === hoveredJob;
    if (hoveredSkill) return job.skills.includes(hoveredSkill);
    // Default: all jobs highlighted
    return true;
  };

  const isSkillHighlighted = (skill) => {
    // If both job and skill are selected
    if (selectedJob && selectedSkill) {
      // Only highlight if this is the selected skill AND the job has it
      return skill.id === selectedSkill && areRelated(selectedJob, selectedSkill);
    }
    // If only a skill is selected, only that skill should be highlighted
    if (selectedSkill) return skill.id === selectedSkill;
    // If only a job is selected, highlight skills that job has
    if (selectedJob) {
      const job = JOBS.find(j => j.id === selectedJob);
      return job?.skills.includes(skill.id);
    }
    // Hover behavior
    if (hoveredSkill) return skill.id === hoveredSkill;
    if (hoveredJob) {
      const job = JOBS.find(j => j.id === hoveredJob);
      return job?.skills.includes(skill.id);
    }
    // Default: all skills highlighted
    return true;
  };

  const getActiveStory = () => {
    if (selectedJob && selectedSkill) {
      const job = JOBS.find(j => j.id === selectedJob);
      if (job?.stories[selectedSkill]) {
        return { 
          job, 
          skill: SKILLS.find(s => s.id === selectedSkill), 
          story: job.stories[selectedSkill] 
        };
      }
    }
    return null;
  };

  // Get stories for selected job (all skills)
  const getJobStories = () => {
    if (selectedJob && !selectedSkill) {
      const job = JOBS.find(j => j.id === selectedJob);
      if (job) {
        return {
          job,
          skills: job.skills.map(skillId => ({
            skill: SKILLS.find(s => s.id === skillId),
            story: job.stories[skillId]
          }))
        };
      }
    }
    return null;
  };

  // Get jobs for selected skill
  const getSkillJobs = () => {
    if (selectedSkill && !selectedJob) {
      const skill = SKILLS.find(s => s.id === selectedSkill);
      const jobsWithSkill = JOBS.filter(j => j.skills.includes(selectedSkill));
      return {
        skill,
        jobs: jobsWithSkill.map(job => ({
          job,
          story: job.stories[selectedSkill]
        }))
      };
    }
    return null;
  };

  const activeStory = getActiveStory();
  const jobStories = getJobStories();
  const skillJobs = getSkillJobs();

  const getConnectionsForSkill = (skill) => {
    return JOBS.filter(j => j.skills.includes(skill.id));
  };

  // Cute tooltip messages that rotate
  const cuteMessages = [
    "Explore",
    "Explore",
    "Explore",
    "Explore",
  ];

  // Get a consistent message based on item id
  const getTooltipMessage = (id) => {
    const hash = id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return cuteMessages[hash % cuteMessages.length];
  };

  // Hide tooltip after first click
  const handleFirstClick = () => {
    if (showTooltip) setShowTooltip(false);
  };

  // Cute Tooltip Component for SVG
  const CuteTooltip = ({ x, y, message, color }) => (
    <g style={{ pointerEvents: 'none' }}>
      {/* Pulsing glow ring */}
      <circle
        cx={x}
        cy={y - 28}
        r={58}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.15"
        style={{ animation: 'tooltipPulse 2s ease-in-out infinite' }}
      />
      {/* Tooltip background */}
      <rect
        x={x - 54}
        y={y - 44}
        width={108}
        height={30}
        rx={15}
        fill="#1a1a2e"
        stroke={color}
        strokeWidth="1.5"
        style={{
          filter: `drop-shadow(0 4px 16px ${color}55)`,
        }}
      />
      {/* Little triangle pointer */}
      <polygon
        points={`${x - 7},${y - 14} ${x + 7},${y - 14} ${x},${y - 4}`}
        fill="#1a1a2e"
        stroke={color}
        strokeWidth="1.5"
        style={{
          strokeLinejoin: 'round',
        }}
      />
      {/* Cover the triangle top stroke */}
      <rect
        x={x - 9}
        y={y - 16}
        width={18}
        height={5}
        fill="#1a1a2e"
      />
      {/* Tooltip text */}
      <text
        x={x}
        y={y - 28}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize="11"
        fontFamily="Space Mono"
        fontWeight="bold"
        letterSpacing="0.5"
      >
        {message}
      </text>
    </g>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(145deg, #08080c 0%, #12121a 50%, #08080c 100%)',
      fontFamily: '"Space Mono", monospace',
      color: '#fff',
      position: 'relative',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <header style={{
        padding: isMobile ? '24px 16px' : '32px 48px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'flex-start' : 'space-between',
        alignItems: isMobile ? 'center' : 'flex-start',
        gap: isMobile ? '16px' : '0',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
          <h1 style={{
            fontSize: isVerySmallMobile ? '22px' : isMobile ? '24px' : '28px',
            fontWeight: 700,
            letterSpacing: '1px',
            color: '#fff',
            margin: 0,
          }}>
            Your Name
          </h1>
          <p style={{
            fontSize: isVerySmallMobile ? '10px' : '12px',
            color: '#666',
            margin: '8px 0 0 0',
            letterSpacing: '1px',
          }}>
            Your Role / Tagline
          </p>
          <div style={{
            fontSize: '11px',
            color: '#555',
            marginTop: '12px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '6px' : '16px',
            alignItems: isMobile ? 'center' : 'flex-start',
            flexWrap: 'wrap',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              your@email.com
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +1 (123) 456-7890
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              City, Country
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @yourhandle
            </span>
          </div>
        </div>
        <div style={{ textAlign: isMobile ? 'center' : 'right' }}>
          <div style={{ fontSize: '12px', color: '#444', letterSpacing: '2px' }}>
            APPLYING TO
          </div>
          <div style={{ fontSize: '14px', color: '#00D4FF', letterSpacing: '2px', marginTop: '4px' }}>
            COMPANY NAME
          </div>
        </div>
      </header>

      {/* Main content - Canvas Section */}
      <div style={{
        padding: isMobile ? '0 12px 32px' : '0 24px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Mobile-friendly instruction */}
        <div style={{
          fontSize: '11px',
          color: '#555',
          letterSpacing: '1px',
          marginBottom: isMobile ? '12px' : '16px',
          textAlign: 'center',
          padding: isMobile ? '0 16px' : '0',
        }}>
          {isMobile ? 'Tap bubbles to explore!' : 'Click bubbles to explore!'}
        </div>

        {/* Legend and Instructions - Above Canvas */}
        <div style={{
          width: '100%',
          maxWidth: '800px',
          marginBottom: isMobile ? '16px' : '24px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isMobile ? '16px' : '48px',
          flexWrap: 'wrap',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '20px' : '32px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div style={{
                width: isMobile ? '20px' : '24px',
                height: isMobile ? '20px' : '24px',
                borderRadius: '50%',
                border: '2px solid #555',
                background: 'rgba(255,255,255,0.03)',
              }} />
              <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#666', letterSpacing: '1px' }}>
                EXPERIENCE
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div style={{
                width: isMobile ? '14px' : '16px',
                height: isMobile ? '14px' : '16px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00D4FF 0%, #A855F7 100%)',
                opacity: 0.7,
              }} />
              <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#666', letterSpacing: '1px' }}>
                SKILL
              </span>
            </div>
          </div>
          <div style={{
            fontSize: isMobile ? '12px' : '13px',
            color: '#555',
            textAlign: 'center',
            padding: isMobile ? '0 16px' : '0',
          }}>
            <span style={{ color: '#aaa' }}>Skills are transferrable.</span>
            {' '}{isMobile ? 'Tap' : 'Click'} a <span style={{ color: '#fff' }}>job</span> or <span style={{ color: '#00D4FF' }}>skill</span> to explore.
          </div>
        </div>

        {/* Canvas */}
        <div style={{
          width: '100%',
          maxWidth: isMobile ? '100%' : '1000px',
          padding: isMobile ? '20px 4px' : '20px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'visible',
        }}>
          <svg
            viewBox={`0 -${canvasTopPadding} ${canvasWidth} ${canvasHeight}`}
            style={{
              width: '100%',
              maxWidth: `${canvasWidth}px`,
              height: 'auto',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.8s ease',
              overflow: 'visible',
            }}
            onClick={(e) => {
              // Click outside to deselect - only if clicking the SVG background
              if (e.target.tagName === 'svg') {
                setSelectedJob(null);
                setSelectedSkill(null);
              }
            }}
          >
            {/* Background rect for click detection */}
            <rect
              x="0"
              y={-canvasTopPadding}
              width={canvasWidth}
              height={canvasHeight}
              fill="transparent"
              onClick={() => {
                setSelectedJob(null);
                setSelectedSkill(null);
              }}
            />
            {/* Connection lines */}
            {SKILLS.map(skill => {
              const skillPos = getSkillPosition(skill);
              if (!skillPos) return null;

              const connectedJobs = getConnectionsForSkill(skill);

              return connectedJobs.map(job => {
                const jobPos = getJobPosition(job);

                // Determine if this specific connection should be highlighted
                const isConnectionActive =
                  (selectedJob === job.id && job.skills.includes(skill.id)) ||
                  (selectedSkill === skill.id && job.skills.includes(skill.id)) ||
                  (hoveredJob === job.id && job.skills.includes(skill.id)) ||
                  (hoveredSkill === skill.id && job.skills.includes(skill.id));

                // Determine if this connection should be dimmed
                const isDimmed =
                  (selectedJob && selectedJob !== job.id) ||
                  (selectedSkill && selectedSkill !== skill.id) ||
                  (hoveredJob && !selectedJob && hoveredJob !== job.id) ||
                  (hoveredSkill && !selectedSkill && hoveredSkill !== skill.id);

                return (
                  <line
                    key={`${job.id}-${skill.id}`}
                    x1={jobPos.x}
                    y1={jobPos.y}
                    x2={skillPos.x}
                    y2={skillPos.y}
                    stroke={skill.color}
                    strokeWidth={isConnectionActive ? 2.5 : 1}
                    strokeOpacity={isDimmed ? 0.03 : isConnectionActive ? 0.8 : 0.15}
                    style={{ transition: 'all 0.4s ease' }}
                  />
                );
              });
            })}

            {/* Skill bubbles */}
            {SKILLS.map((skill, index) => {
              const pos = getSkillPosition(skill);
              if (!pos) return null;
              
              const isSelected = selectedSkill === skill.id;
              const isHovered = hoveredSkill === skill.id;
              const isHighlighted = isSkillHighlighted(skill);
              const connectedJobCount = getConnectionsForSkill(skill).length;

              // Dimmed but hovered gets slight boost
              const dimmedOpacity = isHovered ? 0.45 : 0.2;

              return (
                <g
                  key={skill.id}
                  style={{
                    cursor: 'pointer',
                    opacity: mounted ? (isHighlighted ? 1 : dimmedOpacity) : 0,
                    transition: `opacity 0.4s ease ${0.4 + index * 0.05}s`,
                  }}
                  onClick={() => {
                    handleFirstClick();
                    if (isSelected) {
                      setSelectedSkill(null);
                    } else {
                      // If a job is selected and this skill is not related, deselect the job
                      if (selectedJob && !areRelated(selectedJob, skill.id)) {
                        setSelectedJob(null);
                      }
                      setSelectedSkill(skill.id);
                    }
                  }}
                  onMouseEnter={() => !isMobile && setHoveredSkill(skill.id)}
                  onMouseLeave={() => !isMobile && setHoveredSkill(null)}
                >
                  {(isSelected || isHovered) && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={skillRadius + 12}
                      fill={skill.color}
                      fillOpacity={0.1}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                  )}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected || isHovered ? skillRadius + 4 : skillRadius}
                    fill={skill.color}
                    fillOpacity={isSelected || isHovered ? 0.35 : 0.2}
                    stroke={skill.color}
                    strokeWidth={isSelected ? 2 : 1}
                    style={{
                      filter: isSelected || isHovered ? `drop-shadow(0 0 15px ${skill.color}66)` : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="16"
                  >
                    {skill.emoji}
                  </text>
                  {(isSelected || isHovered) && (
                    <text
                      x={pos.x}
                      y={pos.y + skillRadius + 18}
                      textAnchor="middle"
                      fill={skill.color}
                      fontSize="12"
                      fontFamily="Space Mono"
                      letterSpacing="1"
                    >
                      {skill.label.toUpperCase()}
                    </text>
                  )}
                  <circle
                    cx={pos.x + skillRadius - 4}
                    cy={pos.y - skillRadius + 4}
                    r={9}
                    fill="#12121a"
                    stroke={skill.color}
                    strokeWidth="1"
                    strokeOpacity={0.6}
                  />
                  <text
                    x={pos.x + skillRadius - 4}
                    y={pos.y - skillRadius + 5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={skill.color}
                    fontSize="12"
                    fontFamily="Space Mono"
                  >
                    {connectedJobCount}
                  </text>
                  {/* Cute tooltip on hover - desktop only */}
                  {!isMobile && isHovered && showTooltip && !selectedJob && !selectedSkill && (
                    <CuteTooltip
                      x={pos.x}
                      y={pos.y - skillRadius - 8 }
                      message={getTooltipMessage(skill.id)}
                      color={skill.color}
                    />
                  )}
                </g>
              );
            })}

            {/* Job bubbles */}
            {JOBS.map((job, index) => {
              const pos = getJobPosition(job);
              const isSelected = selectedJob === job.id;
              const isHovered = hoveredJob === job.id;
              const isHighlighted = isJobHighlighted(job);
              const primarySkill = SKILLS.find(s => s.id === job.skills[0]);

              // Dimmed but hovered gets slight boost
              const dimmedOpacity = isHovered ? 0.4 : 0.15;

              return (
                <g
                  key={job.id}
                  style={{
                    cursor: 'pointer',
                    opacity: mounted ? (isHighlighted ? 1 : dimmedOpacity) : 0,
                    transition: `opacity 0.5s ease ${index * 0.12}s`,
                  }}
                  onClick={() => {
                    handleFirstClick();
                    if (isSelected) {
                      setSelectedJob(null);
                    } else {
                      // If a skill is selected and this job doesn't have it, deselect the skill
                      if (selectedSkill && !areRelated(job.id, selectedSkill)) {
                        setSelectedSkill(null);
                      }
                      setSelectedJob(job.id);
                      setJobTab('skills');
                    }
                  }}
                  onMouseEnter={() => !isMobile && setHoveredJob(job.id)}
                  onMouseLeave={() => !isMobile && setHoveredJob(null)}
                >
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={jobRadius + 10}
                    fill="none"
                    stroke={primarySkill.color}
                    strokeWidth="1"
                    strokeOpacity={isSelected || isHovered ? 0.5 : 0}
                    strokeDasharray="6 4"
                    style={{ transition: 'all 0.3s ease' }}
                  />
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected || isHovered ? jobRadius + 5 : jobRadius}
                    fill="#0c0c10"
                    stroke={isHighlighted ? '#666' : '#2a2a3a'}
                    strokeWidth={isSelected ? 2 : 1.5}
                    style={{
                      filter: isSelected || isHovered ? `drop-shadow(0 0 40px ${primarySkill.color}33)` : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  <text
                    x={pos.x}
                    y={pos.y - 10}
                    textAnchor="middle"
                    fill={isHighlighted ? '#fff' : '#555'}
                    fontSize={isMobile ? 12 : 14}
                    fontFamily="Space Mono"
                    fontWeight="bold"
                    letterSpacing="0.5"
                    style={{ transition: 'fill 0.3s ease' }}
                  >
                    {job.title}
                  </text>
                  <text
                    x={pos.x}
                    y={pos.y + 10}
                    textAnchor="middle"
                    fill={isHighlighted ? '#777' : '#3a3a4a'}
                    fontSize={isMobile ? 10 : 12}
                    fontFamily="Space Mono"
                    letterSpacing="1"
                    style={{ transition: 'fill 0.3s ease' }}
                  >
                    {job.company.toUpperCase()}
                  </text>
                  <g>
                    {job.skills.slice(0, 5).map((skillId, i) => {
                      const skill = SKILLS.find(s => s.id === skillId);
                      const dotX = pos.x - ((Math.min(job.skills.length, 5) - 1) * 8) / 2 + i * 8;
                      return (
                        <circle
                          key={skillId}
                          cx={dotX}
                          cy={pos.y + 30}
                          r={4}
                          fill={skill.color}
                          fillOpacity={isHighlighted ? 0.9 : 0.25}
                          style={{ transition: 'all 0.3s ease' }}
                        />
                      );
                    })}
                  </g>
                  {/* Cute tooltip on hover - desktop only */}
                  {!isMobile && isHovered && showTooltip && !selectedJob && !selectedSkill && (
                    <CuteTooltip
                      x={pos.x}
                      y={pos.y - jobRadius - 16}
                      message={getTooltipMessage(job.id)}
                      color={primarySkill.color}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Story Panel - Below Canvas */}
        {(activeStory || jobStories || skillJobs) && (
          <div style={{
            width: '100%',
            maxWidth: '1100px',
            marginTop: isMobile ? '24px' : '32px',
          }}>
            {/* Single story (job + skill selected) */}
            {activeStory && (
              <div style={{
                background: 'rgba(18, 18, 26, 0.95)',
                border: `1px solid ${activeStory.skill.color}33`,
                borderRadius: '4px',
                padding: isMobile ? '20px 16px' : '32px',
                backdropFilter: 'blur(10px)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #1a1a2e',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{activeStory.skill.emoji}</span>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        color: activeStory.skill.color,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                      }}>
                        {activeStory.skill.label}
                      </div>
                      <div style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>
                        @ {activeStory.job.title}, {activeStory.job.company}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelectedJob(null); setSelectedSkill(null); }}
                    style={{
                      background: 'transparent',
                      border: '1px solid #333',
                      color: '#666',
                      padding: isMobile ? '10px 14px' : '8px 16px',
                      fontSize: '11px',
                      letterSpacing: '1px',
                      cursor: 'pointer',
                      fontFamily: 'Space Mono',
                      minHeight: isMobile ? '44px' : 'auto',
                    }}
                  >
                    RESET
                  </button>
                </div>
                <div style={{
                  fontSize: isMobile ? '13px' : '14px',
                  lineHeight: 1.9,
                  color: '#bbb',
                }}>
                  {activeStory.story}
                </div>
              </div>
            )}

            {/* Job selected only - show all skill stories for that job */}
            {jobStories && (
              <div style={{
                background: 'rgba(18, 18, 26, 0.95)',
                border: '1px solid #1a1a2e',
                borderRadius: '4px',
                padding: isMobile ? '20px 16px' : '32px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #1a1a2e',
                }}>
                  <div>
                    <div style={{ fontSize: isMobile ? '14px' : '16px', color: '#fff' }}>
                      {jobStories.job.title}
                    </div>
                    <div style={{ fontSize: isMobile ? '11px' : '12px', color: '#555', letterSpacing: '1px', marginTop: '4px' }}>
                      {jobStories.job.company.toUpperCase()}
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelectedJob(null); setSelectedSkill(null); }}
                    style={{
                      background: 'transparent',
                      border: '1px solid #333',
                      color: '#666',
                      padding: isMobile ? '10px 14px' : '8px 16px',
                      fontSize: '11px',
                      letterSpacing: '1px',
                      cursor: 'pointer',
                      fontFamily: 'Space Mono',
                      minHeight: isMobile ? '44px' : 'auto',
                    }}
                  >
                    RESET
                  </button>
                </div>

                {/* Tab bar */}
                <div style={{
                  display: 'flex',
                  gap: '0',
                  marginBottom: '24px',
                  borderBottom: '1px solid #1a1a2e',
                }}>
                  {[
                    { key: 'skills', label: 'CORE SKILLS' },
                    { key: 'process', label: 'WORK PROCESS' },
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setJobTab(tab.key)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: jobTab === tab.key ? '2px solid #00D4FF' : '2px solid transparent',
                        color: jobTab === tab.key ? '#fff' : '#555',
                        padding: isMobile ? '10px 16px' : '10px 20px',
                        fontSize: '11px',
                        letterSpacing: '1.5px',
                        cursor: 'pointer',
                        fontFamily: 'Space Mono',
                        transition: 'color 0.2s, border-color 0.2s',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Core Skills tab */}
                {jobTab === 'skills' && (
                  <div style={{ display: 'grid', gridTemplateColumns: isVerySmallMobile ? '1fr' : `repeat(auto-fit, minmax(${isSmallMobile ? '220px' : '260px'}, 1fr))`, gap: isMobile ? '16px' : '24px' }}>
                    {jobStories.skills.map(({ skill, story }) => (
                      <div key={skill.id} style={{
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '4px',
                        padding: '20px',
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '12px',
                        }}>
                          <span style={{ fontSize: '18px' }}>{skill.emoji}</span>
                          <span style={{
                            fontSize: '12px',
                            color: skill.color,
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                          }}>
                            {skill.label}
                          </span>
                        </div>
                        <div style={{
                          fontSize: '13px',
                          lineHeight: 1.8,
                          color: '#bbb',
                        }}>
                          {story}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Work Process tab */}
                {jobTab === 'process' && jobStories.job.process && (
                  isMobile ? (
                    /* Mobile: full-width stacked cards */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {jobStories.job.process.map((step) => (
                        <div key={step.step} style={{
                          background: 'rgba(0,0,0,0.2)',
                          borderRadius: '4px',
                          padding: '16px',
                          display: 'flex',
                          gap: '14px',
                          alignItems: 'flex-start',
                        }}>
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: 'rgba(0, 212, 255, 0.1)',
                            border: '1px solid #00D4FF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            color: '#00D4FF',
                            fontFamily: 'Space Mono',
                            flexShrink: 0,
                            marginTop: '1px',
                          }}>
                            {step.step}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                              fontSize: '12px',
                              color: '#fff',
                              letterSpacing: '1px',
                              textTransform: 'uppercase',
                              marginBottom: '6px',
                            }}>
                              {step.title}
                            </div>
                            <div style={{
                              fontSize: '13px',
                              lineHeight: 1.7,
                              color: '#888',
                            }}>
                              {step.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Desktop: horizontal stepper */
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                      {jobStories.job.process.map((step, i) => (
                        <div key={step.step} style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          flex: 1,
                        }}>
                          {/* Step indicator row with connectors */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                          }}>
                            {i > 0 && (
                              <div style={{ flex: 1, height: '1px', background: '#1a1a2e' }} />
                            )}
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: 'rgba(0, 212, 255, 0.1)',
                              border: '1px solid #00D4FF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              color: '#00D4FF',
                              fontFamily: 'Space Mono',
                              flexShrink: 0,
                            }}>
                              {step.step}
                            </div>
                            {i < jobStories.job.process.length - 1 && (
                              <div style={{ flex: 1, height: '1px', background: '#1a1a2e' }} />
                            )}
                          </div>
                          {/* Step content */}
                          <div style={{
                            textAlign: 'center',
                            padding: '12px 8px 0',
                          }}>
                            <div style={{
                              fontSize: '12px',
                              color: '#fff',
                              letterSpacing: '1px',
                              textTransform: 'uppercase',
                              marginBottom: '6px',
                            }}>
                              {step.title}
                            </div>
                            <div style={{
                              fontSize: '12px',
                              lineHeight: 1.7,
                              color: '#888',
                            }}>
                              {step.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            )}

            {/* Skill selected only - show all stories from all jobs for that skill */}
            {skillJobs && (
              <div style={{
                background: 'rgba(18, 18, 26, 0.95)',
                border: `1px solid ${skillJobs.skill.color}33`,
                borderRadius: '4px',
                padding: isMobile ? '20px 16px' : '32px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #1a1a2e',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '12px' }}>
                    <span style={{ fontSize: isMobile ? '20px' : '24px' }}>{skillJobs.skill.emoji}</span>
                    <div>
                      <div style={{ fontSize: isMobile ? '14px' : '16px', color: skillJobs.skill.color }}>
                        {skillJobs.skill.label}
                      </div>
                      <div style={{ fontSize: isMobile ? '11px' : '12px', color: '#555', marginTop: '4px' }}>
                        {skillJobs.jobs.length} {skillJobs.jobs.length === 1 ? 'experience' : 'experiences'} built this skill
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelectedJob(null); setSelectedSkill(null); }}
                    style={{
                      background: 'transparent',
                      border: '1px solid #333',
                      color: '#666',
                      padding: isMobile ? '10px 14px' : '8px 16px',
                      fontSize: '11px',
                      letterSpacing: '1px',
                      cursor: 'pointer',
                      fontFamily: 'Space Mono',
                      minHeight: isMobile ? '44px' : 'auto',
                    }}
                  >
                    RESET
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isVerySmallMobile ? '1fr' : `repeat(auto-fit, minmax(${isSmallMobile ? '220px' : '260px'}, 1fr))`, gap: isMobile ? '16px' : '24px' }}>
                  {skillJobs.jobs.map(({ job, story }) => (
                    <div key={job.id} style={{
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '4px',
                      padding: '20px',
                    }}>
                      <div style={{
                        fontSize: '13px',
                        color: '#fff',
                        marginBottom: '4px',
                      }}>
                        {job.title}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#555',
                        letterSpacing: '1px',
                        marginBottom: '12px',
                      }}>
                        {job.company.toUpperCase()}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        lineHeight: 1.8,
                        color: '#bbb',
                      }}>
                        {story}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Why This Company Section */}
      <section style={{
        padding: isMobile ? '48px 16px 40px' : '80px 48px 60px',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
          gap: isMobile ? '20px' : '60px',
          alignItems: 'start',
        }}>
          <div style={{
            fontSize: '12px',
            color: '#444',
            letterSpacing: '3px',
            paddingTop: isMobile ? '0' : '6px',
            textAlign: isMobile ? 'center' : 'left',
          }}>
            WHY THIS COMPANY
          </div>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            lineHeight: isMobile ? 1.8 : 2,
            color: '#999',
            margin: 0,
            textAlign: isMobile ? 'center' : 'left',
          }}>
            Write your personal motivation here. Why are you excited about this company? What draws you to their mission? How does your experience align with what they're building? Make it personal and authentic.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section style={{
        padding: isMobile ? '40px 16px' : '60px 48px',
      }}>
        <div style={{
          fontSize: '12px',
          color: '#444',
          letterSpacing: '3px',
          marginBottom: isMobile ? '24px' : '32px',
          textAlign: 'center',
        }}>
          TESTIMONIALS
        </div>
        <div style={{
          display: 'flex',
          gap: '24px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {/* Add your testimonial screenshots here */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: isMobile ? '100%' : '280px',
                maxWidth: '280px',
                height: '160px',
                background: 'rgba(18, 18, 26, 0.6)',
                border: '1px solid #1a1a2e',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#444',
                fontSize: '11px',
                letterSpacing: '1px',
                textAlign: 'center',
                padding: '16px',
              }}
            >
              Add testimonial screenshot or quote here
            </div>
          ))}
        </div>
      </section>

      {/* References Section */}
      <section style={{
        padding: isMobile ? '32px 16px 48px' : '40px 48px 60px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        <div style={{
          fontSize: '12px',
          color: '#444',
          letterSpacing: '3px',
          marginBottom: isMobile ? '24px' : '28px',
          textAlign: 'center',
        }}>
          REFERENCES
        </div>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          gap: isMobile ? '32px' : '40px',
          flexWrap: 'wrap',
          alignItems: isMobile ? 'center' : 'flex-start',
        }}>
          <div style={{ textAlign: 'center', flex: isMobile ? 'none' : '1', width: isMobile ? '100%' : 'auto', minWidth: '200px', maxWidth: '280px' }}>
            <div style={{ fontSize: '14px', color: '#fff', marginBottom: '6px' }}>
              Reference Name 1
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
              Title at Company
            </div>
            <a
              href="mailto:reference1@email.com"
              style={{ fontSize: '12px', color: '#00D4FF', textDecoration: 'none' }}
            >
              reference1@email.com
            </a>
          </div>
          <div style={{ textAlign: 'center', flex: isMobile ? 'none' : '1', width: isMobile ? '100%' : 'auto', minWidth: '200px', maxWidth: '280px' }}>
            <div style={{ fontSize: '14px', color: '#fff', marginBottom: '6px' }}>
              Reference Name 2
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
              Title at Company
            </div>
            <a
              href="mailto:reference2@email.com"
              style={{ fontSize: '12px', color: '#00D4FF', textDecoration: 'none' }}
            >
              reference2@email.com
            </a>
          </div>
          <div style={{ textAlign: 'center', flex: isMobile ? 'none' : '1', width: isMobile ? '100%' : 'auto', minWidth: '200px', maxWidth: '280px' }}>
            <div style={{ fontSize: '14px', color: '#fff', marginBottom: '6px' }}>
              Reference Name 3
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
              Title at Company
            </div>
            <a
              href="mailto:reference3@email.com"
              style={{ fontSize: '12px', color: '#00D4FF', textDecoration: 'none' }}
            >
              reference3@email.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: isMobile ? '32px 16px' : '40px 48px',
        borderTop: '1px solid #1a1a2e',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: 'center',
        gap: isMobile ? '24px' : '0',
      }}>
        <div style={{
          fontSize: '12px',
          color: '#444',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: isMobile ? '16px' : '24px',
        }}>
          <a href="mailto:your@email.com" style={{ color: '#666', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            your@email.com
          </a>
          <a href="tel:+11234567890" style={{ color: '#666', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            +1 (123) 456-7890
          </a>
          <span style={{ color: '#666', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            City, Country
          </span>
          <a href="https://x.com/yourhandle" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            @yourhandle
          </a>
        </div>
        <a
          href="mailto:your@email.com"
          style={{
            display: 'inline-block',
            padding: isMobile ? '12px 24px' : '14px 32px',
            background: 'transparent',
            border: '1px solid #00D4FF',
            color: '#00D4FF',
            fontSize: '12px',
            letterSpacing: '2px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            width: isMobile ? '100%' : 'auto',
            maxWidth: isMobile ? '280px' : 'none',
            textAlign: 'center',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.target.style.background = '#00D4FF';
              e.target.style.color = '#08080c';
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.target.style.background = 'transparent';
              e.target.style.color = '#00D4FF';
            }
          }}
        >
          LET'S CHAT!
        </a>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

        @keyframes tooltipPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* Mobile optimizations */
        svg {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }

        html {
          -webkit-overflow-scrolling: touch;
        }

        /* Ensure touch targets are adequate */
        @media (max-width: 767px) {
          button {
            min-height: 44px;
          }
          a {
            min-height: 44px;
            display: inline-flex;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
