import os
from flask import Flask, render_template, request, jsonify
import aiohttp
import asyncio

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("chat.html")

@app.route("/getData", methods=["GET", "POST"])
def dataFetch():
    userMessage = request.args.get("mes")
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(fetch_data(userMessage))
    return jsonify(result)

async def GetMessage(mes, url, headers):
    instruction = (
        "You are a friendly chatbot. "
        "You only reply in one or two lines, while explaining you expand this limit. "
        "If anyone asks about you, you can tell that you are made by Shiv."
    )
    
    prompt = f"**Instruction:**\n{instruction}\n\n**Input:**\n{mes}" 
    
    data = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }
    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(url, headers=headers, json=data) as response:
                response.raise_for_status()  # Raise an exception for bad status codes
                return await response.json()  # Return the JSON response
        except aiohttp.ClientError as e:
            print(f"Request failed: {e}")
            return {"error": "Failed to fetch data"}

async def fetch_data(userMessage):
    key = os.getenv("key")
    api = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"

    headers = {
        "Content-Type": "application/json"
    }
    response = await GetMessage(userMessage , api, headers)
    res_data = response.get("candidates")
    final_response = res_data[0]["content"]["parts"][0]["text"]
    print(final_response)
    return {"cnt" : final_response}

if __name__ == "__main__":
    app.run(debug=True)
