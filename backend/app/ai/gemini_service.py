import os
import json
from dotenv import load_dotenv
import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def parse_patient_voice(transcript: str):
    prompt = f"""
You are an AI hospital data entry assistant.

Extract ONLY the information that is explicitly mentioned.

VERY IMPORTANT RULES:

- Return ONLY valid JSON.
- Do NOT guess values.
- Do NOT create fake values.
- Do NOT include fields that are not mentioned.
- If only age is spoken, return only age.
- If only name is spoken, return only name.
- Never return empty strings.
- Never return 0 for missing age.
- Return only detected fields.

Example:

Transcript:
Rahul

Output:
{{"name":"Rahul"}}

Transcript:
Age 25

Output:
{{"age":25}}

Transcript:
Village Udgir

Output:
{{"village":"Udgir"}}

Transcript:
Mobile 9876543210

Output:
{{"mobile":"9876543210"}}

Transcript:
Rahul age 25 fever

Output:
{{
"name":"Rahul",
"age":25,
"disease":"Fever"
}}

Transcript:
{transcript}
"""

    try:
        response = model.generate_content(prompt)

        if not response.text:
            return {
                "success": False,
                "message": "Empty response received from Gemini."
            }

        text = response.text.strip()

        if text.startswith("```"):
            text = text.replace("```json", "")
            text = text.replace("```", "")
            text = text.strip()

        data = json.loads(text)

        data["success"] = True

        return data

    except ResourceExhausted:
        return {
            "success": False,
            "message": "Gemini API quota exceeded. Please wait 15-20 seconds and try again."
        }

    except json.JSONDecodeError:
        return {
            "success": False,
            "message": "AI returned invalid JSON."
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }