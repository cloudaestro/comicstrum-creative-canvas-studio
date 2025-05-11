
import * as fal from '@fal-ai/serverless-client';

// Initialize the Fal AI client
fal.config({
  // These would typically come from environment variables
  credentials: {
    // Using the correct property names based on the actual @fal-ai/serverless-client types
    key: 'your-fal-key',  // This should be replaced with user input in production
    secret: 'your-fal-secret', // This should be replaced with user input in production
  },
});

export interface ComicPanelGenerationParams {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  numInferenceSteps?: number;
}

export interface ComicPanelResult {
  imageUrl: string;
  seed: number;
}

// Define the expected response structure from Fal AI
interface FalAIResponse {
  images: { url: string }[];
  seed: number;
}

export const generateComicPanel = async (
  params: ComicPanelGenerationParams
): Promise<ComicPanelResult> => {
  try {
    // Type the response properly
    const response = await fal.run('fal-ai/fast-sdxl', {
      input: {
        prompt: params.prompt,
        negative_prompt: params.negativePrompt || 'low quality, blurry, distorted',
        width: params.width || 768,
        height: params.height || 768,
        num_inference_steps: params.numInferenceSteps || 25,
      },
    }) as FalAIResponse; // Cast the response to our interface

    return {
      imageUrl: response.images[0].url,
      seed: response.seed,
    };
  } catch (error) {
    console.error('Failed to generate comic panel:', error);
    throw new Error('Failed to generate comic panel. Please try again.');
  }
};
