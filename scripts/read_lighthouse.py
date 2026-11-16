import json

with open("qa/lighthouse.json", "r", encoding="utf-8") as f:
    data = json.load(f)

categories = data.get("categories", {})
for k, v in categories.items():
    title = v.get("title", k)
    score = int(round(v.get("score", 0) * 100))
    print(f"{title:<20}: {score}")

