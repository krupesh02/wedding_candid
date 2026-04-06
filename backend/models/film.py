from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class FilmBase(BaseModel):
    title: str
    slug: str
    couple_names: str
    location: str
    category: str = "classic"  # classic, modern, cinematic
    excerpt: str
    story: str
    cover_image: str
    video_url: str
    featured: bool = False
    order: int = 0


class FilmCreate(FilmBase):
    pass


class FilmUpdate(BaseModel):
    title: Optional[str] = None
    couple_names: Optional[str] = None
    location: Optional[str] = None
    category: Optional[str] = None
    excerpt: Optional[str] = None
    story: Optional[str] = None
    cover_image: Optional[str] = None
    video_url: Optional[str] = None
    featured: Optional[bool] = None
    order: Optional[int] = None


class FilmResponse(FilmBase):
    id: str = Field(alias="_id")
    created_at: datetime = datetime.now()

    class Config:
        populate_by_name = True
