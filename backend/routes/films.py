from fastapi import APIRouter, HTTPException
from database import films_collection
from models.film import FilmCreate, FilmUpdate
from bson import ObjectId

router = APIRouter(prefix="/api/films", tags=["films"])


def film_helper(f) -> dict:
    f["_id"] = str(f["_id"])
    return f


@router.get("/")
async def get_films(category: str = None, featured: bool = None):
    query = {}
    if category:
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    films = []
    async for f in films_collection.find(query).sort("order", 1):
        films.append(film_helper(f))
    return films


@router.get("/{slug}")
async def get_film(slug: str):
    f = await films_collection.find_one({"slug": slug})
    if not f:
        raise HTTPException(status_code=404, detail="Film not found")
    return film_helper(f)


@router.post("/")
async def create_film(film: FilmCreate):
    data = film.model_dump()
    from datetime import datetime
    data["created_at"] = datetime.now()
    result = await films_collection.insert_one(data)
    created = await films_collection.find_one({"_id": result.inserted_id})
    return film_helper(created)


@router.put("/{id}")
async def update_film(id: str, film: FilmUpdate):
    data = {k: v for k, v in film.model_dump().items() if v is not None}
    if not data:
        raise HTTPException(status_code=400, detail="No fields to update")
    await films_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    updated = await films_collection.find_one({"_id": ObjectId(id)})
    if not updated:
        raise HTTPException(status_code=404, detail="Film not found")
    return film_helper(updated)


@router.delete("/{id}")
async def delete_film(id: str):
    result = await films_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Film not found")
    return {"message": "Deleted successfully"}
