from motor.motor_asyncio import AsyncIOMotorClient
from config import MONGODB_URL, DATABASE_NAME
import certifi

# Use certifi for SSL certificate verification (needed for MongoDB Atlas)
client = AsyncIOMotorClient(MONGODB_URL, tlsCAFile=certifi.where())
db = client[DATABASE_NAME]

# Collections
portfolios_collection = db["portfolios"]
films_collection = db["films"]
testimonials_collection = db["testimonials"]
blog_collection = db["blog_posts"]
enquiries_collection = db["enquiries"]
site_settings_collection = db["site_settings"]
