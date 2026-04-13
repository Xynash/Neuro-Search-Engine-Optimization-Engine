import os
import json
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from bs4 import BeautifulSoup
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# --- UPDATED TO GEMINI 3 FLASH (FROM YOUR SCREENSHOT) ---
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-3-flash-preview')

class AuditRequest(BaseModel):
    url: str

class SandboxRequest(BaseModel):
    code_content: str

async def scrape_deep_data(url: str):
    headers = {"User-Agent": "Mozilla/5.0"}
    try:
        async with httpx.AsyncClient(timeout=15.0, follow_redirects=True, headers=headers) as c:
            res = await c.get(url)
            soup = BeautifulSoup(res.text, 'html.parser')
            return {
                "title": soup.title.string if soup.title else "N/A",
                "meta": str(soup.find_all('meta'))[:1000],
                "h1": [h.text.strip() for h in soup.find_all('h1')],
                "script_count": len(soup.find_all('script')),
                "img_count": len(soup.find_all('img'))
            }
    except: return {"error": "Connection failed"}

@app.post("/analyze")
async def analyze_url(request: AuditRequest):
    site_info = await scrape_deep_data(request.url)
    
    # HEAVY PROMPT WITH EXAMPLES
    prompt = f"""
    You are the NEURO-SEO TITAN. Analyze this site data: {json.dumps(site_info)}
    
    TASK: Perform a deep technical audit for {request.url}.
    
    STRICT JSON OUTPUT FORMAT (No text before or after):
    {{
      "scores": {{
        "seo": 45, "trust": 32, "visibility": 55, "backlink": 20, "onpage": 40, 
        "offpage": 15, "technical": 60, "intent": 25, "accessibility": 50, "analytics": 10
      }},
      "audit": {{
        "seo": [
          {{ "element": "Title Architecture", "problem": "String describing the real issue found", "mitigation": "EXACT_CODE_TO_COPY_PASTE" }}
        ],
        "trust": [], "visibility": [], "backlink": [], "onpage": [], "offpage": [], "technical": [], "intent": [], "accessibility": [], "analytics": []
      }},
      "intelligence": {{ "brain_map_gap": "str", "brain_map_problem": "str", "brain_map_solution": "str", "geo_suggestion": "str" }},
      "growth": {{ "trends": [24 random unique ints mapping a growth curve], "war_room_battle": "str", "defense_matrix": "str" }},
      "health": {{ "sandbox_warning": "str", "safety_score": 85 }}
    }}

    CRITICAL RULES:
    1. SCORES: Must be UNIQUE integers (not all the same) based on how bad the site is.
    2. AUDIT: Every category must have exactly 3 objects.
    3. MITIGATION: Do not use generic text. Provide the exact HTML/JS/CSS code the user needs.
    """

    try:
        response = model.generate_content(prompt)
        raw_text = response.text.strip().replace('```json', '').replace('```', '')
        return json.loads(raw_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/sandbox")
async def analyze_sandbox(request: SandboxRequest):
    try:
        prompt = f"""
        Analyze this code snippet for SEO risks: {request.code_content}
        Return ONLY a JSON object:
        {{
          "sandbox_warning": "Technical warning string",
          "safety_score": integer 0-100,
          "impact_lcp": "percentage string",
          "impact_dom": "nodes count string",
          "neural_fix": "Corrected code snippet"
        }}
        """
        response = model.generate_content(prompt)
        raw_text = response.text.strip()
        if "```json" in raw_text:
            raw_text = raw_text.split("```json")[1].split("```")[0].strip()
        return json.loads(raw_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)