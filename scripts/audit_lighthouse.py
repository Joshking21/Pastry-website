import json

with open("qa/lighthouse.json", "r", encoding="utf-8") as f:
    data = json.load(f)

audits = data.get("audits", {})
print("=== ACCESSIBILITY ISSUES ===")
for audit_ref in data.get("categories", {}).get("accessibility", {}).get("auditRefs", []):
    audit = audits.get(audit_ref.get("id"), {})
    score = audit.get("score")
    if score is not None and score < 1:
        print(f"[{score}] {audit.get('id')}: {audit.get('title')}")
        print(f"   Explanation: {audit.get('description')}")
        if "details" in audit and "items" in audit["details"]:
            for item in audit["details"]["items"][:3]:
                print(f"   Node: {item.get('node', {}).get('snippet')}")

print("\n=== PERFORMANCE ISSUES ===")
for audit_ref in data.get("categories", {}).get("performance", {}).get("auditRefs", []):
    audit = audits.get(audit_ref.get("id"), {})
    score = audit.get("score")
    if score is not None and score < 0.9:
        print(f"[{score}] {audit.get('id')}: {audit.get('title')} - {audit.get('displayValue')}")

