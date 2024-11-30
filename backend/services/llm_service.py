import os
from typing import Dict, Any
import openai
from dotenv import load_dotenv

load_dotenv()

class LLMService:
    def __init__(self):
        openai.api_key = os.getenv("OPENAI_API_KEY")
        self.model = "gpt-4"

    async def analyze_investment(self, data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            prompt = self._create_analysis_prompt(data)
            
            response = await openai.ChatCompletion.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are an expert investment analyst."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=2000
            )

            analysis = response.choices[0].message.content
            
            return {
                "analysis": analysis,
                "confidence": 0.85,  # Example confidence score
                "recommendations": self._extract_recommendations(analysis)
            }
        except Exception as e:
            raise Exception(f"LLM analysis failed: {str(e)}")

    async def validate_input(self, input_text: str) -> Dict[str, Any]:
        try:
            response = await openai.ChatCompletion.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "Validate if the investment description is clear and complete."},
                    {"role": "user", "content": input_text}
                ],
                temperature=0.3,
                max_tokens=500
            )

            validation_text = response.choices[0].message.content
            is_valid = "invalid" not in validation_text.lower()

            return {
                "isValid": is_valid,
                "feedback": validation_text
            }
        except Exception as e:
            raise Exception(f"Input validation failed: {str(e)}")

    def _create_analysis_prompt(self, data: Dict[str, Any]) -> str:
        return f"""
        Please analyze this investment opportunity:

        Investment Description:
        {data['description']}

        Product Description:
        {data['product_description']}

        Market Area:
        {data['market_area']}

        Financial Information:
        - Investment Amount: ${data['investment_amount']}
        - Discount Rate: {data['discount_rate']}%

        Balance Sheet Data:
        {data['balance_sheet']}

        Competitor Analysis:
        {data['competitor_data']}

        Additional Market Data:
        {data['market_data']}

        Please provide:
        1. Comprehensive market analysis
        2. Financial viability assessment
        3. Risk analysis
        4. Investment recommendations
        5. Expected ROI
        """

    def _extract_recommendations(self, analysis: str) -> list[str]:
        # Simple implementation - in practice, you'd want more sophisticated parsing
        recommendations = []
        for line in analysis.split('\n'):
            if line.strip().startswith('-') or line.strip().startswith('*'):
                recommendations.append(line.strip()[1:].strip())
        return recommendations