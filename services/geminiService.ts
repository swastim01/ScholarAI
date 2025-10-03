import { GoogleGenAI } from '@google/genai';
import { ANALYSIS_MODEL_NAME, SYSTEM_PROMPT, ANALYSIS_RESPONSE_SCHEMA } from '../constants';
import type { AnalysisResult } from '../types';

// The coding guidelines guarantee that process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const analyzeTopic = async (topic: string, isEli5: boolean): Promise<AnalysisResult> => {
  try {
    let userPrompt = topic;
    if (isEli5) {
      userPrompt = `Please analyze the following, and make sure to use the "Explain Like I'm 5" mode for all explanations: "${topic}"`;
    }

    const response = await ai.models.generateContent({
      model: ANALYSIS_MODEL_NAME,
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: ANALYSIS_RESPONSE_SCHEMA,
      },
    });

    const jsonText = response.text.trim();
    
    if (!jsonText.startsWith('{') || !jsonText.endsWith('}')) {
        console.error("Received non-JSON response:", jsonText);
        throw new Error('Failed to get a valid JSON response from the model. Please try again.');
    }

    const result: AnalysisResult = JSON.parse(jsonText);
    return result;

  } catch (error) {
    console.error("Error analyzing topic with Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes('SAFETY')) {
             throw new Error('The request was blocked due to safety concerns. Please modify your query.');
        }
        throw new Error(`An error occurred during analysis: ${error.message}`);
    }
    throw new Error('An unknown error occurred during analysis.');
  }
};