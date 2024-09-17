interface TranscriberConfig {
  provider: string;
  keywords: string[];
}

interface ModelConfig {
  provider: string;
  model: string;
  messages: {
    role: string;
    content: string;
  }[];
}

interface VoiceConfig {
  provider: string;
  voiceId: string;
}

export interface AssistantConfig {
  transcriber: TranscriberConfig;
  model: ModelConfig;
  voice: VoiceConfig;
  firstMessage: string;
  endCallMessage: string;
  endCallFunctionEnabled: boolean;
}

export interface AssistantResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  transcriber: TranscriberConfig;
  model: ModelConfig;
  voice: VoiceConfig;
  firstMessage: string;
  endCallMessage: string;
  endCallFunctionEnabled: boolean;
  [key: string]: any; // Other fields that might be returned
}
