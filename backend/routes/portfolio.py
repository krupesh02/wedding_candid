from fastapi import APIRouter, HTTPException
from database import portfolios_collection
from models.portfolio import PortfolioCreate, PortfolioUpdate
from bson import ObjectId

router = APIRouter(prefix="/api/portfolios", tags=["portfolios"])


def portfolio_helper(p) -> dict:
    p["_id"] = str(p["_id"])
    return p


@router.get("/")
async def get_portfolios(category: str = None, featured: bool = None):
    query = {}
    if category:
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    portfolios = []
    async for p in portfolios_collection.find(query).sort("order", 1):
        portfolios.append(portfolio_helper(p))
    return portfolios


@router.get("/{slug}")
async def get_portfolio(slug: str):
    p = await portfolios_collection.find_one({"slug": slug})
    if not p:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return portfolio_helper(p)


@router.post("/")
async def create_portfolio(portfolio: PortfolioCreate):
    data = portfolio.model_dump()
    from datetime import datetime
    data["created_at"] = datetime.now()
    result = await portfolios_collection.insert_one(data)
    created = await portfolios_collection.find_one({"_id": result.inserted_id})
    return portfolio_helper(created)


@router.put("/{id}")
async def update_portfolio(id: str, portfolio: PortfolioUpdate):
    data = {k: v for k, v in portfolio.model_dump().items() if v is not None}
    if not data:
        raise HTTPException(status_code=400, detail="No fields to update")
    await portfolios_collection.update_one(
        {"_id": ObjectId(id)}, {"$set": data}
    )
    updated = await portfolios_collection.find_one({"_id": ObjectId(id)})
    if not updated:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return portfolio_helper(updated)


@router.delete("/{id}")
async def delete_portfolio(id: str):
    result = await portfolios_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return {"message": "Deleted successfully"}
