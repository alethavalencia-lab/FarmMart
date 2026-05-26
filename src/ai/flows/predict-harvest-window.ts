'use server';
/**
 * @fileOverview A generative AI tool that uses historical crop data and weather patterns to advise farmers on the best harvest windows and yield optimization.
 *
 * - predictHarvestWindow - A function that handles the harvest window prediction process.
 * - PredictHarvestWindowInput - The input type for the predictHarvestWindow function.
 * - PredictHarvestWindowOutput - The return type for the predictHarvestWindow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictHarvestWindowInputSchema = z.object({
  cropType: z.string().describe('The type of crop being grown (e.g., corn, wheat, tomatoes).'),
  plantingDate: z.string().describe('The date when the crop was planted, in YYYY-MM-DD format.').regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format, expected YYYY-MM-DD'),
  historicalYieldData: z.string().describe('A summary or detailed description of historical yield data for this crop in this region, including past harvest dates and yields.'),
  currentWeatherTrends: z.string().describe('A summary or detailed description of current and forecasted weather patterns relevant to the crop (e.g., temperature, rainfall, humidity, sunlight).'),
  soilType: z.string().optional().describe('The type of soil (e.g., loamy, sandy, clay) in the farming area.'),
  irrigationMethod: z.string().optional().describe('The method of irrigation used (e.g., drip, rainfed, sprinkler).'),
});
export type PredictHarvestWindowInput = z.infer<typeof PredictHarvestWindowInputSchema>;

const PredictHarvestWindowOutputSchema = z.object({
  optimalHarvestWindow: z.object({
    startDate: z.string().describe('The recommended start date for harvesting, in YYYY-MM-DD format.').regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format, expected YYYY-MM-DD'),
    endDate: z.string().describe('The recommended end date for harvesting, in YYYY-MM-DD format.').regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format, expected YYYY-MM-DD'),
    reasoning: z.string().describe('A detailed explanation for the recommended harvest window, considering all provided data.'),
  }),
  yieldOptimizationAdvice: z.string().describe('Specific, actionable advice for optimizing crop yield, considering factors like nutrient management, pest control, and further irrigation.'),
  potentialYieldIncrease: z.string().optional().describe('An estimated percentage or range of potential yield increase if the advice is followed (e.g., "5-10%", "up to 15%").'),
});
export type PredictHarvestWindowOutput = z.infer<typeof PredictHarvestWindowOutputSchema>;

export async function predictHarvestWindow(input: PredictHarvestWindowInput): Promise<PredictHarvestWindowOutput> {
  return predictHarvestWindowFlow(input);
}

const predictHarvestWindowPrompt = ai.definePrompt({
  name: 'predictHarvestWindowPrompt',
  input: {schema: PredictHarvestWindowInputSchema},
  output: {schema: PredictHarvestWindowOutputSchema},
  prompt: `You are an expert agricultural AI assistant specialized in predicting optimal harvest windows and providing yield optimization advice.

Using the provided information about the crop, historical data, and current weather, generate a precise optimal harvest window and detailed yield optimization advice.

Crop Type: {{{cropType}}}
Planting Date: {{{plantingDate}}}
Historical Yield Data: {{{historicalYieldData}}}
Current and Forecasted Weather Trends: {{{currentWeatherTrends}}}
{{#if soilType}}Soil Type: {{{soilType}}}{{/if}}
{{#if irrigationMethod}}Irrigation Method: {{{irrigationMethod}}}{{/if}}

Provide your analysis and recommendations in a structured JSON format.`,
});

const predictHarvestWindowFlow = ai.defineFlow(
  {
    name: 'predictHarvestWindowFlow',
    inputSchema: PredictHarvestWindowInputSchema,
    outputSchema: PredictHarvestWindowOutputSchema,
  },
  async input => {
    const {output} = await predictHarvestWindowPrompt(input);
    return output!;
  }
);
