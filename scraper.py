import sys
import requests
from bs4 import BeautifulSoup
import json
import time
import os

# Fix console encoding for Windows
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Categories of internships to scrape on Internshala
URLS = {
    "Computer Science": "https://internshala.com/internships/computer-science-internship/",
    "Web Development": "https://internshala.com/internships/web-development-internship/",
    "Python / Django": "https://internshala.com/internships/python-django-internship/",
    "Work from Home": "https://internshala.com/internships/work-from-home/"
}

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def determine_category(title, skills):
    title_lower = title.lower()
    skills_lower = [s.lower() for s in skills]
    
    # AI/ML/Data
    data_words = ['data', 'ml', 'ai', 'machine learning', 'artificial intelligence', 'python', 'deep learning', 'nlp', 'analytics']
    if any(w in title_lower for w in data_words) or any(w in skills_lower for w in ['machine learning', 'artificial intelligence', 'data science', 'deep learning', 'nlp']):
        return "AI/ML/Data"
        
    # Product / Design
    product_words = ['product', 'design', 'ui', 'ux', 'graphic', 'figma', 'sketch', 'illustrator']
    if any(w in title_lower for w in product_words) or any(w in skills_lower for w in ['ui/ux design', 'ui & ux design', 'figma', 'graphic design', 'product design']):
        return "Product"
        
    # Hardware / Embedded
    hardware_words = ['embedded', 'iot', 'hardware', 'vlsi', 'circuit', 'microcontroller', 'arduino', 'raspberry']
    if any(w in title_lower for w in hardware_words) or any(w in skills_lower for w in ['embedded systems', 'iot', 'arduino', 'vlsi', 'robotics']):
        return "Hardware"
        
    # Default to Software
    return "Software"

def scrape():
    scraped_jobs = {}
    
    print("🚀 Starting Internshala Scraper for Indian & Remote Internships...")
    
    for category_name, url in URLS.items():
        print(f"\nFetching {category_name} internships from: {url}")
        try:
            r = requests.get(url, headers=HEADERS, timeout=15)
            if r.status_code != 200:
                print(f"⚠️ Failed to retrieve page. Status: {r.status_code}")
                continue
                
            soup = BeautifulSoup(r.text, 'html.parser')
            cards = soup.find_all('div', class_='individual_internship')
            print(f"Found {len(cards)} listings on page.")
            
            for card in cards:
                # 1. Unique ID
                job_id = card.get('internshipid')
                if not job_id:
                    continue
                    
                # Skip if already parsed in another category
                if job_id in scraped_jobs:
                    continue
                
                # 2. Title and URL
                title_el = card.find('a', class_='job-title-href')
                if not title_el:
                    continue
                title = title_el.text.strip()
                href = title_el.get('href', '')
                job_url = "https://internshala.com" + href
                
                # 3. Company
                company_el = card.find('p', class_='company-name')
                company = company_el.text.strip() if company_el else "Unknown Company"
                
                # 4. Location
                location_el = card.find('div', class_='locations')
                locations = []
                if location_el:
                    loc_links = location_el.find_all('a')
                    locations = [l.text.strip() for l in loc_links]
                
                # If no links, try reading the span text directly
                if not locations and location_el:
                    span_el = location_el.find('span')
                    if span_el:
                        locations = [span_el.text.strip()]
                
                # Default location
                if not locations:
                    locations = ["India"]
                
                # 5. Stipend
                stipend_el = card.find('span', class_='stipend')
                stipend = stipend_el.text.strip() if stipend_el else "Unpaid"
                
                # 6. Duration (find card item for duration)
                duration = "Not Specified"
                row_items = card.find_all('div', class_='row-1-item')
                for item in row_items:
                    # Check if there is calendar icon or duration text
                    if item.find('i', class_='ic-16-calendar'):
                        span = item.find('span')
                        if span:
                            duration = span.text.strip()
                            
                # 7. Skills
                skills = []
                skill_els = card.find_all('div', class_='job_skill')
                for s_el in skill_els:
                    skills.append(s_el.text.strip())
                
                # Categorize based on title/skills
                category = determine_category(title, skills)
                
                # Build internship entry
                job_entry = {
                    "id": job_id,
                    "company_name": company,
                    "title": title,
                    "category": category,
                    "locations": locations,
                    "url": job_url,
                    "degrees": ["Bachelor's"],  # Auto-qualifies for 2nd year filters
                    "terms": ["Summer 2026" if "work from home" in [l.lower() for l in locations] else "Co-Op"],
                    "date_posted": int(time.time()),
                    "stipend": stipend,
                    "duration": duration,
                    "skills": skills
                }
                
                scraped_jobs[job_id] = job_entry
                
            # Polite delay to respect server
            time.sleep(1)
            
        except Exception as e:
            print(f"❌ Error scraping {category_name}: {e}")
            
    # Output to listings.json
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, "listings.json")
    job_list = list(scraped_jobs.values())
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(job_list, f, indent=4, ensure_ascii=False)
        
    print(f"\n🎉 Scraping Complete! Saved {len(job_list)} Indian & Remote internships to listings.json.")

if __name__ == "__main__":
    scrape()
