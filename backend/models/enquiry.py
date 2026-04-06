from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime


class EnquiryBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    event_date: Optional[str] = None
    event_type: str = "wedding"
    venue: Optional[str] = None
    message: str
    status: str = "new"  # new, contacted, confirmed, archived


class EnquiryCreate(EnquiryBase):
    pass


class EnquiryUpdate(BaseModel):
    status: Optional[str] = None


class EnquiryResponse(EnquiryBase):
    id: str = Field(alias="_id")
    created_at: datetime = datetime.now()

    class Config:
        populate_by_name = True
