import glob
import re

def audit():
    print("=== AUDIT CODEBASE ===")
    src_files = [f for f in glob.glob('src/**/*', recursive=True) if f.endswith(('.ts', '.tsx', '.js', '.jsx'))]
    print(f"Total source files scanned: {len(src_files)}")

    # 1. next/ imports
    next_found = []
    for f in src_files:
        content = open(f, encoding='utf-8').read()
        if 'next/' in content or "from 'next" in content or 'from "next"' in content:
            next_found.append(f)
    print(f"1. Files with Next.js imports: {next_found}")

    # 2. 'use client'
    client_found = []
    for f in src_files:
        content = open(f, encoding='utf-8').read()
        if 'use client' in content:
            client_found.append(f)
    print(f"2. Files with 'use client': {client_found}")

    # 3. Hardcoded hex colors
    # Look for [#...] in className or styles
    hex_pattern = re.compile(r'\[#[0-9a-fA-F]{3,8}\]')
    hex_found = []
    for f in src_files:
        content = open(f, encoding='utf-8').read()
        matches = hex_pattern.findall(content)
        if matches:
            hex_found.append((f, matches))
    print(f"3. Hardcoded Tailwind hex values: {hex_found}")

    # 4. Visible placeholder or owner text
    placeholder_pattern = re.compile(r'(placeholder|owner note|replace with|goes here|your text here|lorem ipsum)', re.IGNORECASE)
    ph_found = []
    for f in src_files:
        lines = open(f, encoding='utf-8').readlines()
        for idx, line in enumerate(lines):
            # Exclude HTML input placeholder attributes like placeholder="e.g. ..."
            stripped = line.strip()
            # If line is just placeholder attribute on input/textarea, ignore standard form placeholder
            cleaned = re.sub(r'placeholder="[^"]*"', '', stripped)
            cleaned = re.sub(r"placeholder='[^']*'", '', cleaned)
            # Also ignore comments explaining why reviews array is empty or imports
            if placeholder_pattern.search(cleaned):
                ph_found.append((f, idx + 1, stripped))
    print(f"4. Potential placeholder/slop occurrences: {ph_found}")

if __name__ == '__main__':
    audit()
