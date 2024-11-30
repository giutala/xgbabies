from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel
import uvicorn

from services.llm_service import LLMService
from services.file_processor import FileProcessor
from services.report_generator import ReportGenerator

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm_service = LLMService()
file_processor = FileProcessor()
report_generator = ReportGenerator()

@app.post("/analyze")
async def analyze_investment(
    description: str = Form(...),
    competitor_data: UploadFile = Form(...),
    balance_sheet: UploadFile = Form(...),
    discount_rate: float = Form(...),
    investment_amount: float = Form(...),
    market_data: Optional[UploadFile] = Form(None),
    product_description: str = Form(...),
    market_area: str = Form(...)
):
    try:
        # Process uploaded files
        competitor_text = await file_processor.process_file(competitor_data)
        balance_sheet_text = await file_processor.process_file(balance_sheet)
        market_data_text = await file_processor.process_file(market_data) if market_data else ""

        # Prepare data for LLM analysis
        analysis_data = {
            "description": description,
            "competitor_data": competitor_text,
            "balance_sheet": balance_sheet_text,
            "market_data": market_data_text,
            "discount_rate": discount_rate,
            "investment_amount": investment_amount,
            "product_description": product_description,
            "market_area": market_area
        }

        # Get LLM analysis
        analysis_result = await llm_service.analyze_investment(analysis_data)

        # Generate report
        report_url = await report_generator.generate_report(analysis_result)

        return {
            "status": "success",
            "reportUrl": report_url,
            "summary": analysis_result["analysis"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/llm/validate")
async def validate_input(input_text: str):
    try:
        validation_result = await llm_service.validate_input(input_text)
        return validation_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)