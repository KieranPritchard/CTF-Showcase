#!/usr/bin/env python3
"""
build_writeups_json.py (Structured Blocks Version + Rate Limit Handling)

Fetch markdown write-ups from GitHub, parse fields, convert markdown
to structured blocks, and write to public/writeups.json. Handles
GitHub API rate limits gracefully.
"""

import os
import re
import json
import time
import base64
import requests
from typing import Dict, List
from dotenv import load_dotenv

# ============ CONFIG ============
REPO_OWNER = "KieranPritchard"
REPO_NAME = "CTF-Write-Ups"
ROOT_PATH = "Contents"
BRANCH = "main"

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(SCRIPT_DIR, "public")
os.makedirs(PUBLIC_DIR, exist_ok=True)
OUTPUT_FILE = os.path.join(PUBLIC_DIR, "writeups.json")

# Explicitly load .env from script directory
dotenv_path = os.path.join(SCRIPT_DIR, ".env")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
else:
    print("⚠️ .env file not found at", dotenv_path)

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
print("Using token:", GITHUB_TOKEN is not None)
# ================================


def get_headers():
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "writeups-json-generator/1.0",
    }
    if GITHUB_TOKEN:
        headers["Authorization"] = f"token {GITHUB_TOKEN}"
    return headers


def request_with_retry(url, max_retries=3, delay=5):
    """Request URL with retry on rate limit (403)."""
    for attempt in range(1, max_retries + 1):
        r = requests.get(url, headers=get_headers(), timeout=30)
        if r.status_code == 403:
            reset_time = r.headers.get("X-RateLimit-Reset")
            wait_seconds = delay
            if reset_time:
                wait_seconds = max(int(reset_time) - int(time.time()), delay)
            print(f"⚠️ Rate limit hit, retrying in {wait_seconds} seconds...")
            time.sleep(wait_seconds)
            continue
        r.raise_for_status()
        return r
    raise RuntimeError(f"Failed to fetch {url} after {max_retries} retries due to rate limit.")


def clean_md_inline(s: str) -> str:
    """Strip inline markdown and HTML from a string."""
    if not s:
        return ""
    s = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", s)
    s = s.replace("`", "").replace("**", "").replace("__", "").replace("*", "").replace("_", "")
    s = re.sub(r"<[^>]+>", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def list_md_files_recursive() -> List[Dict]:
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/git/trees/{BRANCH}?recursive=1"
    r = request_with_retry(url)
    tree = r.json().get("tree", [])
    prefix = ROOT_PATH.rstrip("/") + "/"
    excluded_dirs = ("screenshots", "images", "imgs", "assets")

    md_items = [
        {"path": item["path"], "sha": item["sha"]}
        for item in tree
        if item.get("type") == "blob"
        and item["path"].lower().endswith(".md")
        and item["path"].startswith(prefix)
        and not any(excl in item["path"].lower() for excl in excluded_dirs)
    ]
    print(f"📄 Found {len(md_items)} markdown write-up files under {ROOT_PATH}/")
    return md_items


def fetch_markdown(file_path: str) -> str:
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{file_path}?ref={BRANCH}"
    r = request_with_retry(url)
    payload = r.json()
    if payload.get("encoding") == "base64":
        return base64.b64decode(payload["content"]).decode("utf-8", errors="replace")
    if payload.get("download_url"):
        rr = request_with_retry(payload["download_url"])
        return rr.text
    raise RuntimeError(f"Unable to fetch content for {file_path}")


def extract_field(pattern: str, text: str) -> str:
    m = re.search(pattern, text, flags=re.I | re.S)
    return m.group(1).strip() if m else ""


def parse_challenge_info(md: str) -> Dict:
    info_block = extract_field(r"# 📌 Challenge Info(.*?)(?:\n#|\Z)", md)
    info = {}
    for line in (info_block or "").splitlines():
        line = line.strip("- ").strip()
        kv = re.match(r"(?:\*\*)?([^:*]+?)(?:\*\*)?\s*[:：]\s*(.+)", line)
        if kv:
            key, value = kv.groups()
            info[clean_md_inline(key).lower()] = clean_md_inline(value)
    return info


def extract_flag(md: str) -> str:
    m = re.search(r"(THM\{.*?\}|FLAG\{.*?\})", md, re.I)
    return m.group(1) if m else ""


def parse_markdown_to_blocks(md: str) -> List[Dict]:
    """Basic Markdown → blocks parser."""
    blocks = []
    lines = md.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        if not line:
            i += 1
            continue

        # Heading
        if line.startswith("#"):
            level = len(line) - len(line.lstrip("#"))
            text = line.lstrip("#").strip()
            blocks.append({"type": "heading", "level": level, "text": clean_md_inline(text)})
            i += 1
            continue

        # Code block
        if line.startswith("```"):
            lang = line[3:].strip() or ""
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].startswith("```"):
                code_lines.append(lines[i])
                i += 1
            i += 1  # Skip closing ```
            blocks.append({"type": "code", "language": lang, "code": "\n".join(code_lines)})
            continue

        # List
        if line.startswith(("-", "*")):
            items = []
            while i < len(lines) and lines[i].strip().startswith(("-", "*")):
                items.append(clean_md_inline(lines[i].lstrip("-* ").strip()))
                i += 1
            blocks.append({"type": "list", "ordered": False, "items": items})
            continue

        # Image
        img_match = re.match(r"!\[([^\]]*)\]\(([^)]+)\)", line)
        if img_match:
            alt, src = img_match.groups()
            blocks.append({"type": "image", "src": src, "alt": alt})
            i += 1
            continue

        # Paragraph
        para_lines = [line]
        i += 1
        while i < len(lines) and lines[i].strip() and not lines[i].startswith(("#", "-", "*", "```", "![", ">")):
            para_lines.append(lines[i].strip())
            i += 1
        blocks.append({"type": "paragraph", "text": clean_md_inline(" ".join(para_lines))})

    return blocks


def build_json():
    md_files = list_md_files_recursive()
    results = []

    for idx, item in enumerate(md_files, 1):
        path = item["path"]
        print(f"[{idx}/{len(md_files)}] Fetching {path} ...")
        try:
            md = fetch_markdown(path)
        except Exception as e:
            print(f"  ⚠️ Skipped {path}: {e}")
            continue

        info = parse_challenge_info(md)
        entry = {
            "slug": os.path.splitext(os.path.basename(path))[0],
            "title": clean_md_inline(info.get("challenge name") or os.path.splitext(os.path.basename(path))[0]),
            "ctf_name": clean_md_inline(info.get("ctf name")),
            "platform": clean_md_inline(info.get("platform")),
            "category": clean_md_inline(info.get("category")),
            "difficulty": clean_md_inline(info.get("difficulty")),
            "points": clean_md_inline(info.get("points")),
            "flag": extract_flag(md),
            "tools": [],  # optional: parse separately
            "content": parse_markdown_to_blocks(md),
            "_source": {"path": path, "sha": item.get("sha")},
        }
        results.append(entry)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as fh:
        json.dump(results, fh, ensure_ascii=False, indent=2)

    print(f"\n✅ Wrote {len(results)} entries to {OUTPUT_FILE}")


if __name__ == "__main__":
    build_json()