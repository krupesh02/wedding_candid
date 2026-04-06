from fastapi import APIRouter, HTTPException
from database import blog_collection
from models.blog import BlogCreate, BlogUpdate
from bson import ObjectId

router = APIRouter(prefix="/api/blog", tags=["blog"])


def blog_helper(b) -> dict:
    b["_id"] = str(b["_id"])
    return b


@router.get("/")
async def get_posts(published: bool = None):
    query = {}
    if published is not None:
        query["published"] = published
    posts = []
    async for b in blog_collection.find(query).sort("order", 1):
        posts.append(blog_helper(b))
    return posts


@router.get("/{slug}")
async def get_post(slug: str):
    b = await blog_collection.find_one({"slug": slug})
    if not b:
        raise HTTPException(status_code=404, detail="Post not found")
    return blog_helper(b)


@router.post("/")
async def create_post(post: BlogCreate):
    data = post.model_dump()
    from datetime import datetime
    data["created_at"] = datetime.now()
    result = await blog_collection.insert_one(data)
    created = await blog_collection.find_one({"_id": result.inserted_id})
    return blog_helper(created)


@router.put("/{id}")
async def update_post(id: str, post: BlogUpdate):
    data = {k: v for k, v in post.model_dump().items() if v is not None}
    if not data:
        raise HTTPException(status_code=400, detail="No fields to update")
    await blog_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    updated = await blog_collection.find_one({"_id": ObjectId(id)})
    if not updated:
        raise HTTPException(status_code=404, detail="Post not found")
    return blog_helper(updated)


@router.delete("/{id}")
async def delete_post(id: str):
    result = await blog_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Deleted successfully"}
