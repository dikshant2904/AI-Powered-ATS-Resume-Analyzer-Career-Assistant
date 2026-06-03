const buildATSScorePrompt = (resumeText, jobDescription) => {
  return `
    You are an expert ATS (Applicant Tracking System) and Senior Technical Recruiter.
    Perform a deep, granular analysis of this resume against the job description.
    
    Resume:
    ${resumeText}
    
    Job Description:
    ${jobDescription}
    
    Return a strict JSON object with this exact structure:
    {
      "overallScore": <number 0-100>,
      "categoryScores": {
        "skillsMatch": <number 0-100>,
        "experienceMatch": <number 0-100>,
        "leadershipMatch": <number 0-100>
      },
      "readinessIndicator": "High Risk | Needs Improvement | Ready | Exceptional Fit",
      "missingKeywords": [
        { "keyword": "Specific tool/skill missing", "severity": "High | Medium | Low" }
      ],
      "strengths": ["Clear strength 1", "Clear strength 2"],
      "actionableFeedback": [
        "Specifically what they need to rewrite or add to pass the screen"
      ]
    }
  `;
};

const buildCoverLetterPrompt = (resumeText, jobDescription, companyName, role, tone, length) => {
  return `
    You are an expert career consultant and copywriter.
    Write a highly professional cover letter for the following role:
    Company: ${companyName}
    Role: ${role}
    Tone: ${tone || 'Professional'}
    Length: ${length || 'Medium'} (Short = ~150 words, Medium = ~250 words, Long = ~400 words)
    
    Candidate's Background (from Resume):
    ${resumeText}
    
    Job Description details (to align the letter):
    ${jobDescription}
    
    Output strictly the body of the cover letter. Do not include placeholder headers like [Your Name] or [Date] at the top, just start with the greeting (e.g. "Dear Hiring Manager,").
  `;
};

const buildProposalPrompt = (clientRequirements, userSkills, experienceLevel, tone) => {
  return `
    You are an expert freelance copywriter. Write a winning Upwork/Fiverr proposal.
    
    Client's Project Requirements:
    ${clientRequirements}
    
    My Skills:
    ${userSkills}
    
    My Experience Level:
    ${experienceLevel}
    
    Tone:
    ${tone || 'Confident'}
    
    Output strictly the body of the proposal. Make it highly engaging, focus on solving the client's problem, and include a clear call to action at the end.
  `;
};

const buildResumeIntelligencePrompt = (resumeText) => {
  return `
    You are an expert Executive Recruiter and Resume Consultant.
    Analyze the following raw resume text and extract intelligence into a strict JSON structure.
    
    Raw Resume Text:
    ${resumeText}
    
    Return ONLY a JSON object strictly following this structure:
    {
      "name": "Candidate's full name (if found)",
      "role": "Detected primary career role (e.g., Frontend Engineer)",
      "skills": ["skill 1", "skill 2", ...],
      "technologies": ["tech 1", "tech 2", ...],
      "experienceLevel": "Entry | Mid | Senior | Lead",
      "healthScore": <number between 0-100 evaluating impact, formatting, and action verbs>,
      "weakBullets": [
        {
          "original": "The exact weak bullet point from the resume that lacks metrics or impact",
          "suggestion": "A highly optimized, quantified rewrite of that bullet point",
          "reason": "Why the original was weak and why the suggestion is better"
        }
      ]
    }
  `;
};

module.exports = {
  buildATSScorePrompt,
  buildCoverLetterPrompt,
  buildProposalPrompt,
  buildResumeIntelligencePrompt,
};
