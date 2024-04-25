from fastapi import FastAPI
import httpx
import json

app = FastAPI()

DICTIONARY_API_URL = "https://random-word-api.herokuapp.com/word"

@app.get("/get_random_word/")
async def get_random_word() -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.get(DICTIONARY_API_URL)
        
        try:
            data: list = response.json()
        except json.JSONDecodeError:
            return {"error": "Invalid JSON response from the dictionary API"}
        
        if not isinstance(data, list) or not data:
            return {"error": "Unexpected response from the dictionary API"}
        
        random_word: str = data[0]
        print(f"Fetched word: {random_word}")
        
        return {"word": random_word}
