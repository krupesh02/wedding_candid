from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class TestimonialBase(BaseModel):
    couple_names: str
    location: str
    review: str
    image: str
    rating: int = 5
    featured: bool = False
    order: int = 0


class TestimonialCreate(TestimonialBase):
    pass


class TestimonialUpdate(BaseModel):
    couple_names: Optional[str] = None
    location: Optional[str] = None
    review: Optional[str] = None
    image: Optional[str] = None
    rating: Optional[int] = None
    featured: Optional[bool] = None
    order: Optional[int] = None


class TestimonialResponse(TestimonialBase):
    id: str = Field(alias="_id")
    created_at: datetime = datetime.now()

    class Config:
        populate_by_name = True
