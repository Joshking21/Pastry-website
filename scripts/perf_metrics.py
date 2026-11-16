import json

with open("qa/lighthouse.json", "r", encoding="utf-8") as f:
    d = json.load(f)

print("=== METRICS ===")
for k in ["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index"]:
    a = d["audits"].get(k, {})
    print(f"{a.get('title'):<30}: {a.get('displayValue')} (score: {a.get('score')})")

print("\n=== OPPORTUNITIES & DIAGNOSTICS ===")
for k, v in d.get("audits", {}).items():
    if v.get("details", {}).get("type") == "opportunity":
        savings = v.get("details", {}).get("overallSavingsMs")
        if savings and savings > 100:
            print(f"{v.get('title')}: saves {savings}ms")

