import { GoogleGenAI } from '@google/genai';

export const generateAIResponse = async (req, res) => {
  const { prompt, contextText, command } = req.body;
  
  if (!process.env.AI_API_KEY) {
    return res.status(400).json({ 
      message: 'AI API Key missing. Please configure your key in the .env file to activate the AI writing assistant.' 
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });
    let systemInstruction = "You are a helpful writing assistant.";
    
    if (command === 'summarize') systemInstruction = "Summarize the following text concisely.";
    if (command === 'improve_writing') systemInstruction = "Improve the writing, grammar, and professional tone of the following text.";
    if (command === 'continue_writing') systemInstruction = "Continue writing the following text naturally.";

    const fullPrompt = `${systemInstruction}\n\nContext:\n${contextText}\n\nTask: ${prompt || ''}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    
    res.json({ result: response.text });
  } catch (error) {
    res.status(500).json({ message: 'AI generation failed: ' + error.message });
  }
};
