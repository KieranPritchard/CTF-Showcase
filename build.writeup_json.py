#!/usr/bin/env python3
"""
build_writeups_json.py

Recursively list all markdown files under the Contents/ folder in the
KieranPritchard/CTF-Write-Ups repo, fetch each file, parse fields,
and write public/writeups.json (creating the folder if needed).

Skips screenshots and any files inside folders named 'images', 'screenshots',
'assets', or 'imgs'.

Usage:
    python3 build_writeups_json.py
"""

import os
import re
import json
import base64
import requests
from typing import Dict, List
from dotenv import load_dotenv

# load .env (if present)
load_dotenv()

# ============ CONFIG ============
REPO_OWNER = "KieranPritchard"
REPO_NAME = "CTF-Write-Ups"
ROOT_PATH = "Contents"
BRANCH = "main"

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(SCRIPT_DIR, "public")
os.makedirs(PUBLIC_DIR, exist_ok=True)
OUTPUT_FILE = os.path.join(PUBLIC_DIR, "writeups.json")

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
# ================================


def get_headers():
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "writeups-json-generator/1.0",
    }
    if GITHUB_TOKEN:
        headers["Authorization"] = f"token {GITHUB_TOKEN}"
    return headers


def list_md_files_recursive() -> List[Dict]:
    """
    Use the Git Trees API to recursively list repository files and
    return only markdown files (excluding screenshots/images/assets folders).
    """
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/git/trees/{BRANCH}?recursive=1"
    r = requests.get(url, headers=get_headers(), timeout=30)
    r.raise_for_status()
    data = r.json()

    tree = data.get("tree", [])
    md_items = []
    prefix = ROOT_PATH.rstrip("/") + "/"

    excluded_dirs = ("screenshots", "images", "imgs", "assets")

    for item in tree:
        path = item.get("path", "")
        # Skip non-markdown files
        if item.get("type") != "blob" or not path.lower().endswith(".md"):
            continue

        # Skip anything not inside Contents/
        if not path.startswith(prefix):
            continue

        # Skip screenshots/images/assets folders
        if any(excl in path.lower() for excl in excluded_dirs):
            continue

        md_items.append({"path": path, "sha": item.get("sha")})

    print(f"📄 Found {len(md_items)} markdown write-up files under {ROOT_PATH}/")
    return md_items


def fetch_markdown(file_path: str) -> str:
    """Fetch markdown content using GitHub contents API"""
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{file_path}?ref={BRANCH}"
    r = requests.get(url, headers=get_headers(), timeout=30)
    r.raise_for_status()
    payload = r.json()

    encoding = payload.get("encoding")
    if encoding == "base64":
        content = base64.b64decode(payload["content"]).decode("utf-8", errors="replace")
        return content

    download_url = payload.get("download_url")
    if download_url:
        rr = requests.get(download_url, timeout=30)
        rr.raise_for_status()
        return rr.text

    raise RuntimeError(f"Unable to fetch content for {file_path}")


def extract_field(pattern: str, text: str) -> str:
    m = re.search(pattern, text, flags=re.I | re.S)
    return m.group(1).strip() if m else ""


def parse_challenge_info(md: str) -> Dict:
    info = {}
    block = extract_field(r"# 📌 Challenge Info(.*?)(?:\n#|\Z)", md)
    for line in (block or "").splitlines():
        line = line.strip("- ").strip()
        kv = re.match(r"(?:\*\*)?([^:*]+?)(?:\*\*)?\s*[:：]\s*(.+)", line)
        if kv:
            key, value = kv.groups()
            info[key.strip().lower()] = value.strip()
    return {
        "ctf_name": info.get("ctf name", ""),
        "challenge_name": info.get("challenge name", ""),
        "category": info.get("category", ""),
        "points": info.get("points", ""),
        "difficulty": info.get("difficulty", ""),
        "platform": info.get("ctf name", ""),
    }


def extract_flag(md: str) -> str:
    m = re.search(r"(THM\{.*?\}|FLAG\{.*?\})", md, re.I)
    return m.group(1) if m else ""


def extract_description(md: str) -> str:
    return extract_field(r"# 🧠 Challenge Description(.*?)(?:\n#|\Z)", md)


def extract_notes(md: str) -> str:
    return extract_field(r"# 📝 Notes / Lessons Learned(.*?)(?:\n#|\Z)", md)


def extract_tools(md: str) -> List[str]:
    bullets = re.findall(r"[-*]\s+(.*)", md)
    tools = []
    for b in bullets:
        m = re.match(r"(?:\*\*)?([^*]+?)(?:\*\*)?(?:\s*—.*)?$", b.strip())
        if m:
            candidate = m.group(1).strip()
            if 1 < len(candidate) <= 40:
                tools.append(candidate)
    return list(sorted(set(tools)))


def build_json():
    md_files = list_md_files_recursive()
    results = []

    for i, item in enumerate(md_files, 1):
        path = item["path"]
        print(f"[{i}/{len(md_files)}] Fetching {path} ...")
        try:
            md = fetch_markdown(path)
        except Exception as e:
            print(f"  ⚠️ Skipped {path}: {e}")
            continue

        info = parse_challenge_info(md)
        entry = {
            "slug": os.path.splitext(os.path.basename(path))[0],
            "title": info.get("challenge_name") or os.path.splitext(os.path.basename(path))[0],
            "ctf_name": info.get("ctf_name"),
            "platform": info.get("platform"),
            "category": info.get("category"),
            "difficulty": info.get("difficulty"),
            "points": info.get("points"),
            "flag": extract_flag(md),
            "description": extract_description(md),
            "notes": extract_notes(md),
            "tools": extract_tools(md),
            "raw_markdown": md,
            "_source": {"path": path, "sha": item.get("sha")},
        }
        results.append(entry)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as fh:
        json.dump(results, fh, ensure_ascii=False, indent=2)

    print(f"\n✅ Wrote {len(results)} entries to {OUTPUT_FILE}")


if __name__ == "__main__":
    build_json()