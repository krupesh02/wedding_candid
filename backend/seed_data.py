"""
Seed script to populate MongoDB with sample wedding photography data.
Run: python seed_data.py
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from config import MONGODB_URL, DATABASE_NAME
from datetime import datetime


async def seed():
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]

    # Clear existing data
    await db.portfolios.delete_many({})
    await db.films.delete_many({})
    await db.testimonials.delete_many({})
    await db.blog_posts.delete_many({})
    await db.site_settings.delete_many({})

    # ── PORTFOLIOS ──────────────────────────────────────────
    portfolios = [
        {
            "title": "A Royal Affair in Udaipur",
            "slug": "riya-and-arjun-udaipur",
            "couple_names": "Riya & Arjun",
            "location": "Udaipur, Rajasthan",
            "date": "February 2026",
            "category": "destination",
            "excerpt": "A magnificent celebration at the City of Lakes, where royalty met romance under the Rajasthani sky.",
            "story": "Riya and Arjun's love story is one that spans continents. Meeting at a coffee shop in London, their journey brought them back to India for a celebration that honored their roots while embracing the grandeur of their love. The Oberoi Udaivilas served as the canvas for three days of festivities — from a sunset mehndi by the lake to a ceremony under a thousand stars. Every moment was steeped in tradition, yet felt refreshingly modern. As photographers, we found ourselves constantly in awe — the way Riya's eyes lit up during the pheras, the quiet tears of joy from Arjun's mother, the unbridled energy of the baraat. This wedding reminded us why we do what we do.",
            "cover_image": "/images/WC__7232.jpg",
            "images": ["/images/WC__7232.jpg", "/images/CB8A0155.jpg", "/images/WC__8428.jpg", "/images/IMG_4312.jpg", "/images/MBJ_5953.jpg", "/images/CB8A0325.jpg", "/images/SSP01330.JPG", "/images/WC__6391.jpg"],
            "credits": [
                {"label": "Venue", "value": "Oberoi Udaivilas, Udaipur"},
                {"label": "Wedding Planner", "value": "The Wedding Design Co."},
                {"label": "Bride's Outfit", "value": "Sabyasachi Mukherjee"},
                {"label": "Groom's Outfit", "value": "Anita Dongre"},
                {"label": "Decor", "value": "Devika Narain & Co."},
                {"label": "Makeup", "value": "Namrata Soni"}
            ],
            "featured": True,
            "order": 1,
            "created_at": datetime.now()
        },
        {
            "title": "Coastal Dreams in Goa",
            "slug": "priya-and-vikram-goa",
            "couple_names": "Priya & Vikram",
            "location": "Goa",
            "date": "December 2025",
            "category": "destination",
            "excerpt": "Where the Arabian Sea whispered blessings and the sunset painted their love in hues of gold and amber.",
            "story": "Priya and Vikram wanted something different — no grand palace, no thousand-guest extravaganza. Instead, they chose a cliff-side villa in South Goa where the crashing waves would be their wedding orchestra. The intimacy of 80 guests meant every moment felt personal, every embrace was genuine, every tear was seen. The ceremony at golden hour, with the sun dipping into the Arabian Sea behind them, remains one of the most breathtaking scenes we've ever captured. Their love is quiet and steady, like the ocean — and we crafted their visuals to reflect exactly that: natural, unhurried, and deeply felt.",
            "cover_image": "/images/WC__8428.jpg",
            "images": ["/images/WC__8428.jpg", "/images/WC__7232.jpg", "/images/MBJ_5953.jpg", "/images/CB8A0155.jpg", "/images/WC_13299.jpg", "/images/WC_17354.JPG"],
            "credits": [
                {"label": "Venue", "value": "Ahilya by the Sea, Goa"},
                {"label": "Bride's Outfit", "value": "Tarun Tahiliani"},
                {"label": "Groom's Outfit", "value": "Shantanu & Nikhil"},
                {"label": "Decor", "value": "Flora & Fauna Events"}
            ],
            "featured": True,
            "order": 2,
            "created_at": datetime.now()
        },
        {
            "title": "An Intimate Garden Wedding",
            "slug": "ananya-and-karan-delhi",
            "couple_names": "Ananya & Karan",
            "location": "New Delhi",
            "date": "November 2025",
            "category": "intimate",
            "excerpt": "A love letter written in flowers, fairy lights, and the warmth of family — right in the heart of Delhi.",
            "story": "Some weddings don't need grand venues to be grand. Ananya and Karan transformed their family farmhouse in Chattarpur into a dreamscape of white flowers, candlelight, and pure magic. With a guest list of just 120, every person in attendance was someone who mattered deeply to the couple. The mehndi was a riot of colors and laughter. The wedding itself was an emotional masterpiece — Ananya walking down a flower-laden pathway to Karan, who couldn't hold back his tears. We've photographed hundreds of weddings, but the rawness of emotion at this one was something extraordinary.",
            "cover_image": "/images/IMG_4312.jpg",
            "images": ["/images/IMG_4312.jpg", "/images/CB8A0155.jpg", "/images/WC__8428.jpg", "/images/WC__7232.jpg", "/images/WC_17407.JPG", "/images/WC__5748.jpg"],
            "credits": [
                {"label": "Venue", "value": "Family Farmhouse, Chattarpur"},
                {"label": "Wedding Planner", "value": "Rani Pink"},
                {"label": "Bride's Outfit", "value": "Manish Malhotra"},
                {"label": "Decor", "value": "Abhinav Bhagat Events"}
            ],
            "featured": True,
            "order": 3,
            "created_at": datetime.now()
        },
        {
            "title": "Heritage Grandeur in Jaipur",
            "slug": "meera-and-sahil-jaipur",
            "couple_names": "Meera & Sahil",
            "location": "Jaipur, Rajasthan",
            "date": "January 2026",
            "category": "indian",
            "excerpt": "Where centuries-old haveli walls echoed with the music of a love that's timeless.",
            "story": "The pink city has always held a special place in our hearts, and Meera and Sahil's wedding at Samode Palace only deepened that love. Three days of celebrations that seamlessly wove Rajasthani tradition with contemporary elegance. The sangeet night, illuminated by thousands of oil lamps in the palace courtyard, was nothing short of cinematic. Meera, in her grandmother's heirloom jewelry, looked like she had stepped out of a Mughal miniature painting. Sahil, usually the reserved one, danced like the world was watching — and it was. Every frame from this wedding tells a story of heritage, of belonging, of two families becoming one.",
            "cover_image": "/images/MBJ_5953.jpg",
            "images": ["/images/MBJ_5953.jpg", "/images/WC__7232.jpg", "/images/IMG_4312.jpg", "/images/CB8A0155.jpg", "/images/WC__8428.jpg", "/images/WC_19833.jpg"],
            "credits": [
                {"label": "Venue", "value": "Samode Palace, Jaipur"},
                {"label": "Wedding Planner", "value": "Shaadi Squad"},
                {"label": "Bride's Outfit", "value": "JJ Valaya"},
                {"label": "Groom's Outfit", "value": "Raghavendra Rathore"},
                {"label": "Decor", "value": "FNP Weddings"}
            ],
            "featured": True,
            "order": 4,
            "created_at": datetime.now()
        },
        {
            "title": "Tuscan Sunset Romance",
            "slug": "nina-and-rohan-tuscany",
            "couple_names": "Nina & Rohan",
            "location": "Tuscany, Italy",
            "date": "September 2025",
            "category": "destination",
            "excerpt": "Indian hearts, Italian soul — a destination wedding that blended two cultures in the rolling hills of Tuscany.",
            "story": "When Nina told us she was getting married in a 16th-century villa in Tuscany, we knew this would be special. But nothing could have prepared us for the sheer magic of those three days. Indian ceremonies under Tuscan cypresses, a sangeet night with the hills echoing Bollywood beats, and a Hindu ceremony performed as the sun set over the Val d'Orcia valley. The contrast of vibrant Indian colors against the muted earth tones of Tuscany created a visual feast that we will never forget. Nina and Rohan proved that love truly knows no borders.",
            "cover_image": "/images/CB8A0155.jpg",
            "images": ["/images/CB8A0155.jpg", "/images/WC__8428.jpg", "/images/WC__7232.jpg", "/images/MBJ_5953.jpg", "/images/DJI_20241209172706_0093_D_FLYCAPTURE.jpg", "/images/WC_13299.jpg"],
            "credits": [
                {"label": "Venue", "value": "Villa La Foce, Tuscany"},
                {"label": "Wedding Planner", "value": "Altair Decor"},
                {"label": "Bride's Outfit", "value": "Abu Jani Sandeep Khosla"},
                {"label": "Decor", "value": "Altair Decor Italy"}
            ],
            "featured": False,
            "order": 5,
            "created_at": datetime.now()
        }
    ]

    await db.portfolios.insert_many(portfolios)
    print(f"✓ Inserted {len(portfolios)} portfolios")

    # ── FILMS ───────────────────────────────────────────────
    films = [
        {
            "title": "Love In Second Innings",
            "slug": "love-in-second-innings",
            "couple_names": "Deepal & Nishant",
            "location": "Mumbai",
            "category": "classic",
            "excerpt": "Second marriage, for many, is still a taboo. This story illustrates why it shouldn't be.",
            "story": "It's a treatise on how the past doesn't come in the way of love and respect. It's a heroic tale of victory over stereotypes and archaic customs. It's a story of how love always triumphs in the end. Every moment that we spent with Deepal and Nishant convinced us that life can be made beautiful — that tears can be turned into a drizzle of hope; that fear can be turned into the excitement of exploring the unknown; that the end is but a new beginning.",
            "cover_image": "/images/WC__7232.jpg",
            "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "featured": True,
            "order": 1,
            "created_at": datetime.now()
        },
        {
            "title": "Twenty Years in the Making",
            "slug": "twenty-years-in-the-making",
            "couple_names": "Hiba & Akbar",
            "location": "Bhopal",
            "category": "cinematic",
            "excerpt": "An India-Pakistan love story that transcends borders, politics, and time itself.",
            "story": "This one is special, very special. Hiba and Akbar's story took us on a journey all the way from Hiba's childhood till their reception in Bhopal and on the way we discovered an all new perspective of filming a wedding. We knew from the start that no matter how hard we try we can never justify this wedding in a 5 minute film, but we tried, tried for a year now and this is the best we could do. It's a film which is not just about a wedding, an India-Pakistan story which is not about India or Pakistan. For us it's much more than that.",
            "cover_image": "/images/IMG_4312.jpg",
            "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "featured": True,
            "order": 2,
            "created_at": datetime.now()
        },
        {
            "title": "Whispers of Forever",
            "slug": "whispers-of-forever",
            "couple_names": "Aisha & Dev",
            "location": "Udaipur",
            "category": "modern",
            "excerpt": "A modern love story told through the lens of ancient Rajasthani grandeur.",
            "story": "When Aisha and Dev first reached out to us, they said something that stuck — 'We don't want a wedding video, we want a film about us.' And that's exactly what we set out to create. Over four days in Udaipur, we followed their journey — the quiet morning chai conversations, the chaotic baraat preparations, the stolen glances during the pheras. The result is a film that feels less like a wedding video and more like a love letter, penned in light and shadow.",
            "cover_image": "/images/MBJ_5953.jpg",
            "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "featured": True,
            "order": 3,
            "created_at": datetime.now()
        }
    ]

    await db.films.insert_many(films)
    print(f"✓ Inserted {len(films)} films")

    # ── TESTIMONIALS ────────────────────────────────────────
    testimonials = [
        {
            "couple_names": "Krishna & Omar",
            "location": "Jaipur",
            "review": "During the early days of our wedding planning, someone advised us to hire a photographer we like as a person because we will spend a lot of time with them. Aside from being absurdly good photographers, the team at Frame Stories quickly became our friends, our personal assistants, and even our firefighters when something didn't go as planned. They kept our energy up during long days, they moved with empathy, and they made it so easy for us to be ourselves in front of the camera. Our families and friends had a blast with them around. They are a special mix of talent, vision, and bighearted people with a passion for what they do.",
            "image": "/images/WC__7232.jpg",
            "rating": 5,
            "featured": True,
            "order": 1,
            "created_at": datetime.now()
        },
        {
            "couple_names": "Priyanka & Rishab",
            "location": "Mumbai",
            "review": "Frame Stories was absolutely amazing! We are beyond thrilled with how our wedding pictures, trailers, and videos turned out. We couldn't have made a better choice. Their professionalism and ability to adapt to the chaos around the events was truly impressive. They captured both the big and small moments so beautifully. We also loved how they seamlessly incorporated different styles of photography, from portraits to candid shots. Thank you for making our special day even more memorable!",
            "image": "/images/CB8A0155.jpg",
            "rating": 5,
            "featured": True,
            "order": 2,
            "created_at": datetime.now()
        },
        {
            "couple_names": "Meera & Aditya",
            "location": "Udaipur",
            "review": "Working with Frame Stories was an absolute dream. They captured our wedding in a way that felt effortless and natural, making even the most camera-shy moments comfortable and fun. The team blended seamlessly into the celebrations, never intrusive, yet always in the right place at the right time. From the smallest details to the grandest emotions, they turned our memories into magic. We couldn't have asked for a warmer, more talented crew!",
            "image": "/images/WC__8428.jpg",
            "rating": 5,
            "featured": True,
            "order": 3,
            "created_at": datetime.now()
        },
        {
            "couple_names": "Fagun & Heer",
            "location": "Delhi",
            "review": "We recently hired Frame Stories for an intimate event at our home, and it was an absolute pleasure working with the team. Despite it being a small gathering, the photographer personally came to photograph the event — a gesture that really stood out. They were warm, courteous, and instantly understood the kind of moments we wanted captured. Not only did they deliver the photos earlier than expected, but every single image was beautifully shot — full of emotion and detail. My entire family loved the results.",
            "image": "/images/IMG_4312.jpg",
            "rating": 5,
            "featured": True,
            "order": 4,
            "created_at": datetime.now()
        },
        {
            "couple_names": "Anisha & Brett",
            "location": "Goa",
            "review": "There are no words to describe our experience with Frame Stories. From our first interaction, we felt like we were chatting with old friends. During the shoots, they struck a perfect balance between guiding us to get the best shots while also letting us live in the moment. The final deliverables were beyond anything we could have imagined. The pictures and videos captured our memories so beautifully — we will cherish them for the rest of our lives. Easily one of the best decisions of our wedding!",
            "image": "/images/MBJ_5953.jpg",
            "rating": 5,
            "featured": True,
            "order": 5,
            "created_at": datetime.now()
        }
    ]

    await db.testimonials.insert_many(testimonials)
    print(f"✓ Inserted {len(testimonials)} testimonials")

    # ── BLOG POSTS ──────────────────────────────────────────
    blog_posts = [
        {
            "title": "The Art of Capturing Candid Moments",
            "slug": "art-of-candid-moments",
            "excerpt": "Why the unscripted moments at your wedding are the ones you'll treasure most.",
            "content": "In the world of wedding photography, there's a growing appreciation for the unscripted, the unplanned, the beautifully imperfect. Candid photography isn't about catching people off-guard — it's about being so attuned to the rhythm of the celebration that you anticipate the moments before they happen. The grandmother wiping a tear during the varmala. The best friend's face when the bride walks in. The flower girl who decided the phera fire was the perfect place to warm her hands. These are the photographs that will make you laugh and cry twenty years from now. These are the stories we live to tell.",
            "cover_image": "/images/CB8A0155.jpg",
            "tags": ["photography", "tips", "candid"],
            "published": True,
            "order": 1,
            "created_at": datetime.now()
        },
        {
            "title": "Choosing Your Dream Wedding Destination",
            "slug": "choosing-dream-destination",
            "excerpt": "From Udaipur palaces to Goan beaches — how to find the perfect backdrop for your love story.",
            "content": "India offers a treasure trove of wedding destinations, each with its own character and charm. Udaipur brings old-world royalty with its lakeside palaces and havelis. Jaipur offers the perfect blend of heritage and accessibility. Goa provides that relaxed, beach-chic vibe that's perfect for couples who want their toes in the sand and the sea breeze in their veils. Kerala's backwaters offer a serene, almost spiritual setting. And then there are the international options — Tuscany, Bali, Thailand, the Maldives — each offering a unique canvas for your celebration. The key is to choose a destination that reflects who you are as a couple, not just what looks good on Instagram.",
            "cover_image": "/images/WC__8428.jpg",
            "tags": ["destination", "planning", "venues"],
            "published": True,
            "order": 2,
            "created_at": datetime.now()
        },
        {
            "title": "Behind the Lens: Our Creative Process",
            "slug": "behind-the-lens-creative-process",
            "excerpt": "A peek into how we approach each wedding as a unique story waiting to be told.",
            "content": "Every wedding we photograph begins long before the camera comes out. It starts with a conversation — understanding the couple, their journey, their quirks, their non-negotiables. We study the venue, the light, the architecture. We plan our positions for key ceremonies while leaving room for spontaneity. On the day itself, we work as an invisible team — anticipating moments, chasing light, finding angles that transform the ordinary into art. Post-production is where the magic deepens: careful color grading that evokes emotion, thoughtful sequencing that builds narrative, and meticulous attention to every single frame. The goal is always the same: to create images that don't just document a day, but tell a love story.",
            "cover_image": "/images/WC__7232.jpg",
            "tags": ["behind-the-scenes", "process", "photography"],
            "published": True,
            "order": 3,
            "created_at": datetime.now()
        }
    ]

    await db.blog_posts.insert_many(blog_posts)
    print(f"✓ Inserted {len(blog_posts)} blog posts")

    # ── SITE SETTINGS ───────────────────────────────────────
    settings = {
        "brand_name": "Frame Stories",
        "tagline": "Your Love Story, The Way It Feels",
        "email": "hello@framestories.in",
        "phone": "+91 98765 43210",
        "instagram": "@framestories.in",
        "instagram_url": "https://www.instagram.com/framestories.in",
        "about_headline": "You Feel. I Focus. We Frame.",
        "about_text": "Frame Stories is a destination wedding photography and films company capturing timeless love tales across the globe. From intimate moments to grand celebrations, we craft visual stories that feel personal, poetic, and unforgettable. Considered to be at the forefront of Modern Wedding Photography and Filmmaking, Frame Stories has transformed the way wedding stories are told. For almost a decade, we have been creating photographs and films which are timeless and have been etched in the memories of thousands of people forever.",
        "about_philosophy": "We celebrate the wild ones, the rule breakers, the travellers, the new age modern couple who are not afraid to experiment. We believe the ultimate goal of a wedding photographer is to justify the vibe of the wedding and the personalities of the couple. We are creating fiction out of reality.",
        "featured_in": ["Vogue India", "WedMeGood", "ShaadiSaga", "Wedding Sutra", "Femina"],
        "created_at": datetime.now()
    }

    await db.site_settings.insert_one(settings)
    print("✓ Inserted site settings")

    print("\n🎉 Database seeded successfully!")
    client.close()


if __name__ == "__main__":
    asyncio.run(seed())
