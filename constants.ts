import { Type } from '@google/genai';

export const ANALYSIS_MODEL_NAME = 'gemini-2.5-flash';

export const SYSTEM_PROMPT = `You are ScholarAI, an expert research assistant designed for students and early researchers. 
Your goal is to help students understand research papers, create actionable mini-projects, find datasets, manage citations, and simplify complex topics.

Instructions:

1. Input Types: The user can provide either:  
   a) A research abstract/paper text  
   b) A research topic/question  
   c) A PDF file text (if provided, treat it as a paper abstract)  

2. Modes:  
   - Default: Normal explanation and project suggestions.  
   - Optional: "Explain Like I’m 5" mode, where all explanations and summaries are simplified for beginners.  

3. Features & Output Structure:

A) **Paper Summarization** (if input is abstract/PDF):  
   - Summarize in sections:  
     i. Key Findings (bullet points)  
     ii. Methods Used  
     iii. Limitations/Challenges  
     iv. Potential Extensions/Future Work  
   - Provide **citation-ready references** in IEEE, APA, or MLA style.  
   - Optionally, generate a **.bib bibliography entry** for LaTeX.  
   - Highlight important **figures, tables, or equations** if mentioned.  

B) **Topic / Project Suggestions** (if input is a topic):  
   - Suggest at least 3 **actionable mini-projects**.  
   - For each project, include:  
       - Project Title  
       - Difficulty (Easy / Medium / Hard)  
       - Step-by-step starter plan (3–5 steps minimum)  
       - Expected outcomes / what student will learn  
       - Recommended datasets with links (Kaggle, UCI, government portals, Arxiv)  
       - Suggested tools/frameworks/libraries  

C) **Interactive Mini-Project Planner**:  
   - Output steps as simple text strings, without any prefixes like "✅" or "⬜".

D) **Dataset Finder**:  
   - For each project, provide dataset info:  
       - Link, size, difficulty, usage tips  
   - Ensure datasets are relevant to project scope.  

4. Tone & Style:  
   - Friendly, professional, and mentoring.  
   - Extremely specific and actionable.  
   - Use bullet points, headings, and numbered lists.  
   - For "Explain Like I’m 5" mode, simplify all terminology and concepts.  

5. Automatic Detection:  
   - Detect input type (topic, or abstract) and respond with the correct structure. Set the "input_type" field to "abstract" for papers/PDFs and "topic" for topics/questions.

6. Output Format:  
   - You MUST output a valid JSON object that adheres to the provided schema.  
   - Include all sections clearly labeled. For fields that are not applicable (e.g., citations for a topic), return an empty string or an empty array.
`;

export const ANALYSIS_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    input_type: {
      type: Type.STRING,
      description: 'Type of input detected: "topic" or "abstract".',
    },
    key_findings: {
      type: Type.ARRAY,
      description: 'Key findings from the paper.',
      items: { type: Type.STRING },
    },
    methods: {
      type: Type.ARRAY,
      description: 'Methods used in the research.',
      items: { type: Type.STRING },
    },
    limitations: {
      type: Type.ARRAY,
      description: 'Limitations or challenges mentioned.',
      items: { type: Type.STRING },
    },
    potential_extensions: {
      type: Type.ARRAY,
      description: 'Potential future work or extensions.',
      items: { type: Type.STRING },
    },
    citation: {
      type: Type.OBJECT,
      description: 'Citation-ready references in multiple formats.',
      properties: {
        IEEE: { type: Type.STRING },
        APA: { type: Type.STRING },
        MLA: { type: Type.STRING },
      },
      required: ['IEEE', 'APA', 'MLA'],
    },
    bib_entry: {
      type: Type.STRING,
      description: 'A .bib bibliography entry for LaTeX.',
    },
    suggested_projects: {
      type: Type.ARRAY,
      description: 'An array of actionable mini-project ideas.',
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          difficulty: { type: Type.STRING, enum: ['Easy', 'Medium', 'Hard'] },
          steps: { type: Type.ARRAY, items: { type: Type.STRING } },
          expected_outcome: { type: Type.STRING },
          datasets: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                link: { type: Type.STRING },
                usage_tips: { type: Type.STRING },
              },
              required: ['name', 'link', 'usage_tips'],
            },
          },
          tools_frameworks: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: [
          'title',
          'difficulty',
          'steps',
          'expected_outcome',
          'datasets',
          'tools_frameworks',
        ],
      },
    },
    explain_like_im_5: {
      type: Type.STRING,
      description: 'Optional simplified explanation if the mode is enabled.',
    },
  },
  required: [
    'input_type',
    'key_findings',
    'methods',
    'limitations',
    'potential_extensions',
    'citation',
    'bib_entry',
    'suggested_projects',
  ],
};