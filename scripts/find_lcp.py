import json

with open("qa/lighthouse.json", "r", encoding="utf-8") as f:
    d = json.load(f)

# Search all audits for largest contentful paint element or snippet
for k, v in d.get("audits", {}).items():
    if "element" in k.lower():
        print(f"Audit: {k}")
        if "details" in v:
            print(json.dumps(v["details"], indent=2)[:500])

for k, v in d.get("audits", {}).items():
    if "lcp" in k.lower() or "largest-contentful-paint" in k.lower():
        print(f"\nAudit: {k}")
        if "details" in v:
            print(json.dumps(v["details"], indent=2)[:500])

