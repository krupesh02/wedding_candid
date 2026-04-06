from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class BlogBase(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    cover_image: str
    tags: List[str] = []
    published: bool = True
    order: int = 0


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    tags: Optional[List[str]] = None
    published: Optional[bool] = None
    order: Optional[int] = None


class BlogResponse(BlogBase):
    id: str = Field(alias="_id")
    created_at: datetime = datetime.now()

    class Config:
        populate_by_name = True
