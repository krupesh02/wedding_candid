from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import CORS_ORIGINS
from routes import portfolio, films, testimonials, blog, enquiry

app = FastAPI(
    title="Frame Stories API",
    description="Backend API for Frame Stories Photography Portfolio",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(portfolio.router)
app.include_router(films.router)
app.include_router(testimonials.router)
app.include_router(blog.router)
app.include_router(enquiry.router)


@app.get("/")
async def root():
    return {"message": "Frame Stories API is running", "version": "1.0.0"}


@app.get("/api/health")
async def health():
    return {"status": "healthy"}
