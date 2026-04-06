from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class Credit(BaseModel):
    label: str
    value: str


class PortfolioBase(BaseModel):
    title: str
    slug: str
    couple_names: str
    location: str
    date: str
    category: str = "indian"  # destination, indian, intimate
    excerpt: str
    story: str
    cover_image: str
    images: List[str] = []
    credits: List[Credit] = []
    featured: bool = False
    order: int = 0


class PortfolioCreate(PortfolioBase):
    pass


class PortfolioUpdate(BaseModel):
    title: Optional[str] = None
    couple_names: Optional[str] = None
    location: Optional[str] = None
    date: Optional[str] = None
    category: Optional[str] = None
    excerpt: Optional[str] = None
    story: Optional[str] = None
    cover_image: Optional[str] = None
    images: Optional[List[str]] = None
    credits: Optional[List[Credit]] = None
    featured: Optional[bool] = None
    order: Optional[int] = None


class PortfolioResponse(PortfolioBase):
    id: str = Field(alias="_id")
    created_at: datetime = datetime.now()

    class Config:
        populate_by_name = True
