from fastapi import APIRouter, HTTPException
from database import testimonials_collection
from models.testimonial import TestimonialCreate, TestimonialUpdate
from bson import ObjectId

router = APIRouter(prefix="/api/testimonials", tags=["testimonials"])


def testimonial_helper(t) -> dict:
    t["_id"] = str(t["_id"])
    return t


@router.get("/")
async def get_testimonials(featured: bool = None):
    query = {}
    if featured is not None:
        query["featured"] = featured
    testimonials = []
    async for t in testimonials_collection.find(query).sort("order", 1):
        testimonials.append(testimonial_helper(t))
    return testimonials


@router.post("/")
async def create_testimonial(testimonial: TestimonialCreate):
    data = testimonial.model_dump()
    from datetime import datetime
    data["created_at"] = datetime.now()
    result = await testimonials_collection.insert_one(data)
    created = await testimonials_collection.find_one({"_id": result.inserted_id})
    return testimonial_helper(created)


@router.put("/{id}")
async def update_testimonial(id: str, testimonial: TestimonialUpdate):
    data = {k: v for k, v in testimonial.model_dump().items() if v is not None}
    if not data:
        raise HTTPException(status_code=400, detail="No fields to update")
    await testimonials_collection.update_one(
        {"_id": ObjectId(id)}, {"$set": data}
    )
    updated = await testimonials_collection.find_one({"_id": ObjectId(id)})
    if not updated:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return testimonial_helper(updated)


@router.delete("/{id}")
async def delete_testimonial(id: str):
    result = await testimonials_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Deleted successfully"}
