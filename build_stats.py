import json
import os
from datetime import datetime
from collections import Counter

# Configuration
INPUT_FILE = "./public/writeups.json"
OUTPUT_FILE = "./public/stats.json"

def generate_stats():
    if not os.path.exists(INPUT_FILE):
        print(f"❌ Error: {INPUT_FILE} not found.")
        return

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    # --- 1. Hero Stats ---
    total_points = 0
    platforms = set()
    for entry in data:
        p_str = str(entry.get("points", "0"))
        clean_p = "".join(filter(str.isdigit, p_str))
        total_points += int(clean_p) if clean_p else 0
        if entry.get("platform"):
            platforms.add(entry.get("platform"))

    # --- 2. Domain Expertise ---
    categories = [entry.get("category", "Misc") for entry in data if entry.get("category")]
    cat_counts = Counter(categories)

    # --- 3. Timeline ---
    dates = []
    for entry in data:
        dt_str = entry.get("created_date")
        if dt_str:
            try:
                dt = datetime.fromisoformat(dt_str.replace("Z", "+00:00"))
                dates.append(dt.date())
            except:
                continue
    
    dates.sort()
    date_counts = Counter(dates)
    sorted_unique_dates = sorted(date_counts.keys())
    
    timeline_labels = []
    timeline_values = []
    cumulative = 0
    for d in sorted_unique_dates:
        cumulative += date_counts[d]
        timeline_labels.append(d.isoformat())
        timeline_values.append(cumulative)

    # --- Final Data Structure (No Styling) ---
    stats = {
        "hero": {
            "total_challenges": len(data),
            "total_points": total_points,
            "unique_platforms": len(platforms)
        },
        "domain_expertise": {
            "labels": list(cat_counts.keys()),
            "data": list(cat_counts.values())
        },
        "timeline": {
            "labels": timeline_labels,
            "data": timeline_values
        }
    }

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(stats, f, indent=2)
    
    print(f"✅ Clean data saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    generate_stats()