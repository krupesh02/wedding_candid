from fastapi import APIRouter, HTTPException
from database import enquiries_collection
from models.enquiry import EnquiryCreate, EnquiryUpdate
from bson import ObjectId

router = APIRouter(prefix="/api/enquiries", tags=["enquiries"])


def enquiry_helper(e) -> dict:
    e["_id"] = str(e["_id"])
    return e


@router.get("/")
async def get_enquiries(status: str = None):
    query = {}
    if status:
        query["status"] = status
    enquiries = []
    async for e in enquiries_collection.find(query).sort("created_at", -1):
        enquiries.append(enquiry_helper(e))
    return enquiries


@router.post("/")
async def create_enquiry(enquiry: EnquiryCreate):
    data = enquiry.model_dump()
    from datetime import datetime
    data["created_at"] = datetime.now()
    result = await enquiries_collection.insert_one(data)
    created = await enquiries_collection.find_one({"_id": result.inserted_id})
    return enquiry_helper(created)


@router.put("/{id}")
async def update_enquiry(id: str, enquiry: EnquiryUpdate):
    data = {k: v for k, v in enquiry.model_dump().items() if v is not None}
    if not data:
        raise HTTPException(status_code=400, detail="No fields to update")
    await enquiries_collection.update_one(
        {"_id": ObjectId(id)}, {"$set": data}
    )
    updated = await enquiries_collection.find_one({"_id": ObjectId(id)})
    if not updated:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return enquiry_helper(updated)


@router.delete("/{id}")
async def delete_enquiry(id: str):
    result = await enquiries_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return {"message": "Deleted successfully"}
