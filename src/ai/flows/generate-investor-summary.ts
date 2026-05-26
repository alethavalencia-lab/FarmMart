'use server';
/**
 * @fileOverview A Genkit flow that generates an AI-powered summary and insights for an investor's portfolio.
 *
 * - generateInvestorSummary - A function that handles the generation of investor portfolio summaries.
 * - InvestorPortfolioInput - The input type for the generateInvestorSummary function.
 * - InvestorPortfolioOutput - The return type for the generateInvestorSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const InvestmentSchema = z.object({
  name: z.string().describe('The name of the individual investment project.'),
  amountInvested: z.number().describe('The initial amount invested in this project.'),
  currentValue: z.number().optional().describe('The current estimated value of this investment, if available.'),
  roiPercentage: z.number().describe('The Return on Investment (ROI) percentage for this specific investment.'),
  fundingProgressPercentage: z.number().describe('The percentage of funding achieved for this project.'),
  sustainabilityMetrics: z.string().describe('A detailed summary or list of sustainability metrics and achievements for this investment.'),
});

const InvestorPortfolioInputSchema = z.object({
  portfolioName: z.string().describe('The name of the investment portfolio.'),
  investments: z.array(InvestmentSchema).describe('A list of individual investment projects within the portfolio.'),
  overallPortfolioRoiPercentage: z.number().describe('The overall Return on Investment (ROI) percentage for the entire portfolio.'),
  overallPortfolioFundingProgressPercentage: z.number().describe('The overall funding progress percentage across all projects in the portfolio.'),
  overallSustainabilityImpactSummary: z.string().describe('A comprehensive summary of the sustainability impact of the entire portfolio.'),
});
export type InvestorPortfolioInput = z.infer<typeof InvestorPortfolioInputSchema>;

const InvestorPortfolioOutputSchema = z.object({
  summary: z.string().describe('A concise overall summary of the investment portfolio performance.'),
  roiInsights: z.string().describe('Detailed insights and analysis regarding the portfolio\'s Return on Investment.'),
  fundingInsights: z.string().describe('Analysis and outlook on the funding progress of the portfolio projects.'),
  sustainabilityInsights: z.string().describe('Insights into the sustainability impact of the portfolio, highlighting achievements and areas for improvement.'),
  keyRecommendations: z.array(z.string()).describe('Actionable recommendations for the investor based on the portfolio analysis.'),
});
export type InvestorPortfolioOutput = z.infer<typeof InvestorPortfolioOutputSchema>;

export async function generateInvestorSummary(input: InvestorPortfolioInput): Promise<InvestorPortfolioOutput> {
  return investorPortfolioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'investorPortfolioPrompt',
  input: { schema: InvestorPortfolioInputSchema },
  output: { schema: InvestorPortfolioOutputSchema },
  prompt: `You are an expert financial analyst specializing in agritech investments. Your task is to provide a comprehensive summary and actionable insights for an investor's portfolio.

Analyze the provided investment data carefully. Focus on ROI, funding progress, and sustainability impact.

---
Portfolio Name: {{{portfolioName}}}

Overall Portfolio ROI: {{{overallPortfolioRoiPercentage}}}%
Overall Portfolio Funding Progress: {{{overallPortfolioFundingProgressPercentage}}}%
Overall Sustainability Impact: {{{overallSustainabilityImpactSummary}}}

Individual Investments:
{{#each investments}}
- Project: {{{name}}}
  - Amount Invested: {{{amountInvested}}}
  - Current Value (if available): {{{currentValue}}}
  - ROI: {{{roiPercentage}}}%
  - Funding Progress: {{{fundingProgressPercentage}}}%
  - Sustainability Metrics: {{{sustainabilityMetrics}}}
{{/each}}
---

Based on the above data, generate a structured summary and insights for the investor, adhering to the output schema. Ensure your analysis is clear, concise, and provides value to an investor looking to understand their performance and make informed decisions.`,
});

const investorPortfolioFlow = ai.defineFlow(
  {
    name: 'investorPortfolioFlow',
    inputSchema: InvestorPortfolioInputSchema,
    outputSchema: InvestorPortfolioOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
