const axios = require('axios');

class AIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
  }

  async getChatResponse(userMessage, conversationHistory = []) {
    try {
      const messages = [
        {
          role: 'system',
          content: `You are an AI educational assistant for the South Sudan Personalized Learning Platform (SSPLP). You help students with:
          - Academic questions across all subjects in the South Sudan National Curriculum
          - Study tips and learning strategies
          - Homework assistance and explanations
          - Exam preparation guidance
          - Educational goal setting
          
          Be encouraging, patient, and supportive. Explain concepts clearly and provide examples. If asked about non-educational topics, gently redirect to learning-related discussions. Always promote the value of education and learning.`
        },
        ...conversationHistory,
        { role: 'user', content: userMessage }
      ];

      const response = await axios.post(
        this.apiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 500,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        response: response.data.choices[0].message.content,
        isEducational: this.isEducationalQuery(userMessage),
        timestamp: new Date()
      };
    } catch (error) {
      console.error('AI Service error:', error.message);
      return {
        response: "I'm experiencing technical difficulties. Please try asking your question again, or contact your teacher for assistance with your studies.",
        isEducational: false,
        timestamp: new Date()
      };
    }
  }

  isEducationalQuery(message) {
    const educationalKeywords = [
      'math', 'mathematics', 'algebra', 'geometry', 'calculus',
      'english', 'grammar', 'writing', 'essay', 'literature',
      'science', 'biology', 'chemistry', 'physics',
      'history', 'geography', 'social studies',
      'homework', 'assignment', 'study', 'exam', 'test',
      'learn', 'understand', 'explain', 'help me with'
    ];
    const lowerMessage = message.toLowerCase();
    return educationalKeywords.some(keyword => lowerMessage.includes(keyword));
  }
}

module.exports = new AIService();