interface SummaryRequest {
  question: string;
  answer: string;
  perspective: 'patient' | 'clinician';
  maxLength?: number;
  temperature?: number;
}

interface SummaryResponse {
  summary: string;
  confidence: number;
  processing_time: number;
  safety_score: number;
  perspective: string;
}

class LLMClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:8000') {
    this.baseUrl = baseUrl;
  }

  async generateSummary(request: SummaryRequest): Promise<SummaryResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: request.question,
          answer: request.answer,
          perspective: request.perspective,
          max_tokens: request.maxLength || 1000,
          temperature: request.temperature || 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform the response to match the expected interface
      return {
        summary: data.summary,
        confidence: data.confidence,
        processing_time: data.processing_time,
        safety_score: data.safety_score,
        perspective: data.perspective,
      };
    } catch (error) {
      console.error('Error calling LLM API:', error);
      throw new Error(`Failed to generate summary: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async validateContent(content: string): Promise<{ is_valid: boolean; issues: string[] }> {
    try {
      const response = await fetch(`${this.baseUrl}/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error validating content:', error);
      throw new Error(`Failed to validate content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getStatus(): Promise<{ status: string; accuracy: number; load: number; model_name: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/status`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting status:', error);
      throw new Error(`Failed to get status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async healthCheck(): Promise<{ message: string; model_loaded: boolean }> {
    try {
      const response = await fetch(`${this.baseUrl}/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error checking health:', error);
      throw new Error(`Failed to check health: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Create and export a default instance
export const llmClient = new LLMClient();

// Also export the class for custom instances
export { LLMClient };
export type { SummaryRequest, SummaryResponse };
